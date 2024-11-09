const db = require('../config/database');

// ปรับฟังก์ชัน contactUser เพื่อรองรับการส่งข้อมูลข้อความที่ละเอียดขึ้น
exports.contactUser = async (issue_id, message) => {
    const query = `INSERT INTO issue_messages (issue_id, message) VALUES (?, ?);`;
    const values = [issue_id, message];
    await db.execute(query, values);
};

// ฟังก์ชันดึงข้อมูล issues ทั้งหมดและสามารถกรองตามสถานะได้
exports.getAllIssues = async (user_id, role_id, status_id = null) => {
    let query = `
    SELECT i.*, s.status_name, m.message, m.created_at AS message_time, u.username
    FROM issues i
    JOIN issue_status s ON i.status_id = s.status_id
    LEFT JOIN (
        SELECT issue_id, message, created_at
        FROM issue_messages
        ORDER BY created_at DESC
        LIMIT 1
    ) m ON i.issue_id = m.issue_id
    LEFT JOIN users u ON i.user_id = u.user_id
    WHERE i.user_id = ? OR ? = 3
    `;

    // เพิ่มเงื่อนไขกรองสถานะถ้ามี
    if (status_id) {
        query += ` AND i.status_id = ?`;
    }

    query += ` ORDER BY i.created_at DESC`;

    const [rows] = await db.execute(query, status_id ? [user_id, role_id, status_id] : [user_id, role_id]);
    return rows;
};

// ฟังก์ชันสำหรับอัปเดตสถานะของ issue
exports.updateStatus = async (issue_id, next_status_id) => {
    const query = `UPDATE issues SET status_id = ? WHERE issue_id = ?;`;
    const values = [next_status_id, issue_id];
    await db.execute(query, values);
};

// ฟังก์ชันสำหรับดึงสถานะปัจจุบันของ issue
exports.getCurrentStatus = async (issue_id) => {
    const query = `SELECT status_id FROM issues WHERE issue_id = ?;`;
    const [rows] = await db.execute(query, [issue_id]);
    return rows[0] ? rows[0].status_id : null;
};

// ฟังก์ชันตรวจสอบว่ามีข้อความนี้อยู่ในฐานข้อมูลหรือไม่
exports.checkMessageExists = async (issue_id, message) => {
    const query = "SELECT * FROM issue_messages WHERE issue_id = ? AND message = ?;";
    const [rows] = await db.execute(query, [issue_id, message]);
    return rows.length > 0; // คืนค่าจริงถ้ามีข้อความ
};