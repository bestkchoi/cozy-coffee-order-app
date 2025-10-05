const { prisma } = require('../utils/database');
const { sendSuccess, sendError, sendValidationError, sendNotFoundError } = require('../utils/response');
const { validateStockUpdate } = require('../utils/validation');

// GET /api/admin/dashboard - 관리자 대시보드 통계
const getDashboardStats = async (req, res) => {
  try {
    // 주문 상태별 개수 조회
    const [totalOrders, receivedOrders, preparingOrders, completedOrders] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'received' } }),
      prisma.order.count({ where: { status: 'preparing' } }),
      prisma.order.count({ where: { status: 'completed' } })
    ]);

    const stats = {
      total_orders: totalOrders,
      received_orders: receivedOrders,
      preparing_orders: preparingOrders,
      completed_orders: completedOrders
    };

    sendSuccess(res, stats, '대시보드 통계를 성공적으로 조회했습니다.');
  } catch (error) {
    console.error('대시보드 통계 조회 오류:', error);
    sendError(res, '대시보드 통계 조회 중 오류가 발생했습니다.', 500);
  }
};

// PUT /api/admin/menus/:id/stock - 메뉴 재고 변경
const updateMenuStock = async (req, res) => {
  try {
    const menuId = parseInt(req.params.id);
    const { stock } = req.body;

    if (isNaN(menuId)) {
      return sendError(res, '유효하지 않은 메뉴 ID입니다.', 400, 'INVALID_MENU_ID');
    }

    // 재고 데이터 검증
    if (!validateStockUpdate(stock)) {
      return sendValidationError(res, '재고는 0 이상의 숫자여야 합니다.');
    }

    const menu = await prisma.menu.findUnique({
      where: { id: menuId }
    });

    if (!menu) {
      return sendNotFoundError(res, '메뉴를 찾을 수 없습니다.');
    }

    const updatedMenu = await prisma.menu.update({
      where: { id: menuId },
      data: { stock }
    });

    sendSuccess(res, {
      menu_id: updatedMenu.id,
      stock: updatedMenu.stock,
      updated_at: updatedMenu.updatedAt
    }, '메뉴 재고가 성공적으로 변경되었습니다.');

  } catch (error) {
    console.error('재고 변경 오류:', error);
    sendError(res, '재고 변경 중 오류가 발생했습니다.', 500);
  }
};

module.exports = {
  getDashboardStats,
  updateMenuStock
};
