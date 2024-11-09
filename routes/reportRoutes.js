const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// ตรวจสอบสิทธิ์สำหรับการเข้าถึง
function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.role_id === 5) { // 5 คือ Admin
        return next();
    }
    return res.status(403).send('Access denied');
}

// เส้นทางต่างๆ สำหรับรายงาน
router.post('/', checkAdmin, reportController.createReport); // สร้างรายงานใหม่
router.get('/', reportController.getAllReports); // ดึงรายงานทั้งหมด
router.get('/user/:userId', reportController.getReportsByUserId); // ดึงรายงานตาม user_id
router.get('/:reportId', reportController.getReportById); // ดึงรายงานตาม report_id

module.exports = router; // ส่งออก router
