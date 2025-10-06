# 🚀 Render.com 배포 가이드

## 📋 배포 순서

### 1단계: PostgreSQL 데이터베이스 생성
1. Render Dashboard → New → PostgreSQL
2. 설정:
   - Name: `cozy-order-db`
   - Database: `cozy_order_db`
   - User: `cozy_user`
   - Region: `Oregon (US West)` 또는 `Singapore (Asia Pacific)`
   - Plan: `Free` (개발용) 또는 `Starter` (프로덕션용)

### 2단계: 백엔드 서버 배포
1. Render Dashboard → New → Web Service
2. GitHub 저장소 연결
3. 설정:
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `npm start`

4. 환경 변수:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=postgresql://... (PostgreSQL External URL)
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```

### 3단계: 프론트엔드 배포
1. Render Dashboard → New → Static Site
2. GitHub 저장소 연결
3. 설정:
   - Root Directory: `ui`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

4. 환경 변수:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## 🔧 배포 전 준비사항

### 코드 수정 완료 ✅
- [x] API 서비스에서 환경 변수 사용하도록 수정
- [x] 백엔드 package.json에 배포용 스크립트 추가
- [x] Prisma 마이그레이션 스크립트 추가

### 필요한 파일들
- [x] server/package.json (배포용 스크립트 포함)
- [x] ui/src/services/api.js (환경 변수 사용)
- [x] server/.env (로컬 개발용)
- [x] server/prisma/schema.prisma (데이터베이스 스키마)

## 📝 배포 후 확인사항

1. **백엔드 서버**: `https://your-backend-url.onrender.com` 접속 확인
2. **프론트엔드**: `https://your-frontend-url.onrender.com` 접속 확인
3. **데이터베이스**: Prisma Studio로 데이터 확인
4. **API 연결**: 프론트엔드에서 백엔드 API 호출 확인

## 🚨 주의사항

- **Free Plan 제한**: 30분 비활성 시 서버가 잠들 수 있음
- **데이터베이스**: Free Plan은 1GB 제한
- **빌드 시간**: Free Plan은 90분/월 제한
- **환경 변수**: 민감한 정보는 Render.com 환경 변수로 설정

## 🔄 업데이트 방법

1. GitHub에 코드 푸시
2. Render.com에서 자동 재배포 확인
3. 필요시 수동 재배포 실행
