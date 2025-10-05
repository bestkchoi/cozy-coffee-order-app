const express = require('express');
const { 
  createOrder, 
  getOrders, 
  getOrderById, 
  updateOrderStatus 
} = require('../controllers/orderController');
const router = express.Router();

// POST /api/orders - 새 주문 생성
router.post('/', createOrder);

// GET /api/orders - 모든 주문 조회 (관리자용)
router.get('/', getOrders);

// GET /api/orders/:id - 특정 주문 조회
router.get('/:id', getOrderById);

// PUT /api/orders/:id/status - 주문 상태 변경
router.put('/:id/status', updateOrderStatus);

module.exports = router;
