const express = require('express'); // นำเข้าโมดูล express
const router = express.Router(); // สร้าง router ใหม่สำหรับการจัดการเส้นทาง
const knowledgeController = require('../controllers/knowledgeController'); // นำเข้า knowledgeController เพื่อใช้ฟังก์ชันที่เกี่ยวข้องกับความรู้

// เส้นทางสำหรับแสดงรายการความรู้ทั้งหมด
router.get('/knowledge', knowledgeController.showKnowledge);

// เส้นทางสำหรับการค้นหาความรู้
router.get('/knowledge/search', knowledgeController.searchKnowledge);

// ส่งออก router เพื่อให้ใช้งานในโมดูลอื่นๆ
module.exports = router; 
