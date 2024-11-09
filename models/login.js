const pool = require('../config/database');

class Login {

    // ฟังก์ชันสำหรับค้นหาผู้ใช้ตาม username
  static async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]); // รันคำสั่ง SQL เพื่อค้นหาผู้ใช้ตาม username
    return rows[0]; // คืนข้อมูลรายการแรก (หรือ null หากไม่มีผลลัพธ์)
  }

  // ฟังก์ชันเพื่อดึง role_id ของผู้ใช้ตาม user_id
  static async getRoleById(user_id) {
    const [rows] = await pool.query(`
      SELECT r.role_name, r.role_id 
      FROM users u 
      JOIN user_roles ur ON u.user_id = ur.user_id 
      JOIN roles r ON ur.role_id = r.role_id 
      WHERE u.user_id = ?`, [user_id]
    ); // รันคำสั่ง SQL เพื่อตรวจสอบชื่อและ ID ของบทบาทที่เกี่ยวข้องกับผู้ใช้
    return rows[0] ? { role_name: rows[0].role_name, role_id: rows[0].role_id } : { role_name: null, role_id: null }; // คืนข้อมูลบทบาทหากมี
  }  
}

module.exports = Login;