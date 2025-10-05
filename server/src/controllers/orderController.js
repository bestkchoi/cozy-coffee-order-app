const { prisma } = require('../utils/database');
const { sendSuccess, sendError, sendValidationError, sendNotFoundError } = require('../utils/response');
const { validateOrderData } = require('../utils/validation');

// POST /api/orders - 새 주문 생성
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // 주문 데이터 검증
    const validation = validateOrderData(orderData);
    if (!validation.isValid) {
      return sendValidationError(res, '주문 데이터가 올바르지 않습니다.', validation.errors);
    }

    // 트랜잭션으로 주문 생성 및 재고 차감
    const result = await prisma.$transaction(async (tx) => {
      // 주문 생성
      const order = await tx.order.create({
        data: {
          totalAmount: orderData.total_amount,
          items: orderData.items,
          customerInfo: orderData.customer_info || null
        }
      });

      // 주문 아이템별로 재고 차감
      for (const item of orderData.items) {
        const menu = await tx.menu.findUnique({
          where: { id: item.menu_id }
        });

        if (!menu) {
          throw new Error(`메뉴 ID ${item.menu_id}를 찾을 수 없습니다.`);
        }

        if (menu.stock < item.quantity) {
          throw new Error(`${menu.name}의 재고가 부족합니다. (요청: ${item.quantity}, 재고: ${menu.stock})`);
        }

        // 재고 차감
        await tx.menu.update({
          where: { id: item.menu_id },
          data: { stock: menu.stock - item.quantity }
        });

        // 주문 아이템 생성
        for (const option of item.selected_options || []) {
          await tx.orderItem.create({
            data: {
              orderId: order.id,
              menuId: item.menu_id,
              optionId: option.option_id,
              quantity: item.quantity,
              itemPrice: item.item_total_price / item.quantity,
              totalPrice: item.item_total_price
            }
          });
        }
      }

      return order;
    });

    // 성공 응답
    sendSuccess(res, {
      order_id: result.id,
      order_time: result.orderTime,
      status: result.status,
      total_amount: result.totalAmount
    }, '주문이 성공적으로 생성되었습니다.', 201);

  } catch (error) {
    console.error('주문 생성 오류:', error);
    
    if (error.message.includes('재고가 부족')) {
      return sendError(res, error.message, 400, 'INSUFFICIENT_STOCK');
    }
    
    sendError(res, '주문 생성 중 오류가 발생했습니다.', 500);
  }
};

// GET /api/orders - 모든 주문 조회 (관리자용)
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menu: {
              select: { name: true }
            },
            option: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // PRD에 맞는 응답 형식으로 변환
    const formattedOrders = orders.map(order => ({
      id: order.id,
      order_time: order.orderTime,
      status: order.status,
      total_amount: order.totalAmount,
      items: order.orderItems.map(item => ({
        menu_name: item.menu.name,
        quantity: item.quantity,
        selected_options: item.option ? [item.option.name] : [],
        item_total_price: item.totalPrice
      }))
    }));

    sendSuccess(res, formattedOrders, '주문 목록을 성공적으로 조회했습니다.');
  } catch (error) {
    console.error('주문 조회 오류:', error);
    sendError(res, '주문 목록 조회 중 오류가 발생했습니다.', 500);
  }
};

// GET /api/orders/:id - 특정 주문 조회
const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    
    if (isNaN(orderId)) {
      return sendError(res, '유효하지 않은 주문 ID입니다.', 400, 'INVALID_ORDER_ID');
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            menu: {
              select: { name: true }
            },
            option: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!order) {
      return sendNotFoundError(res, '주문을 찾을 수 없습니다.');
    }

    // PRD에 맞는 응답 형식으로 변환
    const formattedOrder = {
      id: order.id,
      order_time: order.orderTime,
      status: order.status,
      total_amount: order.totalAmount,
      items: order.orderItems.map(item => ({
        menu_name: item.menu.name,
        quantity: item.quantity,
        selected_options: item.option ? [item.option.name] : [],
        item_total_price: item.totalPrice
      }))
    };

    sendSuccess(res, formattedOrder, '주문 정보를 성공적으로 조회했습니다.');
  } catch (error) {
    console.error('주문 조회 오류:', error);
    sendError(res, '주문 조회 중 오류가 발생했습니다.', 500);
  }
};

// PUT /api/orders/:id/status - 주문 상태 변경
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { status } = req.body;

    if (isNaN(orderId)) {
      return sendError(res, '유효하지 않은 주문 ID입니다.', 400, 'INVALID_ORDER_ID');
    }

    // 유효한 상태인지 확인
    const validStatuses = ['received', 'preparing', 'completed'];
    if (!validStatuses.includes(status)) {
      return sendError(res, '유효하지 않은 주문 상태입니다.', 400, 'INVALID_STATUS');
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return sendNotFoundError(res, '주문을 찾을 수 없습니다.');
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    sendSuccess(res, {
      order_id: updatedOrder.id,
      status: updatedOrder.status,
      updated_at: updatedOrder.updatedAt
    }, '주문 상태가 성공적으로 변경되었습니다.');

  } catch (error) {
    console.error('주문 상태 변경 오류:', error);
    sendError(res, '주문 상태 변경 중 오류가 발생했습니다.', 500);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};
