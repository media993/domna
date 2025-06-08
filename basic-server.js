const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

// Environment variables
const PORT = process.env.PORT || 10000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

console.log('🚂 Starting Domino Game Server...');
console.log('📊 Environment:', NODE_ENV);
console.log('🌐 Port:', PORT);
console.log('🔒 CORS Origin:', CORS_ORIGIN);

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



  // Serve static files from client/dist
  const url = require('url');
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  // Default to index.html for root and unknown routes
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const clientPath = path.join(__dirname, 'client', 'dist', pathname);

  try {
    const stats = fs.statSync(clientPath);
    if (stats.isFile()) {
      const ext = path.extname(pathname);
      let contentType = 'text/html; charset=utf-8';

      switch (ext) {
        case '.js':
          contentType = 'application/javascript; charset=utf-8';
          break;
        case '.css':
          contentType = 'text/css; charset=utf-8';
          break;
        case '.json':
          contentType = 'application/json; charset=utf-8';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
      }

      const content = fs.readFileSync(clientPath);
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      });
      res.end(content);
      return;
    }
  } catch (error) {
    // File not found, serve index.html for SPA routing
    try {
      const indexPath = path.join(__dirname, 'client', 'dist', 'index.html');
      const html = fs.readFileSync(indexPath, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(html);
    } catch (indexError) {
      // Fallback if client files don't exist
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(getGameLoadingPage());
    }
  }

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



// Helper function for game loading page (fallback)
function getGameLoadingPage() {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>🎲 لعبة الدومينو</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
          padding: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          min-height: 100vh;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container { max-width: 600px; }
        .spinner {
          border: 4px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top: 4px solid #fff;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .title {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
        }
        .message {
          font-size: 18px;
          margin: 20px 0;
          opacity: 0.9;
        }
        .error {
          background: rgba(255,0,0,0.2);
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border: 1px solid rgba(255,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">🎲 لعبة الدومينو</h1>
        <div class="spinner"></div>
        <p class="message">جاري إعداد اللعبة...</p>
        <div class="error">
          <h3>⚠️ ملفات اللعبة غير موجودة</h3>
          <p>يبدو أن ملفات العميل لم يتم بناؤها أو رفعها بشكل صحيح.</p>
          <p><strong>للمطور:</strong> تأكد من رفع مجلد client/dist/ مع الملفات.</p>
        </div>
        <p class="message">سيتم إعادة المحاولة تلقائياً...</p>
        <script>
          // إعادة تحميل الصفحة كل 10 ثوان
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        </script>
      </div>
    </body>
    </html>
  `;
}

// Socket.IO events
io.on('connection', (socket) => {
  console.log('🎮 Player connected:', socket.id);

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
    
    console.log('🏠 Room created:', roomId, 'by', playerName);
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
    
    console.log('👥', playerName, 'joined room', roomId);
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
      
      console.log('🎯 Game started in room', roomId);
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
            
            console.log('🏆', player.name, 'won in room', roomId);
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
    console.log('👋 Player disconnected:', socket.id);
    
    const roomId = playerRooms.get(socket.id);
    if (roomId) {
      const room = rooms.get(roomId);
      if (room) {
        room.players = room.players.filter(p => p.id !== socket.id);
        
        if (room.players.length === 0) {
          rooms.delete(roomId);
          console.log('🗑️ Room', roomId, 'deleted (empty)');
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
  console.log('🎮 Domino Game Server running on port', PORT);
  console.log('🎲 Game Ready! Open: http://localhost:' + PORT);
});
