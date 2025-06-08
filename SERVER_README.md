# 🎲 Domino Game Server

خادم لعبة الدومينو الأونلاين - يدعم 4 لاعبين مع Socket.IO

## 🚀 النشر السريع

### Railway (الموصى به):
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### Render:
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 📋 المميزات

- ✅ **لعب جماعي**: حتى 4 لاعبين
- ✅ **Socket.IO**: اتصال مباشر وسريع
- ✅ **إدارة الغرف**: إنشاء والانضمام للغرف
- ✅ **المحادثة**: نظام محادثة مدمج
- ✅ **منطق اللعبة**: قواعد الدومينو الكاملة
- ✅ **CORS**: يدعم جميع المصادر
- ✅ **Health Check**: مراقبة حالة الخادم

## 🛠️ التشغيل المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل الخادم
npm start

# أو
node basic-server.js
```

الخادم سيعمل على: `http://localhost:8080`

## 📡 API Endpoints

### HTTP:
- `GET /` - صفحة معلومات الخادم
- `GET /health` - فحص حالة الخادم

### Socket.IO Events:

#### العميل → الخادم:
- `createRoom` - إنشاء غرفة جديدة
- `joinRoom` - الانضمام لغرفة
- `startGame` - بدء اللعبة
- `playDomino` - لعب قطعة دومينو
- `playerReady` - تغيير حالة الجاهزية
- `getRooms` - الحصول على قائمة الغرف
- `chatMessage` - إرسال رسالة

#### الخادم → العميل:
- `roomJoined` - تأكيد الانضمام للغرفة
- `playerJoined` - لاعب جديد انضم
- `playerLeft` - لاعب غادر
- `gameStarted` - بدأت اللعبة
- `gameUpdated` - تحديث حالة اللعبة
- `gameEnded` - انتهت اللعبة
- `chatMessage` - رسالة جديدة
- `error` - رسالة خطأ

## 🔧 متغيرات البيئة

```bash
PORT=8080          # منفذ الخادم (افتراضي: 8080)
NODE_ENV=production # بيئة التشغيل
```

## 📊 مراقبة الخادم

### Health Check:
```bash
curl http://localhost:8080/health
```

### Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "rooms": 5,
  "players": 12
}
```

## 🌐 النشر على المنصات

### Railway:
1. ربط GitHub
2. اختيار المستودع
3. النشر التلقائي

### Render:
1. إنشاء Web Service
2. ربط GitHub
3. إعداد Build Command: `npm install`
4. إعداد Start Command: `npm start`

### Heroku:
1. إنشاء app
2. ربط GitHub أو استخدام CLI
3. إعداد Procfile

## 🔒 الأمان

- ✅ CORS مُفعل لجميع المصادر
- ✅ معالجة أخطاء Socket.IO
- ✅ تنظيف الذاكرة عند قطع الاتصال
- ✅ حماية من الغرف الفارغة

## 📈 الأداء

- **الذاكرة**: ~50MB
- **CPU**: منخفض
- **الشبكة**: WebSocket + HTTP fallback
- **التزامن**: يدعم مئات اللاعبين

## 🐛 استكشاف الأخطاء

### مشاكل شائعة:

#### الخادم لا يبدأ:
```bash
# تحقق من المنفذ
netstat -an | grep 8080

# تحقق من التبعيات
npm install
```

#### مشاكل الاتصال:
```bash
# تحقق من CORS
curl -H "Origin: http://localhost:3000" http://localhost:8080/health

# تحقق من Socket.IO
curl http://localhost:8080/socket.io/
```

#### مشاكل الذاكرة:
```bash
# مراقبة الاستخدام
node --inspect basic-server.js
```

## 📞 الدعم

- **GitHub Issues**: للمشاكل التقنية
- **Documentation**: في ملفات المشروع
- **Community**: Discord أو Telegram

## 📄 الترخيص

MIT License - استخدم بحرية!

---

**🎮 استمتع باللعب! 🎲**
