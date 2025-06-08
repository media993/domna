# 🚂 دليل النشر على Railway - خطوة بخطوة

## 📋 المتطلبات:
- حساب GitHub (مجاني)
- حساب Railway (مجاني)
- الملفات الجاهزة (موجودة)

## 🚀 الخطوات التفصيلية:

### الخطوة 1: إنشاء حساب Railway
1. اذهب إلى: **https://railway.app**
2. اضغط **"Login"**
3. اختر **"Login with GitHub"**
4. سجل دخول بحساب GitHub الخاص بك
5. اقبل الصلاحيات المطلوبة

### الخطوة 2: إنشاء مشروع جديد
1. في لوحة تحكم Railway، اضغط **"New Project"**
2. اختر **"Deploy from GitHub repo"**
3. إذا لم تربط GitHub بعد، اضغط **"Configure GitHub App"**
4. اختر المستودعات التي تريد الوصول إليها

### الخطوة 3: رفع الكود إلى GitHub
إذا لم يكن لديك مستودع GitHub:

#### أ) إنشاء مستودع جديد:
1. اذهب إلى: **https://github.com/new**
2. اسم المستودع: `domino-game-server`
3. اجعله **Public**
4. اضغط **"Create repository"**

#### ب) رفع الملفات:
1. في صفحة المستودع الجديد، اضغط **"uploading an existing file"**
2. اسحب هذه الملفات:
   - `basic-server.js`
   - `package.json`
   - `railway.json`
   - `README.md`
3. اكتب رسالة commit: "Initial commit - Domino Game Server"
4. اضغط **"Commit changes"**

### الخطوة 4: النشر على Railway
1. ارجع إلى Railway
2. اضغط **"New Project"** → **"Deploy from GitHub repo"**
3. اختر مستودع `domino-game-server`
4. اضغط **"Deploy Now"**

### الخطوة 5: انتظار النشر
- سيبدأ Railway في بناء المشروع تلقائياً
- ستظهر logs في الشاشة
- انتظر حتى ترى "✅ Build successful"
- ثم "✅ Deployment successful"

### الخطوة 6: الحصول على الرابط
1. في لوحة تحكم المشروع، اضغط على **"Settings"**
2. اذهب إلى **"Networking"**
3. اضغط **"Generate Domain"**
4. ستحصل على رابط مثل: `https://domino-game-server-production.up.railway.app`
5. **انسخ هذا الرابط** - ستحتاجه لاحقاً

### الخطوة 7: اختبار الخادم
1. افتح الرابط في المتصفح
2. يجب أن ترى صفحة الخادم مع معلومات الحالة
3. اختبر endpoint الصحة: `YOUR-URL/health`

## 🔧 تحديث إعدادات العميل

### الخطوة 8: تحديث إعدادات الاتصال
في ملف `client/src/hooks/useSocket.js`:

```javascript
// استبدل هذا السطر:
const serverUrl = 'http://localhost:8080';

// بهذا (ضع رابط Railway الخاص بك):
const serverUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:8080'
  : 'https://domino-game-server-production.up.railway.app';
```

### الخطوة 9: إعادة بناء ونشر العميل
```bash
# في مجلد المشروع
cd client
npm run build
cd ..
firebase deploy --only hosting
```

## ✅ التحقق من النجاح

### اختبار الاتصال:
1. افتح: `https://domnia-357f4.web.app`
2. تحقق من حالة الاتصال (يجب أن تظهر "متصل")
3. جرب إنشاء غرفة
4. ادع صديق للاختبار

## 🔧 استكشاف الأخطاء

### إذا فشل النشر:
1. تحقق من **Logs** في Railway
2. تأكد من وجود `package.json` صحيح
3. تأكد من أن `npm start` يعمل محلياً

### إذا لم يعمل الاتصال:
1. تحقق من **Metrics** في Railway
2. تأكد من أن الخادم يعمل (status: running)
3. اختبر الرابط مباشرة في المتصفح
4. تحقق من browser console للأخطاء

### إذا كان الخادم بطيء:
- الخطة المجانية قد تستغرق وقتاً للبدء
- بعد 30 دقيقة من عدم الاستخدام، قد يتوقف الخادم
- أول طلب بعد التوقف قد يستغرق 30-60 ثانية

## 💡 نصائح مهمة:

### للخطة المجانية:
- ✅ 500 ساعة شهرياً مجاناً
- ✅ نطاق فرعي مجاني
- ⚠️ قد يتوقف بعد عدم الاستخدام
- ⚠️ وقت بدء أطول

### للحفاظ على الخادم نشط:
- استخدم خدمة ping مثل UptimeRobot
- أو اجعل العميل يرسل ping كل 25 دقيقة

## 🎯 الخطوات السريعة:

1. **إنشاء حساب Railway** ← 2 دقيقة
2. **رفع الكود على GitHub** ← 5 دقائق  
3. **النشر على Railway** ← 3 دقائق
4. **تحديث إعدادات العميل** ← 2 دقيقة
5. **إعادة نشر Firebase** ← 2 دقيقة

**المجموع: ~15 دقيقة** ⏱️

---

**🎉 بعد اتباع هذه الخطوات، ستعمل لعبة الدومينو عالمياً!**
