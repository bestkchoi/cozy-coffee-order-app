// 유틸리티 함수들

export const validateCartItem = (menuItem) => {
  if (!menuItem || !menuItem.id || !menuItem.name || typeof menuItem.price !== 'number') {
    throw new Error('유효하지 않은 메뉴 아이템입니다.');
  }
  
  if (menuItem.price < 0) {
    throw new Error('메뉴 가격은 0 이상이어야 합니다.');
  }
  
  return true;
};

export const validateStockChange = (currentStock, change) => {
  const newStock = currentStock + change;
  if (newStock < 0) {
    throw new Error('재고는 0 미만이 될 수 없습니다.');
  }
  return true;
};

export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    return '0원';
  }
  return `${price.toLocaleString()}원`;
};

export const formatDateTime = (dateTime) => {
  if (!(dateTime instanceof Date)) {
    return '날짜 오류';
  }
  return dateTime.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
