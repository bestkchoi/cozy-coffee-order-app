// 데이터베이스 연결 및 유틸리티 함수들
const { PrismaClient } = require('@prisma/client');

// Prisma 클라이언트 인스턴스 생성
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// 데이터베이스 연결 테스트
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL 데이터베이스 연결 성공!');
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error.message);
    console.error('💡 .env 파일의 DATABASE_URL을 확인해주세요.');
    return false;
  }
}

// 데이터베이스 연결 종료
async function disconnect() {
  try {
    await prisma.$disconnect();
    console.log('📴 데이터베이스 연결이 종료되었습니다.');
  } catch (error) {
    console.error('데이터베이스 연결 종료 중 오류:', error.message);
  }
}

// 시드 데이터 생성 함수
async function seedDatabase() {
  try {
    console.log('🌱 데이터베이스 시드 데이터 생성 중...');
    
    // 기존 데이터 삭제 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      await prisma.orderItem.deleteMany();
      await prisma.order.deleteMany();
      await prisma.option.deleteMany();
      await prisma.menu.deleteMany();
    }

    // 메뉴 데이터 생성
    const menus = await prisma.menu.createMany({
      data: [
        {
          name: "아메리카노(ICE)",
          description: "진한 에스프레소에 시원한 얼음을 넣은 클래식 아메리카노",
          price: 4000,
          stock: 10,
          category: "coffee"
        },
        {
          name: "아메리카노(HOT)",
          description: "따뜻한 에스프레소에 뜨거운 물을 넣은 클래식 아메리카노",
          price: 4000,
          stock: 8,
          category: "coffee"
        },
        {
          name: "카페라떼",
          description: "부드러운 우유 거품과 에스프레소의 완벽한 조화",
          price: 5000,
          stock: 12,
          category: "coffee"
        },
        {
          name: "카페모카",
          description: "초콜릿과 에스프레소, 우유의 달콤한 만남",
          price: 5500,
          stock: 5,
          category: "coffee"
        },
        {
          name: "카푸치노",
          description: "진한 에스프레소와 부드러운 우유 거품의 클래식",
          price: 5000,
          stock: 7,
          category: "coffee"
        },
        {
          name: "바닐라라떼",
          description: "달콤한 바닐라 시럽이 들어간 부드러운 라떼",
          price: 5500,
          stock: 9,
          category: "coffee"
        }
      ]
    });

    // 생성된 메뉴 조회
    const createdMenus = await prisma.menu.findMany();
    
    // 옵션 데이터 생성
    const options = [];
    for (const menu of createdMenus) {
      options.push(
        {
          name: "샷 추가",
          price: 500,
          menuId: menu.id
        },
        {
          name: "시럽 추가",
          price: 0,
          menuId: menu.id
        }
      );
    }

    await prisma.option.createMany({
      data: options
    });

    console.log('✅ 시드 데이터 생성 완료!');
    console.log(`📊 메뉴 ${createdMenus.length}개, 옵션 ${options.length}개 생성됨`);
    
  } catch (error) {
    console.error('❌ 시드 데이터 생성 실패:', error.message);
    throw error;
  }
}

module.exports = {
  prisma,
  testConnection,
  disconnect,
  seedDatabase
};
