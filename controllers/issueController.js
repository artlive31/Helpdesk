const Issue = require('../models/issue');
const User = require('../models/user');

// แสดงฟอร์มสำหรับสร้าง issue ใหม่
exports.newIssueForm = (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }
    res.render('issueForm', { user: req.session.user, successMessage: null });
};

// จัดการการส่งข้อมูล issue ใหม่
exports.createIssue = async (req, res) => {
    const { title, description } = req.body;
    const user_id = req.session.user?.user_id;

    if (!title || !description) {
        return res.status(400).json({ error: "ต้องกรอก title และ description." });
    }

    try {
        const newIssue = { user_id, title, description };
        await Issue.createIssue(newIssue);
        req.session.successMessage = "สร้าง issue สำเร็จ.";
        res.redirect('/issues/issuelist');
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการสร้าง issue:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการสร้าง issue." });
    }
};

// แสดงรายการ issues ทั้งหมด
exports.issueList = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }

    try {
        const { user_id, role_id } = req.session.user;

        // ตรวจสอบสิทธิ์: ถ้าเป็น Executive หรือ Admin (role_id 3 หรือ 5) ให้ดึงข้อมูลทุก Issue
        const issues = await Issue.getAllIssues(user_id, role_id);

        // จัดเรียง issues โดยเรียงจากใหม่ไปเก่า
        issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


        // กำหนดข้อความเมื่อสร้าง Issue สำเร็จ
        const successMessage = req.session.successMessage;
        req.session.successMessage = null;

        res.render('issuelist', { 
            user: req.session.user, 
            issues, 
            successMessage,
            canViewAllIssues: [2, 3, 4, 5].includes(role_id)  // ตรวจสอบสิทธิ์ในการดูทุก Issue
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึง issues:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึง issues." });
    }
};


// ฟังก์ชันดึงข้อมูลโปรไฟล์ผู้ใช้และข้อความ
exports.getUserProfile = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }

    try {
        const user_id = req.session.user.user_id;
        const issues = await Issue.getAllIssues(user_id, req.session.user.role_id);

        const messages = await Promise.all(
            issues.map(issue => Issue.getMessagesByIssueId(issue.issue_id))
        ).then(result => result.flat());

        // ส่งข้อมูล issues และ messages ไปยังหน้า profile
        res.render('profile', { 
            user: req.session.user, 
            issues,   // ส่งข้อมูลปัญหาด้วย
            messages 
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อความ:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อความ' });
    }
};

// ฟังก์ชันที่ใช้ในการแสดงผล issues ทั้งหมด
async function renderIssueList(req, res, viewName) {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }

    try {
        const { user_id, role_id } = req.session.user;

        // ตรวจสอบสิทธิ์: ถ้าเป็น Executive หรือ Admin (role_id 3 หรือ 5) ให้ดึงข้อมูลทุก Issue
        const issues = await Issue.getAllIssues(user_id, role_id);

        // ดึงข้อมูล Helpdesk Staff
        const helpdeskStaff = await User.findAll({ where: { role_id: 3 } }); // ดึง user ที่มี role_id = 3 (Helpdesk Staff)

        // กำหนดข้อความเมื่อสร้าง Issue สำเร็จ
        const successMessage = req.session.successMessage;
        req.session.successMessage = null;

        res.render(viewName, {
            user: req.session.user,
            issues,
            successMessage,
            helpdeskStaff,  // ส่งข้อมูล helpdeskStaff ไปยัง view
            canViewAllIssues: [2, 3, 4, 5].includes(role_id)  // ตรวจสอบสิทธิ์ในการดูทุก Issue
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึง issues:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึง issues." });
    }
}

// แสดงรายการ issues ทั้งหมดใน issuelist.ejs
exports.issueList = (req, res) => renderIssueList(req, res, 'issuelist');

// แสดงรายการ issues ทั้งหมดใน main.ejs
exports.mainIssueList = (req, res) => renderIssueList(req, res, 'main');
