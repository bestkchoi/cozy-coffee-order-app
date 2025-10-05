const express = require('express');
const { 
  getDashboardStats, 
  updateMenuStock 
} = require('../controllers/adminController');
const router = express.Router();

// GET /api/admin/dashboard - 관리자 대시보드 통계
router.get('/dashboard', getDashboardStats);

// PUT /api/admin/menus/:id/stock - 메뉴 재고 변경
router.put('/menus/:id/stock', updateMenuStock);

module.exports = router;
