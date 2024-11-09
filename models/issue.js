const db = require('../config/database');

// ฟังก์ชันสำหรับดึงข้อมูลปัญหาทั้งหมดตามสิทธิ์ของผู้ใช้
exports.getAllIssues = async (user_id, role_id) => {
    let query;
    let values = [];

    // ตรวจสอบ role_id ของผู้ใช้
    if ([2, 3, 4, 5].includes(role_id)) {
        // ถ้าเป็น role ที่สามารถดูทุกปัญหาได้
        query = `
            SELECT issues.*, users.username, users.email, issue_status.status_name
            FROM issues
            JOIN users ON issues.user_id = users.user_id
            JOIN issue_status ON issues.status_id = issue_status.status_id
            ORDER BY issues.priority DESC, issues.created_at DESC;
        `;
    } else {
        // ถ้าเป็น user ธรรมดา ให้ดึงแค่ปัญหาที่ผู้ใช้นั้นๆ สร้างขึ้นมา
        query = `
            SELECT issues.*, users.username, users.email, issue_status.status_name
            FROM issues
            JOIN users ON issues.user_id = users.user_id
            JOIN issue_status ON issues.status_id = issue_status.status_id
            WHERE issues.user_id = ?
            ORDER BY issues.created_at DESC;
        `;
        values = [user_id]; // เพิ่ม user_id ใน values สำหรับกรณีของ user ธรรมดา
    }

    try {
        const [results] = await db.execute(query, values); // รันคำสั่ง SQL
        return results;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลปัญหา:', error);
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูลปัญหา');
    }
};

// ฟังก์ชันสำหรับสร้าง issue ใหม่
exports.createIssue = async (issue) => {
    const query = `
        INSERT INTO issues (user_id, title, description)
        VALUES (?, ?, ?);
    `;
    const values = [issue.user_id, issue.title, issue.description];

    try {
        await db.execute(query, values); // รันคำสั่ง SQL สำหรับการเพิ่ม issue ใหม่
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสร้างปัญหาใหม่:', error);
        throw new Error('เกิดข้อผิดพลาดในการสร้างปัญหา');
    }
};

// ฟังก์ชันสำหรับดึงข้อความตาม issue_id
exports.getMessagesByIssueId = async (issue_id) => {
    const query = `
        SELECT * FROM issue_messages WHERE issue_id = ?;
    `;
    const values = [issue_id];

    try {
        const [results] = await db.execute(query, values); // รันคำสั่ง SQL
        return results;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อความของปัญหา:', error);
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อความ');
    }
};
