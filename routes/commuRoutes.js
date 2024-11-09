const express = require('express');
const router = express.Router();
const commuController = require('../controllers/commuController');

// Middleware เพื่อตรวจสอบสิทธิ์
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

const checkRole = (allowedRoles) => (req, res, next) => {
    if (req.session.user && allowedRoles.includes(req.session.user.role_id)) {
        return next();
    }
    return res.status(403).json({ error: 'คุณไม่มีสิทธิ์เข้าถึงทรัพยากรนี้' });
};


// แสดงหน้า commu
router.get('/', isAuthenticated, commuController.issueList);

// เส้นทางที่รองรับการส่งข้อความและอัปเดตสถานะพร้อมกัน
router.post('/contact-or-update', isAuthenticated, checkRole([3]), commuController.contactUserOrUpdateStatus);

router.get('/issuelist', isAuthenticated, commuController.issueList);

// เส้นทางสำหรับผู้ใช้เพื่อยืนยันการแก้ไขและอัปเดตสถานะเป็น Resolved
router.post('/resolve', isAuthenticated, checkRole([1]), commuController.resolveIssue);

module.exports = router;
