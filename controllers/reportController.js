const Report = require('../models/report');

// ฟังก์ชันสำหรับสร้างรายงานใหม่ (Admin เท่านั้น)
exports.createReport = async (req, res) => {
    // ตรวจสอบว่าผู้ใช้เป็น Admin หรือไม่
    if (req.session.user.role_id !== 5) {
        return res.status(403).send('Access denied');
    }

    const { userId, report_title, report_content, report_type } = req.body;
    const issueId = req.body.issueId || null; // ถ้า issueId ไม่ถูกส่ง ให้เป็น null

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    console.log("Received userId:", userId); // ตรวจสอบ userId ที่ได้รับ

    const reportData = { userId, issueId, report_title, report_content, report_type };

    try {
        await Report.createReport(reportData); // สร้างรายงาน
        // หลังจากสร้างรายงานสำเร็จ ให้กลับไปที่หน้าแสดงรายงาน
        res.redirect('/reports');
    } catch (err) {
        res.status(500).send('Error creating report: ' + err.message);
    }
};

// ฟังก์ชันดึงรายงานทั้งหมดหรือกรองตามประเภท
exports.getAllReports = async (req, res) => {
    // ตรวจสอบสิทธิ์สำหรับ Executive หรือ Admin
    if (!req.session.user || ![4, 5].includes(req.session.user.role_id)) {
        return res.status(403).send('Access denied');
    }

    const reportType = req.query.report_type || null;  // รับค่า report_type จาก query string

    try {
        // ถ้ามีการกรองประเภทรายงาน
        const reports = await Report.getAllReportsWithIssues(reportType); // เรียกฟังก์ชันที่รับ report_type
        const showCreateForm = req.session.user.role_id === 5; // แสดงฟอร์มสร้างรายงานสำหรับ admin เท่านั้น

        // เรนเดอร์หน้า EJS พร้อมรายงาน
        res.render('report', { reports, showCreateForm, currentUser: req.session.user, reportType });
    } catch (err) {
        res.status(500).send('Error retrieving reports: ' + err.message);
    }
};

// Function to view reports by user ID (Admin and Executive)
exports.getReportsByUserId = async (req, res) => {
    if (!req.session.user || ![4, 5].includes(req.session.user.role_id)) {
        return res.status(403).send('Access denied');
    }

    const userId = req.params.userId;
    try {
        const reports = await Report.getReportsByUserId(userId);
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).send('Error retrieving reports: ' + err.message);
    }
};

// Function to view report by report ID (Admin and Executive)
exports.getReportById = async (req, res) => {
    if (!req.session.user || ![4, 5].includes(req.session.user.role_id)) {
        return res.status(403).send('Access denied');
    }

    const reportId = req.params.reportId;
    try {
        const report = await Report.getReportById(reportId);
        if (!report) {
            return res.status(404).send('Report not found');
        }
        res.status(200).json(report);
    } catch (err) {
        res.status(500).send('Error retrieving report: ' + err.message);
    }
};
