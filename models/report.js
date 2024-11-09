const pool = require('../config/database');

class Report {
  /// ฟังก์ชันสำหรับสร้างรายงานใหม่
  static async createReport(data) {
    const { userId, issueId, report_title, report_content, report_type } = data;

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
        throw new Error('Invalid user ID');
    }

    // ตรวจสอบว่าผู้ใช้มีสิทธิ์ในการสร้างรายงานหรือไม่
    const [users] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);

    if (users.length === 0) {
        throw new Error('Invalid user ID');
    }

    const [result] = await pool.query(
        'INSERT INTO reports (user_id, issue_id, report_title, report_content, report_type, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [userId, issueId, report_title, report_content, report_type]
    );

    return result.insertId;
}

// ฟังก์ชันดึงรายงานทั้งหมด
static async getAllReports() {
    const [rows] = await pool.query('SELECT * FROM reports');
    return rows;
}
  
  // ฟังก์ชันดึงรายงานตาม user_id
  static async getReportsByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM reports WHERE user_id = ?', [userId]);
    return rows;
  }

  // ฟังก์ชันดึงรายงานตาม report_id
  static async getReportById(reportId) {
    const [rows] = await pool.query('SELECT * FROM reports WHERE report_id = ?', [reportId]);
    return rows[0];
  }

  // ฟังก์ชันดึงรายงานทั้งหมดพร้อมข้อมูล Issue และชื่อผู้สร้าง
  static async getAllReportsWithIssues(reportType = null) {
    let query = `
        SELECT reports.*, issues.title AS issue_title, issues.description AS issue_description, issues.created_at AS issue_created_at, users.username
        FROM reports
        LEFT JOIN issues ON reports.issue_id = issues.issue_id
        LEFT JOIN users ON reports.user_id = users.user_id
        `;

    // ถ้ามีการกรองตามประเภทของรายงาน
    if (reportType) {
        query += ` WHERE reports.report_type = ?`;
    }

    query += ` ORDER BY reports.created_at DESC`;  // เพิ่มการเรียงลำดับหลังจาก WHERE

    const [rows] = await pool.query(query, reportType ? [reportType] : []);
    return rows;
  }
}

module.exports = Report;

