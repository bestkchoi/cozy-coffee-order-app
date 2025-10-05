// 에러 핸들링 미들웨어

const errorHandler = (err, req, res, next) => {
  console.error('에러 발생:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // 기본 에러 응답
  let statusCode = err.statusCode || 500;
  let errorCode = err.code || 'INTERNAL_ERROR';
  let message = err.message || '서버 내부 오류가 발생했습니다.';

  // 특정 에러 타입별 처리
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = '입력 데이터가 올바르지 않습니다.';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'INVALID_ID';
    message = '유효하지 않은 ID입니다.';
  } else if (err.code === 11000) {
    statusCode = 409;
    errorCode = 'DUPLICATE_ENTRY';
    message = '중복된 데이터입니다.';
  }

  const errorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      ...(process.env.NODE_ENV === 'development' && { 
        details: err.message,
        stack: err.stack 
      })
    }
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
