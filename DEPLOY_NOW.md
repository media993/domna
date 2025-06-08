# ⚡ نشر سريع على Railway - 10 دقائق

## 🎯 الخطوات السريعة:

### 1. إنشاء حساب Railway (2 دقيقة)
- اذهب إلى: **https://railway.app**
- اضغط **"Login with GitHub"**
- سجل دخول وأقبل الصلاحيات

### 2. رفع الملفات على GitHub (5 دقائق)
- اذهب إلى: **https://github.com/new**
- اسم المستودع: `domino-server`
- اجعله **Public**
- اضغط **"Create repository"**
- اضغط **"uploading an existing file"**
- ارفع هذه الملفات:
  - `basic-server.js`
  - `package.json`
  - `railway.json`
  - `SERVER_README.md`

### 3. النشر على Railway (3 دقيقة)
- ارجع إلى Railway
- اضغط **"New Project"**
- اختر **"Deploy from GitHub repo"**
- اختر مستودع `domino-server`
- انتظر النشر (2-3 دقائق)

### 4. الحصول على الرابط
- اضغط **"Settings"** → **"Networking"**
- اضغط **"Generate Domain"**
- انسخ الرابط (مثل: `https://domino-server-production.up.railway.app`)

### 5. تحديث العميل
في `client/src/hooks/useSocket.js`:
```javascript
const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://YOUR-RAILWAY-URL.up.railway.app'; // ضع رابطك هنا
```

### 6. إعادة النشر
```bash
cd client && npm run build && cd .. && firebase deploy --only hosting
```

## 🎉 انتهيت!

اللعبة ستعمل على: **https://domnia-357f4.web.app**

---

## 🔧 إذا واجهت مشاكل:

### GitHub:
- تأكد من رفع جميع الملفات
- تأكد من أن المستودع Public

### Railway:
- تحقق من Logs إذا فشل النشر
- تأكد من أن package.json صحيح

### العميل:
- تأكد من تحديث رابط الخادم
- تأكد من إعادة البناء والنشر

## 📞 المساعدة:
- Railway Docs: https://docs.railway.app
- GitHub Help: https://docs.github.com

**🚀 بالتوفيق!**
