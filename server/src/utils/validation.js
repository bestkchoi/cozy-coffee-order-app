// 데이터 검증 유틸리티 함수들

const validateMenuData = (menuData) => {
  const errors = [];
  
  if (!menuData.name || typeof menuData.name !== 'string' || menuData.name.trim().length === 0) {
    errors.push('메뉴명은 필수이며 문자열이어야 합니다.');
  }
  
  if (!menuData.price || typeof menuData.price !== 'number' || menuData.price < 0) {
    errors.push('가격은 필수이며 0 이상의 숫자여야 합니다.');
  }
  
  if (menuData.stock !== undefined && (typeof menuData.stock !== 'number' || menuData.stock < 0)) {
    errors.push('재고는 0 이상의 숫자여야 합니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateOrderData = (orderData) => {
  const errors = [];
  
  if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    errors.push('주문 아이템은 필수이며 배열이어야 합니다.');
  }
  
  if (!orderData.total_amount || typeof orderData.total_amount !== 'number' || orderData.total_amount <= 0) {
    errors.push('총 금액은 필수이며 0보다 큰 숫자여야 합니다.');
  }
  
  // 아이템 검증
  if (orderData.items) {
    orderData.items.forEach((item, index) => {
      if (!item.menu_id || typeof item.menu_id !== 'number') {
        errors.push(`아이템 ${index + 1}: 메뉴 ID는 필수이며 숫자여야 합니다.`);
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`아이템 ${index + 1}: 수량은 필수이며 0보다 큰 숫자여야 합니다.`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateOrderStatus = (status) => {
  const validStatuses = ['received', 'preparing', 'completed'];
  return validStatuses.includes(status);
};

const validateStockUpdate = (stock) => {
  return typeof stock === 'number' && stock >= 0;
};

module.exports = {
  validateMenuData,
  validateOrderData,
  validateOrderStatus,
  validateStockUpdate
};
