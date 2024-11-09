const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
};

// แสดงฟอร์มสำหรับการสร้างปัญหาใหม่
router.get('/create', isAuthenticated, issueController.newIssueForm);

// จัดการการส่งข้อมูลปัญหา
router.post('/create', isAuthenticated, issueController.createIssue);

// แสดงรายการปัญหาทั้งหมด
router.get('/issuelist', isAuthenticated, issueController.issueList);

// ดึงข้อมูลโปรไฟล์ผู้ใช้
router.get('/profile', isAuthenticated, issueController.getUserProfile);

module.exports = router;
