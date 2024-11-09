const db = require('../config/database');

// คลาส Knowledge สำหรับจัดการข้อมูลความรู้
class Knowledge {
  // ฟังก์ชันสถิติเพื่อดึงข้อมูลทั้งหมดจากตาราง knowledge
  static async findAll(search = '') {
    let query = 'SELECT * FROM knowledge'; // คำสั่ง SQL เริ่มต้นเพื่อดึงข้อมูลทั้งหมด
    const queryParams = []; // ตัวแปรสำหรับเก็บค่า parameters ที่จะใช้ใน query

    // ตรวจสอบว่ามีการค้นหาหรือไม่
    if (search) {
      // หากมีการค้นหา ให้เพิ่มเงื่อนไข WHERE เพื่อกรองผลลัพธ์ตาม title หรือ description
      query += ' WHERE title LIKE ? OR description LIKE ?';
      queryParams.push(`%${search}%`, `%${search}%`); // เพิ่มค่าที่ค้นหาในรูปแบบ wildcard
    }
    
    query += ' ORDER BY title ASC'; // จัดเรียงผลลัพธ์ตาม title ในลำดับ ASC

    const [rows] = await db.execute(query, queryParams); // รันคำสั่ง SQL และรอผลลัพธ์
    return rows; // คืนผลลัพธ์ทั้งหมด
  }

  // ฟังก์ชันสำหรับดึงข้อมูลตาม ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM knowledge WHERE id = ?', [id]); // รันคำสั่ง SQL เพื่อค้นหาตาม ID
    return rows[0]; // คืนข้อมูลรายการแรก (หรือ null หากไม่มีผลลัพธ์)
  }

  // ฟังก์ชันสำหรับดึงข้อมูลทั้งหมดจากตาราง knowledge
  static async getAllEntries() {
    const [rows] = await db.execute('SELECT * FROM knowledge'); // รันคำสั่ง SQL เพื่อดึงข้อมูลทั้งหมด
    return rows; // คืนผลลัพธ์ทั้งหมด
  }

  // ฟังก์ชันสำหรับดึงข้อมูลตามประเภท (entry_type)
  static async getEntriesByType(type) {
    const [rows] = await db.execute('SELECT * FROM knowledge WHERE entry_type = ?', [type]); // รันคำสั่ง SQL โดยใช้ type เป็น parameter
    return rows; // คืนผลลัพธ์ทั้งหมดที่ตรงตามประเภท
  }

  // ฟังก์ชันสำหรับค้นหาข้อมูลโดยใช้ query ที่กำหนด
  static async searchEntries(query) {
    const [rows] = await db.execute(
      `SELECT * FROM knowledge 
       WHERE title LIKE ? 
       OR description LIKE ? 
       OR entry_type LIKE ?`, // ค้นหาจากทั้ง title, description, และ entry_type
      [`%${query}%`, `%${query}%`, `%${query}%`] // ส่งค่าที่ค้นหาพร้อม wildcard
    );
    return rows; // คืนผลลัพธ์ทั้งหมดที่ตรงตามเงื่อนไข
  }  
}

// ส่งออกคลาส Knowledge เพื่อให้ใช้งานได้ในโมดูลอื่นๆ
module.exports = Knowledge; 
