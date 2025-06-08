const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Environment variables
const PORT = process.env.PORT || 10000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

console.log(`🚂 Starting Domino Game Server...`);
console.log(`📊 Environment: ${NODE_ENV}`);
console.log(`🌐 Port: ${PORT}`);
console.log(`🔒 CORS Origin: ${CORS_ORIGIN}`);

// Create HTTP server
const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      rooms: rooms.size,
      players: playerRooms.size
    }));
    return;
  }
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Domino Game Server</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .status { color: green; font-size: 24px; margin: 20px; }
        .info { background: #f0f0f0; padding: 20px; border-radius: 10px; margin: 20px; }
      </style>
    </head>
    <body>
      <h1>🎲 Domino Game Server</h1>
      <div class="status">✅ Server is running!</div>
      <div class="info">
        <h3>Server Information</h3>
        <p>Port: ${PORT}</p>
        <p>Active Rooms: ${rooms.size}</p>
        <p>Connected Players: ${playerRooms.size}</p>
        <p>Uptime: ${Math.floor(process.uptime())} seconds</p>
      </div>
      <div class="info">
        <h3>Game Links</h3>
        <p><a href="https://domnia-357f4.web.app" target="_blank">🌐 Play Online (Firebase)</a></p>
        <p><a href="http://localhost:${PORT}" target="_blank">🏠 Play Local</a></p>
      </div>
    </body>
    </html>
  `);
});

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN === '*' ? true : CORS_ORIGIN.split(','),
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Game state
const rooms = new Map();
const playerRooms = new Map();

// Socket.IO events
io.on('connection', (socket) => {
  console.log(`🎮 Player connected: ${socket.id}`);

  socket.on('createRoom', (data) => {
    const { playerName } = data;
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const room = {
      id: roomId,
      players: [{
        id: socket.id,
        name: playerName,
        isReady: false,
        isHost: true,
        handCount: 0
      }],
      gameStarted: false,
      gameEnded: false,
      board: [],
      currentPlayer: 0
    };
    
    rooms.set(roomId, room);
    playerRooms.set(socket.id, roomId);
    socket.join(roomId);
    
    socket.emit('roomJoined', {
      success: true,
      roomId,
      game: room,
      playerHand: []
    });
    
    console.log(`🏠 Room created: ${roomId} by ${playerName}`);
  });

  socket.on('joinRoom', (data) => {
    const { roomId, playerName } = data;
    const room = rooms.get(roomId);
    
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }
    
    if (room.players.length >= 4) {
      socket.emit('error', { message: 'Room is full' });
      return;
    }
    
    const newPlayer = {
      id: socket.id,
      name: playerName,
      isReady: false,
      isHost: false,
      handCount: 0
    };
    
    room.players.push(newPlayer);
    playerRooms.set(socket.id, roomId);
    socket.join(roomId);
    
    socket.emit('roomJoined', {
      success: true,
      roomId,
      game: room,
      playerHand: []
    });
    
    socket.to(roomId).emit('playerJoined', {
      game: room,
      newPlayer
    });
    
    console.log(`👥 ${playerName} joined room ${roomId}`);
  });

  socket.on('playerReady', (data) => {
    const roomId = playerRooms.get(socket.id);
    const room = rooms.get(roomId);
    
    if (room) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        player.isReady = data.ready;
        
        io.to(roomId).emit('playerStatusChanged', {
          playerId: socket.id,
          isReady: data.ready,
          game: room
        });
      }
    }
  });

  socket.on('startGame', () => {
    const roomId = playerRooms.get(socket.id);
    const room = rooms.get(roomId);
    
    if (room && room.players.length === 4) {
      room.gameStarted = true;
      room.currentPlayer = 0;
      
      // Generate simple dominoes for each player
      room.players.forEach((player, index) => {
        const hand = [];
        for (let i = 0; i < 7; i++) {
          hand.push({
            id: `${index}-${i}`,
            left: Math.floor(Math.random() * 7),
            right: Math.floor(Math.random() * 7)
          });
        }
        player.hand = hand;
        player.handCount = 7;
      });
      
      room.board = [];
      
      // Send game started to all players
      room.players.forEach(player => {
        const playerSocket = io.sockets.sockets.get(player.id);
        if (playerSocket) {
          playerSocket.emit('gameStarted', {
            game: room,
            playerHand: player.hand,
            startingPlayer: 0
          });
        }
      });
      
      console.log(`🎯 Game started in room ${roomId}`);
    }
  });

  socket.on('playDomino', (data) => {
    const { dominoId, position } = data;
    const roomId = playerRooms.get(socket.id);
    const room = rooms.get(roomId);
    
    if (room && room.gameStarted) {
      const player = room.players.find(p => p.id === socket.id);
      if (player && player.hand) {
        const dominoIndex = player.hand.findIndex(d => d.id === dominoId);
        if (dominoIndex !== -1) {
          const domino = player.hand.splice(dominoIndex, 1)[0];
          room.board.push(domino);
          player.handCount = player.hand.length;
          
          // Next player
          room.currentPlayer = (room.currentPlayer + 1) % room.players.length;
          
          // Send updates to all players
          room.players.forEach(p => {
            const playerSocket = io.sockets.sockets.get(p.id);
            if (playerSocket) {
              playerSocket.emit('gameUpdated', {
                game: room,
                playerHand: p.hand,
                lastMove: { playerId: socket.id, dominoId, position }
              });
            }
          });
          
          // Check win condition
          if (player.hand.length === 0) {
            room.gameEnded = true;
            room.winner = player;
            
            io.to(roomId).emit('gameEnded', {
              winner: player,
              game: room
            });
            
            console.log(`🏆 ${player.name} won in room ${roomId}`);
          }
        }
      }
    }
  });

  socket.on('getRooms', () => {
    const roomsList = Array.from(rooms.values()).map(room => ({
      roomId: room.id,
      playerCount: room.players.length,
      gameStarted: room.gameStarted,
      players: room.players.map(p => p.name)
    }));
    
    socket.emit('roomsList', roomsList);
  });

  socket.on('chatMessage', (data) => {
    const roomId = playerRooms.get(socket.id);
    const room = rooms.get(roomId);
    
    if (room) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        io.to(roomId).emit('chatMessage', {
          playerId: socket.id,
          playerName: player.name,
          message: data.message,
          timestamp: new Date().toISOString()
        });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log(`👋 Player disconnected: ${socket.id}`);
    
    const roomId = playerRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.players = room.players.filter(p => p.id !== socket.id);
        
        if (room.players.length === 0) {
          rooms.delete(roomId);
          console.log(`🗑️ Room ${roomId} deleted (empty)`);
        } else {
          socket.to(roomId).emit('playerLeft', {
            playerId: socket.id,
            game: room
          });
        }
      }
      playerRooms.delete(socket.id);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Domino Game Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${NODE_ENV}`);
  console.log(`🚂 Railway URL: https://domino-game-server-production.up.railway.app`);
  console.log(`📊 Health Check: /health`);
  console.log(`🎲 Game Ready! Players can connect now.`);
});
