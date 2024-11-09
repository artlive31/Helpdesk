const Issue = require('../models/queue');

// แสดงรายการ issues ทั้งหมด
exports.issueList = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }

    try {
        const { user_id, role_id } = req.session.user;
        const { searchText, statusFilter } = req.query;  // รับค่าจาก query string

        // กรองข้อมูลจากฐานข้อมูล
        const issues = await Issue.getAllIssues(user_id, role_id, searchText, statusFilter);

        // จัดเรียง issues โดยเรียงจากใหม่ไปเก่า
        issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const successMessage = req.session.successMessage;
        req.session.successMessage = null;

        // จัดเรียง issues โดยเรียงจากใหม่ไปเก่า
        issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.render('issuelist', { 
            user: req.session.user, 
            issues, 
            successMessage,
            canViewAllIssues: [2, 3, 5].includes(role_id)
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล issues:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล issues." });
    }
};


// queueController.js
exports.showUpdatePriorityAndAssigneeForm = async (req, res) => {
    if (!req.session.user || req.session.user.role_id !== 2) {
        return res.status(403).json({ error: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้" });
    }

    try {
        const { user_id, role_id } = req.session.user;
        const issues = await Issue.getAllIssues(user_id, role_id);

        res.render('updatePriorityAndAssignee', { 
            user: req.session.user, 
            issues 
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึง issues:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึง issues." });
    }
};

// อัปเดตความสำคัญและผู้รับผิดชอบของ issue
exports.updatePriorityAndAssignee = async (req, res) => {
    const { issue_id, priority, assigned_to } = req.body;

    if (!req.session.user || req.session.user.role_id !== 2) {
        req.session.errorMessage = "คุณไม่มีสิทธิ์ในการอัปเดต issue นี้.";
        return res.redirect('/queues/issuelist');
    }

    try {
        await Issue.updatePriorityAndAssignee(issue_id, priority, assigned_to);
        const assignedStatusId = 2; // ID ของสถานะ "Assigned"
        await Issue.updateStatus(issue_id, assignedStatusId);

        req.session.successMessage = "อัปเดตความสำคัญและผู้รับผิดชอบสำเร็จ.";
        return res.redirect('/queues/issuelist');
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการอัปเดต issue:", err);
        req.session.errorMessage = "เกิดข้อผิดพลาดในการอัปเดต issue.";
        return res.redirect('/queues/issuelist');
    }
};







