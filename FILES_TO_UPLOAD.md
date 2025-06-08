# 📁 Files to Upload to Railway

## ✅ Required Files (4 files total)

### 1. `basic-server.js`
- **Size**: ~8KB
- **Description**: Main server code with Socket.IO
- **Status**: ✅ Ready with environment variables

### 2. `package.json`
- **Size**: ~1KB  
- **Description**: Dependencies and npm scripts
- **Status**: ✅ Updated for Railway deployment

### 3. `railway.json`
- **Size**: ~500B
- **Description**: Railway deployment configuration
- **Status**: ✅ Configured with health check

### 4. `RAILWAY_README.md`
- **Size**: ~3KB
- **Description**: Documentation for the project
- **Status**: ✅ Ready (rename to README.md when uploading)

## 📋 Optional Files

### 5. `.env.example`
- **Size**: ~500B
- **Description**: Environment variables template
- **Status**: ✅ Created for reference

## 🚀 Upload Instructions

### Method 1: Direct Upload to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Upload the 4 required files above
4. Railway will auto-deploy

### Method 2: GitHub Repository
1. Create GitHub repo
2. Upload all files
3. Connect Railway to GitHub repo
4. Auto-deploy on push

## 🔧 Environment Variables (Auto-set by Railway)

```bash
PORT=10000                    # Auto-set by Railway
NODE_ENV=production          # Auto-set by Railway  
CORS_ORIGIN=*               # Allows all origins
```

## 🌐 Expected Result

After upload, you'll get:
- **URL**: `https://domino-game-server-production.up.railway.app`
- **Health Check**: `YOUR-URL/health`
- **Game Server**: Ready for 4 players

## 📊 File Checklist

Before uploading, ensure you have:

- [ ] `basic-server.js` (Main server)
- [ ] `package.json` (Dependencies)  
- [ ] `railway.json` (Config)
- [ ] `RAILWAY_README.md` (Docs)
- [ ] `.env.example` (Optional)

## 🎯 Next Steps After Upload

1. ✅ Wait for deployment (2-3 minutes)
2. ✅ Test health endpoint
3. ✅ Get your Railway URL
4. ✅ Update game client with new URL
5. ✅ Start playing!

---

**🚂 Ready for Railway deployment! 🎮**
