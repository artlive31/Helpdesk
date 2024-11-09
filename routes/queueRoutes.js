const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

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


// routes/queueRoutes.js
router.get('/issuelist', isAuthenticated, checkRole([2, 3, 5]), queueController.issueList);
router.post('/updatePriorityAndAssignee', isAuthenticated, checkRole([2]), queueController.updatePriorityAndAssignee);

module.exports = router;
