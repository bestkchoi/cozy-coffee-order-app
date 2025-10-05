// API 응답 유틸리티 함수들

const sendSuccess = (res, data, message = '성공', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendError = (res, message = '오류가 발생했습니다.', statusCode = 500, code = 'INTERNAL_ERROR') => {
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      timestamp: new Date().toISOString()
    }
  });
};

const sendValidationError = (res, message = '입력 데이터가 올바르지 않습니다.', details = null) => {
  res.status(400).json({
    success: false,
    error: {
      code: 'VALIDATION_ERROR',
      message,
      details,
      timestamp: new Date().toISOString()
    }
  });
};

const sendNotFoundError = (res, message = '요청한 리소스를 찾을 수 없습니다.') => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message,
      timestamp: new Date().toISOString()
    }
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFoundError
};
