// 환경 설정 파일
require('dotenv').config();

const config = {
  // 서버 설정
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // 데이터베이스 설정
  database: {
    url: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'password'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'cozy_order_db'}`,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'cozy_order_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password'
  },
  
  // CORS 설정
  cors: {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://order-app-fronted.onrender.com',
      'https://cozy-order-frontend.onrender.com'
    ],
    credentials: true
  }
};

module.exports = config;
