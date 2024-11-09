const express = require('express'); // นำเข้าโมดูล express
const path = require('path'); // นำเข้าโมดูล path สำหรับจัดการเส้นทางไฟล์
const session = require('express-session'); // นำเข้า express-session สำหรับการจัดการเซสชัน

const loginRoutes = require('./routes/loginRoutes'); // นำเข้า loginRoutes สำหรับการจัดการการเข้าสู่ระบบ
const userRoutes = require('./routes/userRoutes'); // นำเข้า userRoutes สำหรับการจัดการผู้ใช้
const issueRoutes = require('./routes/issueRoutes'); // นำเข้า issueRoutes สำหรับการจัดการปัญหา
const issueController = require('./controllers/issueController'); // นำเข้า issueController เพื่อจัดการฟังก์ชันที่เกี่ยวข้องกับปัญหา
const knowledgeRoutes = require('./routes/knowledgeRoutes'); // นำเข้า knowledgeRoutes สำหรับการจัดการความรู้
const reportRoutes = require('./routes/reportRoutes'); // นำเข้า reportRoutes
const queueRoutes = require('./routes/queueRoutes'); // นำเข้า queueRoutes
const commuRoutes = require('./routes/commuRoutes'); // เพิ่มเส้นทาง commuRoutes
const methodOverride = require('method-override');


const app = express(); // สร้างแอปพลิเคชัน express
const port = 5002; // กำหนดพอร์ตที่เซิร์ฟเวอร์จะทำงาน

// Middleware เพื่อแยกวิเคราะห์คำขอที่เข้ามา
app.use(express.urlencoded({ extended: true })); // แยกวิเคราะห์ข้อมูลฟอร์ม
app.use(express.json()); // แยกวิเคราะห์ข้อมูล JSON

// กำหนด middleware สำหรับการจัดการเซสชัน
app.use(session({
  secret: 'helpdesk', // รหัสลับสำหรับเซสชัน
  resave: false, // ไม่ต้องบันทึกเซสชันซ้ำ
  saveUninitialized: true, // บันทึกเซสชันที่ยังไม่ได้เริ่ม
  cookie: { secure: false } // ไม่ใช้ cookie ที่ปลอดภัยในโหมดพัฒนา
}));

// Middleware สำหรับตรวจสอบสถานะการเข้าสู่ระบบ
app.use((req, res, next) => {
  res.locals.isLoggedIn = !!req.session.user; // ตรวจสอบว่ามีเซสชันของผู้ใช้หรือไม่
  res.locals.currentUser = req.session.user ? req.session.user.username : ''; // ดึงชื่อผู้ใช้จากเซสชัน
  next(); // ดำเนินการต่อ
});

// Middleware สำหรับตรวจสอบสิทธิ์ผู้ใช้งาน
function checkRole(roleId) {
  return (req, res, next) => {
      if (req.session.user && req.session.user.role_id === roleId) {
          next(); // ถ้ามีสิทธิ์ให้ดำเนินการต่อ
      } else {
          res.status(403).send('Access denied'); // ถ้าไม่มีสิทธิ์ให้ส่งสถานะ 403
      }
  };
}

//ตรวจสอบว่า user_id ถูกเก็บใน session หรือไม่
app.use((req, res, next) => {
  if (req.session.user) {
      console.log("Current Session User ID:", req.session.user.user_id);
  }
  res.locals.currentUser = req.session.user;
  next();
});

// กำหนด view engine เป็น EJS
app.set('view engine', 'ejs'); // ตั้งค่า view engine เป็น EJS
app.use(express.static('public')); // ใช้โฟลเดอร์ public สำหรับไฟล์ static
app.set('views', path.join(__dirname, 'views')); // กำหนดโฟลเดอร์ views
app.use(express.static(path.join(__dirname, 'public'))); // ใช้โฟลเดอร์ public สำหรับไฟล์ static
app.use(methodOverride('_method')); // ใช้ _method สำหรับการทำให้ Express รองรับ PUT/DELETE



// เส้นทางสำหรับการเข้าสู่ระบบ
app.use('/', loginRoutes);
 // เส้นทางสำหรับจัดการผู้ใช้ เช่น เข้าสู่ระบบและลงทะเบียน
app.use('/', userRoutes);
 // เส้นทางสำหรับจัดการปัญหาหรือคำขอ
app.use('/issues', issueRoutes);
// เส้นทางสำหรับแสดงรายการปัญหา
app.get('/issues/issuelist', issueController.issueList);
// เพิ่มเส้นทางสำหรับหน้า main.ejs
app.get('/main', issueController.mainIssueList); 
// เส้นทางสำหรับจัดการความรู้
app.use(knowledgeRoutes);
// เส้นทางสำหรับจัดการรายงาน
app.use('/reports', reportRoutes);
// เส้นทางสำหรับจัดการคิว
app.use('/queues', queueRoutes);
// เส้นทางสำหรับการสื่อสาร
app.use('/commu', commuRoutes);

// เส้นทางเปลี่ยนเส้นทางไปยัง main.ejs หรือ users.ejs ตามบทบาท
app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const { role_id } = req.session.user;
  if (role_id === 5) {
    res.redirect('/users'); // ถ้าเป็น Admin
  } else {
    res.redirect('/main'); // ถ้าเป็นผู้ใช้อื่นๆ
  }
});

// Middleware สำหรับจัดการข้อผิดพลาด
app.use((err, req, res, next) => {
  console.error(err.stack); // แสดงข้อผิดพลาดในคอนโซล
  res.status(500).send('Something went wrong! ' + err.message); // ส่งสถานะ 500 และข้อความแสดงข้อผิดพลาด
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // แสดงข้อความในคอนโซลเมื่อเซิร์ฟเวอร์เริ่มทำงาน
});
