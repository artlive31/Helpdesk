const db = require('../config/database');

// อัปเดตความสำคัญและผู้รับผิดชอบของ issue
exports.updatePriorityAndAssignee = async (issue_id, priority, assigned_to) => {
    const query = `UPDATE issues SET priority = ?, assigned_to = ? WHERE issue_id = ?;`;
    const values = [priority, assigned_to, issue_id];
    await db.execute(query, values);
};

// อัปเดตสถานะของ issue
exports.updateStatus = async (issue_id, statusId) => {
    const query = `UPDATE issues SET status_id = ? WHERE issue_id = ?;`;
    const values = [statusId, issue_id];
    await db.execute(query, values);
};

// ฟังก์ชันสำหรับดึงข้อมูล issues
exports.getAllIssues = async (user_id, role_id) => {
    let query = `SELECT * FROM issues`;
    if (role_id === 2) {
        query += ` WHERE assigned_to = ?`;
    }
    const [rows] = await db.execute(query, [user_id]);
    return rows;
};
