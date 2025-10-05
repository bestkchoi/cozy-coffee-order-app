// 데이터베이스 연결 설정
const { PrismaClient } = require('@prisma/client');

// Prisma 클라이언트 인스턴스 생성
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// 데이터베이스 연결 테스트
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ 데이터베이스 연결 성공!');
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error.message);
    return false;
  }
}

// 데이터베이스 연결 종료
async function disconnect() {
  await prisma.$disconnect();
}

module.exports = {
  prisma,
  testConnection,
  disconnect
};
