const express = require('express'); // นำเข้าโมดูล express
const router = express.Router(); // สร้าง router ใหม่สำหรับการจัดการเส้นทาง
const loginController = require('../controllers/loginController'); // นำเข้า loginController

// เส้นทางสำหรับการเข้าสู่ระบบ
router.get('/login', loginController.showLoginForm); // แสดงฟอร์มเข้าสู่ระบบ
router.post('/login', loginController.loginUser); // ประมวลผลการเข้าสู่ระบบเมื่อมีการส่งฟอร์ม

// เส้นทางสำหรับการออกจากระบบ
router.post('/logout', loginController.logoutUser); // ประมวลผลการออกจากระบบ

module.exports = router;