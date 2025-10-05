// 관리자 화면용 데이터

// 재고 데이터
export const inventoryData = [
  { id: 1, name: "아메리카노 (ICE)", stock: 10 },
  { id: 2, name: "아메리카노 (HOT)", stock: 8 },
  { id: 3, name: "카페라떼", stock: 12 },
  { id: 4, name: "카페모카", stock: 3 },
  { id: 5, name: "카푸치노", stock: 15 },
  { id: 6, name: "바닐라라떼", stock: 7 }
];

// 주문 상태 타입
export const ORDER_STATUS = {
  RECEIVED: '주문 접수',
  PREPARING: '제조 중',
  COMPLETED: '제조 완료'
};

// 샘플 주문 데이터
export const sampleOrders = [
  {
    id: 1,
    orderTime: new Date('2024-07-31T13:00:00'),
    items: [
      { name: "아메리카노(ICE)", quantity: 1, price: 4000 },
      { name: "카페라떼", quantity: 2, price: 5000 }
    ],
    totalPrice: 14000,
    status: ORDER_STATUS.RECEIVED
  },
  {
    id: 2,
    orderTime: new Date('2024-07-31T13:15:00'),
    items: [
      { name: "아메리카노(HOT)", quantity: 1, price: 4000 },
      { name: "바닐라라떼", quantity: 1, price: 5500 }
    ],
    totalPrice: 9500,
    status: ORDER_STATUS.PREPARING
  },
  {
    id: 3,
    orderTime: new Date('2024-07-31T13:30:00'),
    items: [
      { name: "카페모카", quantity: 1, price: 5500 }
    ],
    totalPrice: 5500,
    status: ORDER_STATUS.COMPLETED
  }
];

// 재고 상태 판별 함수
export const getStockStatus = (stock) => {
  if (stock === 0) return { status: '품절', color: '#dc3545' };
  if (stock < 5) return { status: '주의', color: '#ffc107' };
  return { status: '정상', color: '#28a745' };
};
