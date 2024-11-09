const User = require('../models/user');

// แสดงผู้ใช้ทั้งหมด
exports.listUsers = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ทั้งหมด โดยมีการค้นหาจาก query parameter ถ้ามี
    const users = await User.findAll(req.query.search);
    // Render หน้า users พร้อมกับข้อมูลผู้ใช้และค่าการค้นหา
    res.render('users', { users, search: req.query.search || '' });
  } catch (error) {
    console.error(error); // แสดงข้อผิดพลาดใน console
    // ส่งสถานะ 500 Internal Server Error พร้อมข้อความข้อผิดพลาด
    res.status(500).send('Internal Server Error');
  }
};

// แสดงฟอร์มเพิ่มผู้ใช้
exports.showAddUserForm = (req, res) => {
  // Render ฟอร์มเพิ่มผู้ใช้
  res.render('add-user');
};

// เพิ่มผู้ใช้ใหม่
exports.addUser = async (req, res) => {
  const { username, email, password } = req.body;

  // ตรวจสอบว่ามีการส่งข้อมูลที่จำเป็นหรือไม่
  if (!username || !email || !password) {
    return res.status(400).send('Bad Request: Missing required fields'); // ส่งสถานะ 400 Bad Request
  }

  try {
    // สร้างผู้ใช้ใหม่ในฐานข้อมูล
    await User.create({ username, email, password });
    // Redirect ไปยังหน้าแรกหลังจากเพิ่มผู้ใช้
    res.redirect('/');
  } catch (error) {
    console.error(error); // แสดงข้อผิดพลาดใน console
    // ส่งสถานะ 500 Internal Server Error พร้อมข้อความข้อผิดพลาด
    res.status(500).send('Internal Server Error');
  }
};

// แสดงฟอร์มแก้ไขผู้ใช้
exports.showEditUserForm = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้ตาม ID ที่ส่งมา
    const user = await User.findById(req.params.id);
    if (user) {
      // Render ฟอร์มแก้ไขผู้ใช้พร้อมข้อมูลที่ดึงมา
      res.render('edit-user', { user });
    } else {
      // ส่งสถานะ 404 Not Found หากไม่พบผู้ใช้
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error); // แสดงข้อผิดพลาดใน console
    res.status(500).send('Internal Server Error');
  }
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // สมมติว่าใช้ User.update สำหรับการอัปเดตข้อมูล
    const success = await User.update(req.params.id, { username, email });
    if (success) {
      res.redirect('/users'); // หรือหน้าอื่นๆ ตามที่คุณต้องการหลังจากอัปเดต
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// ลบผู้ใช้
exports.deleteUser = async (req, res) => {
  try {
    // ลบผู้ใช้ตาม ID
    const success = await User.delete(req.params.id);
    if (success) {
      // ส่งข้อความยืนยันเมื่อการลบสำเร็จ
      res.redirect('/users'); // หรือหน้าอื่นๆ หลังจากลบ
    } else {
      res.status(404).json({ error: 'User not found' }); // หากไม่พบผู้ใช้
    }
  } catch (error) {
    console.error(error); // แสดงข้อผิดพลาดใน console
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// แสดงโปรไฟล์ผู้ใช้
exports.showProfile = async (req, res) => {
  if (!req.session.user) {
    // หากไม่มี session ของผู้ใช้ให้ redirect ไปที่หน้าล็อกอิน
    return res.redirect('/login');
  }

  try {
    // ดึงข้อมูลผู้ใช้จาก session
    const user = req.session.user;
    
    // ดึงปัญหาของผู้ใช้และเรียงตามวันที่ล่าสุด
    const issues = await User.getUserIssues(user.user_id);  // ฟังก์ชันนี้ต้องเพิ่มในโมเดล User
    issues.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));  // เรียงลำดับจากล่าสุดไปเก่าสุด

    // Render หน้าโปรไฟล์ผู้ใช้พร้อมข้อมูล
    res.render('profile', { user, issues });
  } catch (error) {
    console.error(error); // แสดงข้อผิดพลาดใน console
    res.status(500).send('Internal Server Error');
  }
};
