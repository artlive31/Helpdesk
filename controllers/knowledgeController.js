const Knowledge = require('../models/knowledge');

// แสดงข้อมูลความรู้ เช่น FAQ และวิธีแก้ไข
exports.showKnowledge = async (req, res) => {
  try {
    // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล FAQs และวิธีแก้ไข
    const faqs = await Knowledge.getEntriesByType('faq'); // ดึงข้อมูล FAQ
    const solutions = await Knowledge.getEntriesByType('solution'); // ดึงข้อมูลวิธีแก้ไข
    // Render หน้า knowledge พร้อมกับข้อมูลที่ดึงมา
    res.render('knowledge', { faqs, solutions });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลความรู้:', error); // แสดงข้อผิดพลาดใน console
    // ส่งสถานะ 500 Internal Server Error พร้อมข้อความข้อผิดพลาด
    res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลความรู้ กรุณาลองใหม่อีกครั้งในภายหลัง.');
  }
};

// ค้นหาข้อมูลความรู้ตามคำค้น
exports.searchKnowledge = async (req, res) => {
  const query = req.query.query?.trim(); // ดึงคำค้นจาก query parameters และลบช่องว่าง

  try {
    let results;
    if (!query) {
      // หากไม่มีคำค้น ให้ดึงข้อมูลทั้งหมด
      results = await Knowledge.findAll();
    } else {
      // ค้นหาจากทุกฟิลด์ที่เกี่ยวข้อง
      results = await Knowledge.searchEntries(query);
    }

    // Render หน้า knowledge พร้อมกับผลลัพธ์ที่กรองตามประเภท
    res.render('knowledge', { 
      faqs: results.filter(entry => entry.entry_type === 'faq'), // กรองข้อมูล FAQ
      solutions: results.filter(entry => entry.entry_type === 'solution') // กรองข้อมูลวิธีแก้ไข
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการค้นหาข้อมูลความรู้:', error); // แสดงข้อผิดพลาดใน console
    // ส่งสถานะ 500 Internal Server Error พร้อมข้อความข้อผิดพลาด
    res.status(500).send('เกิดข้อผิดพลาดในการค้นหาข้อมูลความรู้ กรุณาลองใหม่อีกครั้งในภายหลัง.');
  }
};
