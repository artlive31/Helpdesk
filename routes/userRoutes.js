const express = require('express'); // นำเข้าโมดูล express
const router = express.Router(); // สร้าง router ใหม่สำหรับการจัดการเส้นทาง
const userController = require('../controllers/userController'); // นำเข้า userController เพื่อใช้ฟังก์ชันที่เกี่ยวข้องกับผู้ใช้
const issueController = require('../controllers/issueController'); // นำเข้า issueController เพื่อใช้ฟังก์ชันที่เกี่ยวข้องกับปัญหา

// Middleware สำหรับการตรวจสอบการเข้าสู่ระบบ
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); // ถ้าไม่ได้เข้าสู่ระบบ ให้เปลี่ยนเส้นทางไปที่หน้าเข้าสู่ระบบ
    }
    next(); // ถ้าเข้าสู่ระบบแล้ว ให้ดำเนินการต่อไป
};

// เส้นทางสำหรับโปรไฟล์ผู้ใช้
router.get('/profile', isAuthenticated, issueController.getUserProfile); // ดึงข้อมูลโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบ

// เส้นทางสำหรับการแสดงโปรไฟล์ผู้ใช้
router.get('/profile', userController.showProfile); // แสดงโปรไฟล์ของผู้ใช้

// เส้นทางสำหรับรายการผู้ใช้
router.get('/', userController.listUsers); // แสดงรายการผู้ใช้ทั้งหมด

// เส้นทางสำหรับการเพิ่มผู้ใช้
router.get('/add-user', userController.showAddUserForm); // แสดงฟอร์มสำหรับเพิ่มผู้ใช้ใหม่
router.post('/add-user', userController.addUser); // ประมวลผลการเพิ่มผู้ใช้ใหม่

// เส้นทางสำหรับการแก้ไขข้อมูลผู้ใช้
router.get('/users/:id/edit', userController.showEditUserForm);
// เส้นทางสำหรับการอัปเดตข้อมูลผู้ใช้
router.post('/users/:id', userController.updateUser);
// เส้นทางสำหรับการลบผู้ใช้
router.delete('/users/:id', userController.deleteUser); // ลบผู้ใช้

// ส่งออก router เพื่อให้ใช้งานในโมดูลอื่นๆ
module.exports = router; 
