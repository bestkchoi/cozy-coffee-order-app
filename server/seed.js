// 데이터베이스 시드 데이터 생성 스크립트
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🌱 데이터베이스 시드 데이터 생성 시작...');
    
    // 기존 데이터 삭제 (개발 환경에서만)
    console.log('🗑️ 기존 데이터 삭제 중...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.option.deleteMany();
    await prisma.menu.deleteMany();

    // 메뉴 데이터 생성
    console.log('📋 메뉴 데이터 생성 중...');
    const menus = await prisma.menu.createMany({
      data: [
        {
          name: "아메리카노(ICE)",
          description: "진한 에스프레소에 시원한 얼음을 넣은 클래식 아메리카노",
          price: 4000,
          stock: 10,
          category: "coffee",
          imageUrl: "/images/americano-ice.jpg"
        },
        {
          name: "아메리카노(HOT)",
          description: "따뜻한 에스프레소에 뜨거운 물을 넣은 클래식 아메리카노",
          price: 4000,
          stock: 8,
          category: "coffee",
          imageUrl: "/images/americano-hot.jpg"
        },
        {
          name: "카페라떼",
          description: "부드러운 우유 거품과 에스프레소의 완벽한 조화",
          price: 5000,
          stock: 12,
          category: "coffee",
          imageUrl: "/images/caffe-latte.jpg"
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

    console.log(`✅ 메뉴 ${menus.count}개 생성 완료`);

    // 생성된 메뉴 조회
    const createdMenus = await prisma.menu.findMany();
    
    // 옵션 데이터 생성
    console.log('⚙️ 옵션 데이터 생성 중...');
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

    const optionsResult = await prisma.option.createMany({
      data: options
    });

    console.log(`✅ 옵션 ${optionsResult.count}개 생성 완료`);

    // 샘플 주문 데이터 생성
    console.log('📦 샘플 주문 데이터 생성 중...');
    const sampleOrder = await prisma.order.create({
      data: {
        totalAmount: 14000,
        items: [
          {
            menu_name: "아메리카노(ICE)",
            quantity: 1,
            selected_options: ["샷 추가"],
            item_total_price: 4500
          },
          {
            menu_name: "카페라떼",
            quantity: 2,
            selected_options: [],
            item_total_price: 9500
          }
        ],
        customerInfo: {
          name: "테스트 고객",
          phone: "010-1234-5678"
        }
      }
    });

    console.log(`✅ 샘플 주문 생성 완료 (주문 ID: ${sampleOrder.id})`);

    console.log('🎉 시드 데이터 생성 완료!');
    console.log('📊 생성된 데이터:');
    console.log(`   - 메뉴: ${createdMenus.length}개`);
    console.log(`   - 옵션: ${options.length}개`);
    console.log(`   - 샘플 주문: 1개`);
    
  } catch (error) {
    console.error('❌ 시드 데이터 생성 실패:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
