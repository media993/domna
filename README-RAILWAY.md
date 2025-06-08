# 🎲 Domino Game - Multiplayer Online

لعبة دومينو أونلاين للعب الجماعي - يدعم 4 لاعبين مع محادثة مباشرة

## 🚀 Quick Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

## 🎮 Features

- ✅ **4-Player Multiplayer** - Real-time domino game
- ✅ **Direct Entry** - No registration required
- ✅ **Arabic Interface** - Full RTL support
- ✅ **Voice Chat Ready** - Mute/unmute functionality
- ✅ **Real-time Chat** - In-game messaging
- ✅ **Random Names** - Auto-generated player names
- ✅ **Mobile Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Backend**: Node.js + Socket.IO
- **Frontend**: React + Vite + Tailwind CSS
- **Deployment**: Railway
- **Real-time**: WebSocket communication

## 🚂 Railway Deployment

### Automatic Deploy:
1. Click the Railway button above
2. Connect your GitHub account
3. Deploy automatically

### Manual Deploy:
1. Fork this repository
2. Connect to Railway
3. Deploy from GitHub

## 🌐 Environment Variables

Railway will automatically set:
- `PORT` - Server port
- `NODE_ENV` - Production environment

## 📊 API Endpoints

- `GET /` - Game interface
- `GET /health` - Health check

## 🎯 How to Play

1. Open the game URL
2. Enter your name (or use auto-generated)
3. Create a room or join existing one
4. Wait for 4 players
5. Start playing!

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Build client (if needed)
cd client && npm run build
```

## 📄 License

MIT License - Feel free to use and modify!

---

**🎮 Ready to play? Deploy now and enjoy! 🎲**
