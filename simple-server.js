const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:8080",
    "https://domnia-357f4.web.app",
    "https://domnia-357f4.firebaseapp.com"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// Socket.IO configuration
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://localhost:8080",
      "https://domnia-357f4.web.app",
      "https://domnia-357f4.firebaseapp.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Simple game state management
const rooms = new Map();
const playerRooms = new Map();

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    rooms: rooms.size,
    players: playerRooms.size
  });
});

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
        isHost: true
      }],
      gameStarted: false,
      gameEnded: false
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
    
    room.players.push({
      id: socket.id,
      name: playerName,
      isReady: false,
      isHost: false
    });
    
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
      newPlayer: room.players.find(p => p.id === socket.id)
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
      
      // Simple domino distribution
      room.players.forEach((player, index) => {
        player.hand = Array.from({length: 7}, (_, i) => ({
          id: `${index}-${i}`,
          left: Math.floor(Math.random() * 7),
          right: Math.floor(Math.random() * 7)
        }));
      });
      
      room.board = [];
      room.currentPlayer = 0;
      
      io.to(roomId).emit('gameStarted', {
        game: room,
        playerHand: room.players.find(p => p.id === socket.id)?.hand || [],
        startingPlayer: 0
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
          room.board = room.board || [];
          room.board.push(domino);
          
          // Next player
          room.currentPlayer = (room.currentPlayer + 1) % room.players.length;
          
          io.to(roomId).emit('gameUpdated', {
            game: room,
            playerHand: player.hand,
            lastMove: { playerId: socket.id, dominoId, position }
          });
          
          // Check win condition
          if (player.hand.length === 0) {
            room.gameEnded = true;
            room.winner = player;
            
            io.to(roomId).emit('gameEnded', {
              winner: player,
              game: room
            });
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

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`🎮 Domino Game Server running on port ${PORT}`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
  console.log(`🔌 Socket.IO: ws://localhost:${PORT}`);
  console.log(`🔥 Firebase: https://domnia-357f4.web.app`);
});
