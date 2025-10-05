# COZY 커피 주문 앱 - 백엔드 서버

Express.js를 사용한 커피 주문 앱의 백엔드 API 서버입니다.

## 🚀 시작하기

### 필수 요구사항
- Node.js (v18 이상)
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치
```bash
npm install
```

2. 개발 서버 실행
```bash
npm run dev
```

3. 프로덕션 서버 실행
```bash
npm start
```

## 📁 프로젝트 구조

```
server/
├── src/
│   ├── app.js              # 메인 애플리케이션 파일
│   ├── controllers/        # 컨트롤러 (비즈니스 로직)
│   ├── middleware/         # 미들웨어
│   │   ├── errorHandler.js # 에러 핸들링
│   │   └── logger.js       # 로깅
│   ├── models/            # 데이터 모델 (향후 DB 모델)
│   ├── routes/            # API 라우트
│   └── utils/             # 유틸리티 함수
│       ├── response.js    # API 응답 헬퍼
│       └── validation.js  # 데이터 검증
├── config.js              # 환경 설정
├── package.json
└── README.md
```

## 🔧 환경 설정

### .env 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 서버 설정
PORT=3001
NODE_ENV=development

# PostgreSQL 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cozy_order_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# 데이터베이스 연결 URL (Prisma 사용)
DATABASE_URL="postgresql://postgres:your_password_here@localhost:5432/cozy_order_db?schema=public"

# CORS 설정
FRONTEND_URL=http://localhost:5173

# JWT 설정 (향후 인증 기능 추가 시 사용)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# 로깅 설정
LOG_LEVEL=info
```

### 환경 변수 설명

- **PORT**: 서버 포트 (기본값: 3001)
- **NODE_ENV**: 실행 환경 (development/production)
- **DATABASE_URL**: PostgreSQL 연결 문자열
- **FRONTEND_URL**: 프론트엔드 URL (CORS 설정)
- **JWT_SECRET**: JWT 토큰 서명용 비밀키

## 📡 API 엔드포인트

### 기본 엔드포인트
- `GET /` - 서버 상태 확인

### 향후 추가될 API
- `GET /api/menus` - 메뉴 목록 조회
- `POST /api/orders` - 주문 생성
- `GET /api/orders` - 주문 목록 조회
- `PUT /api/orders/:id/status` - 주문 상태 변경
- `GET /api/admin/dashboard` - 관리자 대시보드

## 🛠️ 개발 도구

- **nodemon**: 개발 시 자동 재시작
- **helmet**: 보안 헤더 설정
- **cors**: Cross-Origin Resource Sharing 설정

## 📝 로깅

서버는 요청/응답에 대한 상세한 로그를 제공합니다:
- 요청 정보 (메서드, URL, 타임스탬프)
- 응답 정보 (상태 코드, 응답 시간)
- 에러 로그 (에러 메시지, 스택 트레이스)

## 🔒 보안

- Helmet.js를 통한 보안 헤더 설정
- CORS 정책 적용
- 입력 데이터 검증
- 에러 정보 노출 제한 (프로덕션 환경)

## 🚧 향후 계획

1. PostgreSQL 데이터베이스 연동
2. Prisma ORM 설정
3. API 엔드포인트 구현
4. 데이터베이스 시드 데이터 생성
5. 단위 테스트 추가
