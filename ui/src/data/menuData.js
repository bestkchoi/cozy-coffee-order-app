// 로컬 메뉴 데이터 (백엔드 연결 실패 시 사용)
export const fallbackMenuItems = [
  {
    id: 1,
    name: "아메리카노(ICE)",
    price: 4000,
    description: "진한 에스프레소에 시원한 얼음을 넣은 클래식 아메리카노",
    image_url: "/images/americano-ice.jpg",
    stock: 10,
    category: "coffee",
    options: [
      { id: 1, name: "샷 추가", price: 500 },
      { id: 2, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 2,
    name: "아메리카노(HOT)",
    price: 4000,
    description: "따뜻한 에스프레소에 뜨거운 물을 넣은 클래식 아메리카노",
    image_url: "/images/americano-hot.jpg",
    stock: 8,
    category: "coffee",
    options: [
      { id: 3, name: "샷 추가", price: 500 },
      { id: 4, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 3,
    name: "카페라떼",
    price: 5000,
    description: "부드러운 우유 거품과 에스프레소의 완벽한 조화",
    image_url: "/images/caffe-latte.jpg",
    stock: 12,
    category: "coffee",
    options: [
      { id: 5, name: "샷 추가", price: 500 },
      { id: 6, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 4,
    name: "카페모카",
    price: 5500,
    description: "초콜릿과 에스프레소, 우유의 달콤한 만남",
    image_url: "/images/cafe-mocha.jpg",
    stock: 5,
    category: "coffee",
    options: [
      { id: 7, name: "샷 추가", price: 500 },
      { id: 8, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 5,
    name: "카푸치노",
    price: 5000,
    description: "진한 에스프레소와 부드러운 우유 거품의 클래식",
    image_url: "/images/cappuccino.jpg",
    stock: 7,
    category: "coffee",
    options: [
      { id: 9, name: "샷 추가", price: 500 },
      { id: 10, name: "시럽 추가", price: 0 }
    ]
  },
  {
    id: 6,
    name: "바닐라라떼",
    price: 5500,
    description: "달콤한 바닐라 시럽이 들어간 부드러운 라떼",
    image_url: "/images/vanilla-latte.jpg",
    stock: 9,
    category: "coffee",
    options: [
      { id: 11, name: "샷 추가", price: 500 },
      { id: 12, name: "시럽 추가", price: 0 }
    ]
  }
];
