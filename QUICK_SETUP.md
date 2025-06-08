# ⚡ الإعداد السريع - جعل اللعبة تعمل في 5 دقائق

## 🎯 الحل الأسرع: استخدام ngrok

### 1. تحميل ngrok
- اذهب إلى: https://ngrok.com/download
- حمل النسخة المناسبة لنظامك
- استخرج الملف

### 2. تشغيل الخادم المحلي
```bash
# في terminal أول
cd e:\domnia
node basic-server.js
```

### 3. تشغيل ngrok
```bash
# في terminal ثاني
ngrok http 8080
```

### 4. نسخ الرابط
- ستحصل على رابط مثل: `https://abc123.ngrok.io`
- انسخ هذا الرابط

### 5. تحديث إعدادات العميل
في ملف `client/src/hooks/useSocket.js`:
```javascript
const serverUrl = 'https://abc123.ngrok.io'; // ضع رابط ngrok هنا
```

### 6. إعادة بناء ونشر
```bash
cd client
npm run build
cd ..
firebase deploy --only hosting
```

## 🌟 البدائل الأخرى:

### أ) Railway (مجاني ودائم):
1. https://railway.app
2. ربط GitHub
3. نشر تلقائي

### ب) Render (مجاني):
1. https://render.com
2. رفع الملفات
3. إعداد بسيط

### ج) Heroku (محدود مجاني):
1. https://heroku.com
2. CLI أو GitHub
3. إعداد متقدم

## 🔥 الحل الفوري (بدون نشر):

### مشاركة الشبكة المحلية:
1. شغل الخادم: `node basic-server.js`
2. اعرف IP الجهاز: `ipconfig` (Windows) أو `ifconfig` (Mac/Linux)
3. شارك الرابط: `http://YOUR-IP:8080`
4. الأصدقاء في نفس الشبكة يمكنهم اللعب

## 📱 للهواتف:
- تأكد من أن الهاتف والكمبيوتر في نفس الشبكة
- استخدم IP الكمبيوتر: `http://192.168.1.XXX:8080`

---

**⚡ الأسرع**: ngrok للاختبار الفوري
**🌟 الأفضل**: Railway للنشر الدائم
