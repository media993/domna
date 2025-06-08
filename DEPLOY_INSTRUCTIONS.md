# 🚂 Deploy to Railway - Step by Step

## 📋 Files to Upload

### ✅ Required Files (Upload these 4 files):
1. **`basic-server.js`** - Main server code
2. **`package.json`** - Dependencies and configuration
3. **`railway.json`** - Railway deployment settings
4. **`RAILWAY_README.md`** - Documentation

### 📁 Optional Files:
- `.env.example` - Environment variables example

## 🚂 Railway Deployment Steps

### Step 1: Create Railway Account
1. Go to **https://railway.app**
2. Click **"Login with GitHub"**
3. Authorize Railway to access your GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Choose **"Empty Project"**
3. Name your project: `domino-game-server`

### Step 3: Upload Files
1. In your Railway project dashboard
2. Click **"Deploy from GitHub repo"** or **"Upload files"**
3. Upload the 4 required files listed above

## 🌐 الطريقة الثانية: استخدام خدمة أخرى

### Railway (بديل سهل):
1. اذهب إلى: https://railway.app
2. سجل دخول مع GitHub
3. اضغط **"New Project"** → **"Deploy from GitHub repo"**
4. ارفع الملفات

### Heroku (بديل آخر):
1. اذهب إلى: https://heroku.com
2. إنشاء app جديد
3. استخدم Heroku CLI أو GitHub integration

## 🔧 الطريقة الثالثة: خادم مؤقت سريع

### استخدام ngrok (للاختبار):
1. حمل ngrok من: https://ngrok.com
2. شغل الخادم المحلي: `node basic-server.js`
3. في terminal آخر: `ngrok http 8080`
4. استخدم الرابط المؤقت

## 📝 تحديث إعدادات العميل

بعد الحصول على رابط الخادم، حدث الملف:
`client/src/hooks/useSocket.js`

```javascript
const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://YOUR-SERVER-URL.onrender.com'; // ضع رابطك هنا
```

ثم:
```bash
cd client
npm run build
cd ..
firebase deploy --only hosting
```

## 🎯 الحل السريع الآن:

### للاختبار الفوري:
1. شغل الخادم محلياً: `node basic-server.js`
2. افتح: `http://localhost:8080`
3. العب مع الأصدقاء في نفس الشبكة

### للنشر العام:
1. اختر إحدى الطرق أعلاه
2. احصل على رابط الخادم
3. حدث إعدادات العميل
4. أعد نشر Firebase

---

**💡 نصيحة**: ابدأ بـ Railway أو ngrok للاختبار السريع!
