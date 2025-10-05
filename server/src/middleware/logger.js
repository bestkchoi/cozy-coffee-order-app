// 로깅 미들웨어

const logger = (req, res, next) => {
  const start = Date.now();
  
  // 요청 로깅
  console.log(`📥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  
  // 응답 완료 시 로깅
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? '🔴' : '🟢';
    
    console.log(`${statusColor} ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = logger;
