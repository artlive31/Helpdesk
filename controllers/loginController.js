const User = require('../models/login');

// แสดงฟอร์มล็อกอิน
exports.showLoginForm = (req, res) => {
    // Render ฟอร์มล็อกอิน
    res.render('login', { error: null });
  };
  
  // ผู้ใช้ล็อกอิน
  exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        // ดึงข้อมูลผู้ใช้ตาม username
        const user = await User.findByUsername(username);
        if (!user || password !== user.password) {
            // ส่งข้อความข้อผิดพลาดหาก username หรือ password ไม่ถูกต้อง
            return res.render('login', { error: 'Invalid username or password' });
        }
  
        // ดึงข้อมูล role ของผู้ใช้
        const role = await User.getRoleById(user.user_id);
  
        // เก็บข้อมูลผู้ใช้ใน session
        req.session.user = { 
            user_id: user.user_id, 
            username: user.username, 
            email: user.email,
            role: role.role_name,
            role_id: role.role_id // เก็บ role_id ใน session
        };
  
        // Redirect ไปยังหน้าแรกหลังจากล็อกอินสำเร็จ
        // เปลี่ยนเส้นทางตามบทบาท
        if (role.role_id === 5) {
          res.redirect('/'); // Admin ไปที่ users.ejs
        } else {
          res.redirect('/main');  // ผู้ใช้อื่นๆ ไปที่ main.ejs
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
  }
};
  
  // ผู้ใช้ล็อกเอาท์
  exports.logoutUser = (req, res) => {
    // ทำลาย session ของผู้ใช้
    req.session.destroy(() => {
      // Redirect ไปยังหน้าแรกหลังจากล็อกเอาท์
      res.redirect('/'); 
    });
  };
  