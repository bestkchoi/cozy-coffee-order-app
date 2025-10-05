const { prisma } = require('../utils/database');
const { sendSuccess, sendError, sendNotFoundError } = require('../utils/response');

// GET /api/menus - 메뉴 목록 조회
const getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      where: { isActive: true },
      include: {
        options: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      },
      orderBy: { id: 'asc' }
    });

    // PRD에 맞는 응답 형식으로 변환
    const formattedMenus = menus.map(menu => ({
      id: menu.id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      image_url: menu.imageUrl,
      stock: menu.stock,
      category: menu.category,
      options: menu.options
    }));

    sendSuccess(res, formattedMenus, '메뉴 목록을 성공적으로 조회했습니다.');
  } catch (error) {
    console.error('메뉴 조회 오류:', error);
    sendError(res, '메뉴 목록 조회 중 오류가 발생했습니다.', 500);
  }
};

// GET /api/menus/:id - 특정 메뉴 조회
const getMenuById = async (req, res) => {
  try {
    const menuId = parseInt(req.params.id);
    
    if (isNaN(menuId)) {
      return sendError(res, '유효하지 않은 메뉴 ID입니다.', 400, 'INVALID_MENU_ID');
    }

    const menu = await prisma.menu.findUnique({
      where: { 
        id: menuId,
        isActive: true 
      },
      include: {
        options: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });

    if (!menu) {
      return sendNotFoundError(res, '메뉴를 찾을 수 없습니다.');
    }

    // PRD에 맞는 응답 형식으로 변환
    const formattedMenu = {
      id: menu.id,
      name: menu.name,
      description: menu.description,
      price: menu.price,
      image_url: menu.imageUrl,
      stock: menu.stock,
      category: menu.category,
      options: menu.options
    };

    sendSuccess(res, formattedMenu, '메뉴 정보를 성공적으로 조회했습니다.');
  } catch (error) {
    console.error('메뉴 조회 오류:', error);
    sendError(res, '메뉴 조회 중 오류가 발생했습니다.', 500);
  }
};

module.exports = {
  getMenus,
  getMenuById
};
