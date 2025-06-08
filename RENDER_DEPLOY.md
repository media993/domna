# 🚀 نشر خادم الدومينو على Render

## 📋 الخطوات المطلوبة:

### 1. إنشاء حساب على Render
1. اذهب إلى [render.com](https://render.com)
2. سجل دخول باستخدام GitHub أو Google
3. اختر الخطة المجانية

### 2. رفع الكود إلى GitHub
```bash
# إنشاء مستودع Git
git init

# إضافة الملفات
git add .

# إنشاء commit
git commit -m "Initial commit - Domino Game Server"

# ربط مع GitHub (استبدل YOUR_USERNAME بمعرفك)
git remote add origin https://github.com/YOUR_USERNAME/domino-server.git

# رفع الكود
git push -u origin main
```

### 3. إنشاء Web Service على Render
1. في لوحة تحكم Render، اضغط **"New +"**
2. اختر **"Web Service"**
3. اختر **"Build and deploy from a Git repository"**
4. اربط حساب GitHub الخاص بك
5. اختر مستودع `domino-server`

### 4. إعدادات النشر
```
Name: domino-server
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 5. متغيرات البيئة (Environment Variables)
```
NODE_ENV = production
```

### 6. بعد النشر
- ستحصل على رابط مثل: `https://domino-server-xxxx.onrender.com`
- انسخ هذا الرابط

### 7. تحديث إعدادات العميل
في ملف `client/src/hooks/useSocket.js`:
```javascript
const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://domino-server-xxxx.onrender.com'; // ضع رابط Render هنا
```

### 8. إعادة بناء ونشر العميل
```bash
cd client
npm run build
cd ..
firebase deploy --only hosting
```

## 🔧 استكشاف الأخطاء

### إذا فشل النشر:
1. تحقق من logs في Render Dashboard
2. تأكد من وجود ملف `package.json` في الجذر
3. تأكد من أن `npm start` يعمل محلياً

### إذا لم يعمل الاتصال:
1. تحقق من CORS settings في الخادم
2. تأكد من أن Render service يعمل
3. تحقق من browser console للأخطاء

## 📞 الدعم
- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)

---

**ملاحظة**: الخطة المجانية في Render قد تستغرق وقتاً أطول للبدء وقد تتوقف بعد فترة من عدم الاستخدام.
