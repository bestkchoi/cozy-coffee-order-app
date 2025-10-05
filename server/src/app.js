const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config');
const { testConnection } = require('./utils/database');

// 라우터 임포트 (향후 추가)
// const menuRoutes = require('./routes/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 미들웨어 설정
app.use(helmet()); // 보안 헤더 설정
app.use(cors(config.cors)); // CORS 설정
app.use(express.json()); // JSON 파싱
app.use(express.urlencoded({ extended: true })); // URL 인코딩 파싱

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'COZY 커피 주문 앱 API 서버가 실행 중입니다.',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API 라우트 (향후 추가)
// app.use('/api/menus', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/admin', adminRoutes);

// 404 에러 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: '요청한 리소스를 찾을 수 없습니다.',
      path: req.originalUrl
    }
  });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: '서버 내부 오류가 발생했습니다.',
      ...(config.nodeEnv === 'development' && { details: err.message })
    }
  });
});

// 서버 시작
const PORT = config.port;
app.listen(PORT, async () => {
  console.log(`🚀 COZY 커피 주문 앱 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📱 프론트엔드 URL: ${config.cors.origin}`);
  console.log(`🌍 환경: ${config.nodeEnv}`);
  
  // 데이터베이스 연결 테스트
  await testConnection();
});

module.exports = app;
