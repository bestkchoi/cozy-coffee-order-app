const express = require('express');
const { getMenus, getMenuById } = require('../controllers/menuController');
const router = express.Router();

// GET /api/menus - 메뉴 목록 조회
router.get('/', getMenus);

// GET /api/menus/:id - 특정 메뉴 조회
router.get('/:id', getMenuById);

module.exports = router;
