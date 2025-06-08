# 🔄 Update Client After Railway Deployment

## 🎯 After Railway Deployment

Once you get your Railway URL (e.g., `https://your-app-name.up.railway.app`), follow these steps:

## 📝 Step 1: Update Server URL

### In `client/src/hooks/useSocket.js`:

**Replace this line:**
```javascript
: 'https://domino-game-server-production.up.railway.app'; // Replace with your Railway URL
```

**With your actual Railway URL:**
```javascript
: 'https://YOUR-ACTUAL-RAILWAY-URL.up.railway.app';
```

### Example:
If your Railway URL is `https://domino-server-abc123.up.railway.app`, then:

```javascript
const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://domino-server-abc123.up.railway.app';
```

## 🔧 Step 2: Rebuild Client

```bash
# Navigate to client folder
cd client

# Rebuild the client
npm run build
```

## 🚀 Step 3: Test the Connection

### Local Testing:
```bash
# Start local server (for testing)
node basic-server.js

# In another terminal, start client
cd client
npm run dev

# Open: http://localhost:5173
```

### Production Testing:
1. Open your Railway URL directly: `https://your-url.up.railway.app`
2. You should see the server info page
3. Test health check: `https://your-url.up.railway.app/health`

## 🌐 Step 4: Deploy Client (Optional)

### Option A: Serve from Railway Server
The Railway server already serves the built client files from `/client/dist/`

### Option B: Deploy Client Separately
You can deploy the client to:
- **Netlify**: Drag & drop `client/dist` folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Upload `client/dist` contents

## 🧪 Step 5: Test Multiplayer

1. **Open the game** in multiple browser tabs/windows
2. **Create a room** in one tab
3. **Join the room** from other tabs
4. **Test chat** and **game functionality**

## 🔍 Troubleshooting

### Connection Issues:
```javascript
// Check browser console for errors
// Should see: "✅ Connected to server: SOCKET_ID"
```

### CORS Issues:
If you see CORS errors, the Railway server is configured to allow all origins (`*`).

### Server Not Responding:
1. Check Railway deployment status
2. Check Railway logs for errors
3. Verify health endpoint: `YOUR-URL/health`

## 📋 Quick Checklist

- [ ] ✅ Railway server deployed successfully
- [ ] ✅ Got Railway URL from dashboard
- [ ] ✅ Updated `useSocket.js` with correct URL
- [ ] ✅ Rebuilt client (`npm run build`)
- [ ] ✅ Tested connection
- [ ] ✅ Tested multiplayer functionality

## 🎮 Final Result

After completing these steps:
- ✅ **Server**: Running on Railway
- ✅ **Client**: Updated with correct server URL
- ✅ **Game**: Fully functional multiplayer domino game
- ✅ **Global Access**: Anyone can play from anywhere

## 🔗 Useful URLs

- **Railway Dashboard**: https://railway.app/dashboard
- **Server Health**: `https://your-url.up.railway.app/health`
- **Game Server**: `https://your-url.up.railway.app`

---

**🎲 Game is ready for global multiplayer! 🌍**
