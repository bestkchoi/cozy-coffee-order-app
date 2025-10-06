// Render.com 배포용 스크립트
const { execSync } = require('child_process');

console.log('🚀 Render.com 배포 시작...');

try {
  // 환경 변수 확인
  console.log('📋 환경 변수 확인:');
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  console.log(`   PORT: ${process.env.PORT || 'not set'}`);
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'set' : 'not set'}`);
  
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL이 설정되지 않았습니다.');
    console.log('   Render.com에서 환경 변수를 설정해주세요.');
    console.log('   서버를 시작하지만 데이터베이스 연결이 실패할 수 있습니다.');
  }

  // Prisma 마이그레이션 실행
  console.log('🔄 Prisma 마이그레이션 실행 중...');
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ 마이그레이션 성공');
  } catch (error) {
    console.log('⚠️  마이그레이션 실패:', error.message);
    console.log('   서버를 시작하지만 데이터베이스 연결이 실패할 수 있습니다.');
  }

  // 서버 시작
  console.log('🚀 서버 시작 중...');
  execSync('node src/app.js', { stdio: 'inherit' });
  
} catch (error) {
  console.error('❌ 배포 실패:', error.message);
  process.exit(1);
}
