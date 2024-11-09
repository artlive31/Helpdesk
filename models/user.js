const pool = require('../config/database'); // นำเข้าโมดูลฐานข้อมูลที่กำหนดไว้ใน config

// คลาส User สำหรับจัดการข้อมูลผู้ใช้
class User {
  // ฟังก์ชันสถิติเพื่อดึงข้อมูลผู้ใช้ทั้งหมด
  static async findAll(search = '') {
    let query = 'SELECT * FROM users'; // คำสั่ง SQL เริ่มต้นเพื่อดึงข้อมูลทั้งหมด
    const queryParams = []; // ตัวแปรสำหรับเก็บค่า parameters ที่จะใช้ใน query

    // ตรวจสอบว่ามีการค้นหาหรือไม่
    if (search) {
      // หากมีการค้นหา ให้เพิ่มเงื่อนไข WHERE เพื่อกรองผลลัพธ์ตาม username
      query += ' WHERE username LIKE ?';
      queryParams.push(`%${search}%`); // เพิ่มค่าที่ค้นหาในรูปแบบ wildcard
    }
    query += ' ORDER BY username ASC'; // จัดเรียงผลลัพธ์ตาม username ในลำดับ ASC

    const [rows] = await pool.query(query, queryParams); // รันคำสั่ง SQL และรอผลลัพธ์
    return rows; // คืนผลลัพธ์ทั้งหมด
  }

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ตาม ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]); // รันคำสั่ง SQL เพื่อค้นหาตาม ID
    return rows[0]; // คืนข้อมูลรายการแรก (หรือ null หากไม่มีผลลัพธ์)
  }

  // ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
  static async create(userData) {
    const { username, email, password } = userData; // ทำการ destructure ข้อมูลผู้ใช้
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', // คำสั่ง SQL สำหรับการแทรกข้อมูล
      [username, email, password] // ส่งค่าผู้ใช้เป็น parameters
    );
    return result.insertId; // คืน ID ของผู้ใช้ที่ถูกสร้างใหม่
  }

  // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
  static async update(id, userData) {
    const { username, email } = userData;
    const [result] = await pool.query(
      'UPDATE users SET username = ?, email = ? WHERE user_id = ?',
      [username, email, id]
    );
    return result.affectedRows > 0;
  }  

  // ฟังก์ชันสำหรับลบผู้ใช้ตาม ID
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]); // รันคำสั่ง SQL เพื่อลบผู้ใช้ตาม ID
    return result.affectedRows > 0; // คืน true หากมีการลบอย่างน้อยหนึ่งรายการ
  }
  
  // ฟังก์ชันดึงปัญหาของผู้ใช้
  static async getUserIssues(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM issues WHERE user_id = ? ORDER BY created_at DESC', // ดึงปัญหาจากฐานข้อมูลเรียงตามวันที่
      [userId]
    );
    return rows; // คืนข้อมูลปัญหาของผู้ใช้
  }

}


// ส่งออกคลาส User เพื่อให้ใช้งานได้ในโมดูลอื่นๆ
module.exports = User; 
