const Issue = require('../models/commu');

// ฟังก์ชันสำหรับแสดงรายการ issues ทั้งหมด
exports.issueList = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: "ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน." });
    }

    try {
        const { user_id, role_id } = req.session.user;
        const { status_id } = req.query;  // ดึง status_id จาก query params

        // ตรวจสอบว่า status_id มีค่าไหม (ถ้ามีให้กรองตามสถานะ)
        const issues = await Issue.getAllIssues(user_id, role_id, status_id || null);

        // จัดเรียง issues โดยเรียงจากใหม่ไปเก่า
        issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const successMessage = req.session.successMessage;
        req.session.successMessage = null;

        res.render('commu', {
            user: req.session.user,
            issues,
            successMessage,
            canContactUser: role_id === 3 // เฉพาะ Helpdesk Officer
        });
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล issues:", err);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล issues." });
    }
};

exports.contactUserOrUpdateStatus = async (req, res) => {
    const { issue_id, message } = req.body;

    if (!req.session.user) {
        return res.status(403).send("ผู้ใช้ยังไม่ได้ทำการยืนยันตัวตน.");
    }

    try {
        // ส่งข้อความ
        if (message && message.trim() !== "") {
            // ตรวจสอบว่าผู้ใช้มีสิทธิ์ในการติดต่อผู้ใช้ (เฉพาะ Helpdesk Officer)
            if (req.session.user.role_id !== 3) {
                return res.status(403).send("คุณไม่มีสิทธิ์ในการติดต่อผู้ใช้.");
            }

            // ตรวจสอบว่ามีข้อความนี้อยู่ในฐานข้อมูลหรือไม่
            const exists = await Issue.checkMessageExists(issue_id, message);
            if (exists) {
                req.session.successMessage = "ข้อความนี้ถูกส่งไปแล้ว.";
            } else {
                // เพิ่มข้อความใหม่
                await Issue.contactUser(issue_id, message);
                req.session.successMessage = "ส่งข้อความไปยังผู้ใช้เรียบร้อยแล้ว.";
            }
        }

        // อัปเดตสถานะ
        const currentStatus = await Issue.getCurrentStatus(issue_id);

        const nextStatusMap = {
            1: 2,    // New -> Assigned
            2: 3,    // Assigned -> In Progress
            3: 4,    // In Progress -> Pending (รอการตอบกลับ) หรือ Resolved (ถ้าแก้ไขแล้ว)
            4: 5,    // Pending -> Resolved
            5: 6,    // Resolved -> Closed
            6: 7,    // Closed -> Reopened
            8: 2     // Escalated -> Assigned
        };

        // ตรวจสอบว่าเราสามารถอัปเดตสถานะได้หรือไม่
        const nextStatus = nextStatusMap[currentStatus];
        if (nextStatus) {
            await Issue.updateStatus(issue_id, nextStatus);
            req.session.successMessage = "อัปเดตสถานะสำเร็จ.";
        } else {
            req.session.successMessage = "ไม่สามารถอัปเดตสถานะได้ตามเงื่อนไข.";
        }

        res.redirect('/commu/issuelist');
    } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดำเนินการ:", err);
        res.status(500).send("เกิดข้อผิดพลาดในการดำเนินการ.");
    }
};


// ฟังก์ชันสำหรับอัปเดตสถานะเป็น Resolved โดยผู้ใช้ทั่วไป
exports.resolveIssue = async (req, res) => {
    const { issue_id } = req.body;

    if (!req.session.user || req.session.user.role_id !== 1) {
        return res.status(403).send("คุณไม่มีสิทธิ์ในการดำเนินการนี้.");
    }

    try {
        await Issue.updateStatus(issue_id, 5); // เปลี่ยนสถานะเป็น "Resolved"
        req.session.successMessage = "อัปเดตสถานะเป็น Resolved สำเร็จ.";
        res.redirect('/commu/issuelist');
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการอัปเดตสถานะ:", error);
        res.status(500).send("เกิดข้อผิดพลาดในการอัปเดตสถานะ.");
    }
};
