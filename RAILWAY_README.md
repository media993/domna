# 🚂 Domino Game Server - Railway Deployment

## 🎲 About
Multiplayer online domino game server supporting 4 players with real-time communication using Socket.IO.

## 🚀 Quick Deploy to Railway

### Method 1: Direct File Upload
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"** → **"Empty Project"**
4. Upload these files:
   - `basic-server.js`
   - `package.json`
   - `railway.json`
   - `README.md`

### Method 2: GitHub Repository
1. Create a new GitHub repository
2. Upload all files to the repository
3. In Railway, click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository

## 📋 Required Files for Railway

### Core Files:
- ✅ `basic-server.js` - Main server file
- ✅ `package.json` - Dependencies and scripts
- ✅ `railway.json` - Railway configuration

### Optional Files:
- 📚 `README.md` - Documentation
- ⚙️ `.env.example` - Environment variables example

## 🔧 Environment Variables

Railway will automatically set:
- `PORT` - Server port (usually 10000)
- `NODE_ENV` - Set to "production"

Optional variables you can set:
- `CORS_ORIGIN` - CORS origins (default: "*")

## 🌐 After Deployment

1. Railway will provide a URL like: `https://domino-game-server-production.up.railway.app`
2. Test the server: `YOUR-URL/health`
3. Use this URL in your game client

## 🎮 Features

- ✅ **4-Player Support** - Real-time multiplayer domino game
- ✅ **Socket.IO** - WebSocket communication
- ✅ **Room System** - Create and join game rooms
- ✅ **Chat System** - In-game messaging
- ✅ **Game Logic** - Complete domino game rules
- ✅ **Health Check** - Server monitoring endpoint

## 📊 API Endpoints

### HTTP Endpoints:
- `GET /` - Server information page
- `GET /health` - Health check endpoint

### Socket.IO Events:
- `createRoom` - Create a new game room
- `joinRoom` - Join existing room
- `startGame` - Start the game
- `playDomino` - Play a domino piece
- `chatMessage` - Send chat message

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:8080
```

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Socket.IO Docs**: https://socket.io/docs/

## 📄 License

MIT License - Feel free to use and modify!

---

**🎲 Happy Gaming! 🎮**
