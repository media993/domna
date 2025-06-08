# 🚂 دليل النشر على Railway - خطوة بخطوة

## 📋 الملفات المطلوبة

### ✅ الملفات الأساسية للرفع:
1. **`basic-server.js`** - الخادم الرئيسي
2. **`package.json`** - التبعيات والإعدادات
3. **`railway.json`** - إعدادات Railway
4. **`client/dist/`** - مجلد اللعبة المبني
5. **`README-RAILWAY.md`** - وثائق المشروع

## 🌐 الطريقة الأولى: عبر GitHub (الأسهل)

### الخطوة 1: إنشاء مستودع GitHub
1. اذهب إلى: **https://github.com/new**
2. اسم المستودع: `domino-game-server`
3. اجعله **Public**
4. اضغط **"Create repository"**

### الخطوة 2: رفع الملفات
1. في صفحة المستودع الجديد
2. اضغط **"uploading an existing file"**
3. ارفع هذه الملفات:
   - `basic-server.js`
   - `package.json`
   - `railway.json`
   - `README-RAILWAY.md` (أعد تسميته إلى README.md)
   - مجلد `client` كاملاً
4. اكتب رسالة commit: "Initial commit - Domino Game"
5. اضغط **"Commit changes"**

### الخطوة 3: النشر على Railway
1. اذهب إلى: **https://railway.app**
2. اضغط **"Login with GitHub"**
3. اضغط **"New Project"**
4. اختر **"Deploy from GitHub repo"**
5. اختر مستودع `domino-game-server`
6. اضغط **"Deploy Now"**

## 🔧 الطريقة الثانية: رفع مباشر

### الخطوة 1: إنشاء مشروع Railway
1. اذهب إلى: **https://railway.app**
2. سجل دخول مع GitHub
3. اضغط **"New Project"** → **"Empty Project"**

### الخطوة 2: رفع الملفات
1. استخدم Railway CLI أو GitHub integration
2. ارفع الملفات المطلوبة

## ⚙️ إعدادات Railway

### متغيرات البيئة (تلقائية):
```
PORT=10000          # يتم تعيينه تلقائياً
NODE_ENV=production # يتم تعيينه تلقائياً
```

### إعدادات إضافية (اختيارية):
```
CORS_ORIGIN=*       # للسماح بجميع المصادر
```

## 🎯 بعد النشر

### الخطوة 1: الحصول على الرابط
1. في لوحة تحكم Railway
2. اذهب إلى **"Settings"** → **"Networking"**
3. اضغط **"Generate Domain"**
4. انسخ الرابط (مثل: `https://domino-game-server-production.up.railway.app`)

### الخطوة 2: اختبار اللعبة
1. افتح الرابط في المتصفح
2. يجب أن تظهر لعبة الدومينو مباشرة
3. جرب إنشاء غرفة واللعب

### الخطوة 3: مشاركة اللعبة
- شارك الرابط مع الأصدقاء
- يمكن لـ 4 أشخاص اللعب معاً
- لا حاجة لتسجيل دخول

## 🔍 استكشاف الأخطاء

### إذا فشل النشر:
1. تحقق من **"Deployments"** في Railway
2. راجع الـ logs للأخطاء
3. تأكد من وجود جميع الملفات

### إذا لم تعمل اللعبة:
1. تحقق من **"Metrics"** في Railway
2. تأكد من أن الخدمة تعمل
3. اختبر endpoint الصحة: `YOUR-URL/health`

### مشاكل شائعة:
- **Port Error**: Railway يعين PORT تلقائياً
- **File Not Found**: تأكد من رفع مجلد `client/dist`
- **CORS Error**: تأكد من إعدادات CORS

## 💡 نصائح مهمة

### للخطة المجانية:
- ✅ 500 ساعة شهرياً مجاناً
- ⚠️ قد يتوقف بعد 30 دقيقة من عدم الاستخدام
- ⚠️ وقت بدء أطول بعد التوقف

### لتحسين الأداء:
- استخدم خدمة ping مثل UptimeRobot
- أو اجعل العميل يرسل ping كل 25 دقيقة

## 📋 قائمة التحقق النهائية

قبل النشر، تأكد من:
- [ ] ✅ `basic-server.js` موجود ومحدث
- [ ] ✅ `package.json` يحتوي على التبعيات الصحيحة
- [ ] ✅ `railway.json` موجود مع الإعدادات
- [ ] ✅ `client/dist/` مبني ومحدث
- [ ] ✅ README.md موجود مع التعليمات

## 🎉 النتيجة المتوقعة

بعد النشر الناجح:
- ✅ رابط عام للعبة
- ✅ دعم 4 لاعبين متزامن
- ✅ واجهة عربية جميلة
- ✅ دخول مباشر بدون تسجيل
- ✅ محادثة مباشرة
- ✅ أسماء عشوائية ذكية

## 🔗 روابط مفيدة

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway

---

**🚂 كل ما تحتاجه للنشر الناجح! 🎮**
