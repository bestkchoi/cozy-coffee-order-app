# 커피 주문 앱

## 1. 프로젝트 개요

### 1.2 프로젝트 목적
사용자가 커피 메뉴를 주문하고, 관리자가 주문을 관리할 수 있는 간단한 풀스택 웹 앱

### 1.3 개발 범위
- 주문하기 화면(메뉴 선택 및 장바구니 기능)
- 관리자 화면(재고 관리 및 주문 상태 관리)
- 데이터를 생성/조회/수정/삭제할 수 있는 기능

## 2. 기술 스택
- 프런트엔드: HTML, CSS, 리액트, 자바스크립트
- 백엔드: Node.js, Express
- 데이터베이스: PostgreSQL

## 3. 주문하기 화면 상세 사양

### 3.1 화면 구성
주문하기 화면은 크게 3개의 영역으로 구성됩니다:
- 상단 헤더 영역
- 메뉴 아이템 목록 영역  
- 하단 장바구니 영역

### 3.2 상단 헤더 영역
- **브랜드명**: 왼쪽 상단에 "COZY" 텍스트 표시
- **네비게이션 버튼**: 오른쪽 상단에 "주문하기"와 "관리자" 버튼
  - 현재 화면인 "주문하기" 버튼은 활성화 상태 표시
  - "관리자" 버튼 클릭 시 관리자 화면으로 이동

### 3.3 메뉴 아이템 목록 영역
각 메뉴 아이템은 카드 형태로 표시되며, 다음 요소들을 포함합니다:

#### 3.3.1 메뉴 정보
- **이미지**: 메뉴별 음료 이미지 (현재는 X자 표시된 플레이스홀더)
- **메뉴명**: 예) "아메리카노(ICE)", "아메리카노(HOT)", "카페라떼"
- **가격**: 숫자로 표시 (예: 4,000원, 5,000원)
- **설명**: 메뉴에 대한 간단한 설명 텍스트

#### 3.3.2 옵션 선택
각 메뉴 아이템마다 다음 옵션을 제공:
- **샷 추가**: 체크박스 형태, 선택 시 +500원 추가
- **시럽 추가**: 체크박스 형태, 선택 시 +0원 (무료)

#### 3.3.3 담기 버튼
- 각 카드 하단에 회색 테두리의 "담기" 버튼 배치
- 클릭 시 선택된 옵션과 함께 해당 메뉴를 장바구니에 추가

### 3.4 하단 장바구니 영역
#### 3.4.1 장바구니 제목
- "장바구니" 텍스트로 섹션 구분

#### 3.4.2 장바구니 아이템 목록
각 아이템은 다음 정보를 표시:
- **메뉴명**: 선택된 옵션 포함 (예: "아메리카노(ICE) (샷 추가)")
- **수량**: X 1, X 2 등으로 표시
- **개별 가격**: 옵션 추가 비용 포함한 개별 아이템 가격

#### 3.4.3 총 금액 및 주문 버튼
- **총 금액**: "총 금액 12,500원" 형태로 굵게 표시
- **주문하기 버튼**: 회색 테두리의 "주문하기" 버튼으로 최종 주문 처리

### 3.5 사용자 인터랙션 플로우
1. 사용자가 메뉴 카드에서 원하는 옵션(샷 추가, 시럽 추가) 선택
2. "담기" 버튼 클릭하여 장바구니에 추가
3. 장바구니에서 아이템 확인 및 수량 변경 가능
4. 총 금액 확인 후 "주문하기" 버튼으로 최종 주문 완료

### 3.6 데이터 요구사항
#### 3.6.1 메뉴 데이터
```javascript
{
  id: number,
  name: string,
  price: number,
  description: string,
  image: string,
  category: string
}
```

#### 3.6.2 옵션 데이터
```javascript
{
  id: number,
  name: string,
  price: number,
  menuId: number
}
```

#### 3.6.3 장바구니 아이템 데이터
```javascript
{
  menuId: number,
  menuName: string,
  basePrice: number,
  selectedOptions: array,
  quantity: number,
  totalPrice: number
}
```

## 4. 관리자 화면 상세 사양

### 4.1 화면 구성
관리자 화면은 크게 4개의 영역으로 구성됩니다:
- 상단 헤더 영역
- 관리자 대시보드 영역
- 재고 현황 영역
- 주문 현황 영역

### 4.2 상단 헤더 영역
- **브랜드명**: 왼쪽 상단에 "COZY" 텍스트 표시
- **네비게이션 버튼**: 오른쪽 상단에 "주문하기"와 "관리자" 버튼
  - 현재 화면인 "관리자" 버튼이 활성화 상태 표시
  - "주문하기" 버튼 클릭 시 주문하기 화면으로 이동

### 4.3 관리자 대시보드 영역
#### 4.3.1 대시보드 제목
- "관리자 대시보드" 텍스트로 섹션 구분

#### 4.3.2 주문 상태 요약
현재 주문 상태를 숫자로 표시:
- **총 주문**: 전체 주문 건수
- **주문 접수**: 접수된 주문 건수  
- **제조 중**: 제조 진행 중인 주문 건수
- **제조 완료**: 제조가 완료된 주문 건수

표시 형태: "총 주문 1 / 주문 접수 1 / 제조 중 0 / 제조 완료 0"

### 4.4 재고 현황 영역
#### 4.4.1 재고 현황 제목
- "재고 현황" 텍스트로 섹션 구분

#### 4.4.2 재고 관리 카드
각 메뉴 아이템별로 재고 관리 카드를 제공:
- **메뉴명**: 예) "아메리카노 (ICE)", "아메리카노 (HOT)", "카페라떼"
- **현재 재고**: "10개" 형태로 숫자 표시
- **재고 조절 버튼**: 
  - "+" 버튼: 재고 증가
  - "-" 버튼: 재고 감소
  - 실시간으로 재고 수량 업데이트

### 4.5 주문 현황 영역
#### 4.5.1 주문 현황 제목
- "주문 현황" 텍스트로 섹션 구분

#### 4.5.2 주문 목록
각 주문은 다음 정보를 표시:
- **주문 시간**: "7월 31일 13:00" 형태로 날짜와 시간 표시
- **주문 내역**: "아메리카노(ICE) x 1" 형태로 메뉴명과 수량 표시
- **가격**: "4,000원" 형태로 주문 금액 표시
- **주문 상태**: 현재 주문 상태 표시 (예: "주문 접수")

#### 4.5.3 주문 상태 관리
- **상태 변경 버튼**: "주문 접수" 버튼으로 주문 상태 변경
- 상태 변경 시 대시보드의 주문 상태 요약도 실시간 업데이트

### 4.6 사용자 인터랙션 플로우
#### 4.6.1 재고 관리
1. 관리자가 재고 현황에서 "+" 또는 "-" 버튼 클릭
2. 해당 메뉴의 재고 수량이 실시간으로 업데이트
3. 재고 변경 사항이 데이터베이스에 저장

#### 4.6.2 주문 상태 관리
1. 주문 현황에서 주문 상태 변경 버튼 클릭
2. 주문 상태가 다음 단계로 변경 (주문 접수 → 제조 중 → 제조 완료)
3. 대시보드의 주문 상태 요약이 자동으로 업데이트

### 4.7 데이터 요구사항
#### 4.7.1 재고 데이터
```javascript
{
  id: number,
  menuId: number,
  menuName: string,
  stock: number,
  lastUpdated: date
}
```

#### 4.7.2 주문 데이터
```javascript
{
  id: number,
  orderTime: date,
  items: array, // [{menuName: string, quantity: number, price: number}]
  totalPrice: number,
  status: string, // 'received', 'preparing', 'completed'
  customerInfo: object // 선택적
}
```

#### 4.7.3 주문 상태 타입
```javascript
enum OrderStatus {
  RECEIVED = '주문 접수',
  PREPARING = '제조 중', 
  COMPLETED = '제조 완료'
}
```

### 4.8 실시간 업데이트 기능
- **재고 변경**: 재고 수량 변경 시 즉시 UI 반영
- **주문 상태 변경**: 주문 상태 변경 시 대시보드 요약 정보 자동 업데이트
- **새 주문 알림**: 새로운 주문 발생 시 주문 현황에 자동 추가

## 5. 백엔드 개발 사양

### 5.1 데이터 모델 설계

#### 5.1.1 Menus 테이블
```sql
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url VARCHAR(255),
  stock INTEGER DEFAULT 0,
  category VARCHAR(50) DEFAULT 'coffee',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5.1.2 Options 테이블
```sql
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INTEGER DEFAULT 0,
  menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5.1.3 Orders 테이블
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'received',
  total_amount INTEGER NOT NULL,
  items JSONB NOT NULL, -- 주문 아이템 상세 정보
  customer_info JSONB, -- 향후 확장을 위한 고객 정보
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2 사용자 흐름 및 데이터 스키마

#### 5.2.1 메뉴 조회 흐름
1. **프론트엔드**: 메인 페이지 로드 시 `/api/menus` API 호출
2. **백엔드**: Menus 테이블에서 활성 메뉴 조회
3. **백엔드**: 각 메뉴의 Options 테이블 조회하여 옵션 정보 포함
4. **응답**: 메뉴 목록과 옵션 정보를 JSON 형태로 반환

#### 5.2.2 장바구니 관리 흐름
1. **프론트엔드**: 사용자가 메뉴 선택 시 로컬 상태로 관리
2. **프론트엔드**: 장바구니에 선택된 메뉴, 수량, 옵션 정보 저장
3. **프론트엔드**: 실시간으로 총 금액 계산 및 표시

#### 5.2.3 주문 생성 흐름
1. **프론트엔드**: '주문하기' 버튼 클릭 시 주문 정보 수집
2. **백엔드**: `/api/orders` POST 요청으로 주문 정보 전송
3. **백엔드**: Orders 테이블에 주문 정보 저장
4. **백엔드**: 주문된 메뉴의 재고 수량 차감 (Menus 테이블 업데이트)
5. **응답**: 주문 ID와 함께 성공 응답 반환

#### 5.2.4 관리자 주문 관리 흐름
1. **프론트엔드**: 관리자 화면 로드 시 `/api/orders` GET 요청
2. **백엔드**: 모든 주문 정보 조회하여 반환
3. **프론트엔드**: 주문 상태별로 분류하여 표시
4. **백엔드**: `/api/orders/:id/status` PUT 요청으로 상태 변경
5. **백엔드**: Orders 테이블의 status 필드 업데이트

### 5.3 API 설계

#### 5.3.1 메뉴 관련 API

**GET /api/menus**
- **목적**: 활성 메뉴 목록 조회
- **응답**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "아메리카노(ICE)",
      "description": "진한 에스프레소에 시원한 얼음을 넣은 클래식 아메리카노",
      "price": 4000,
      "image_url": "/images/americano-ice.jpg",
      "stock": 10,
      "category": "coffee",
      "options": [
        {
          "id": 1,
          "name": "샷 추가",
          "price": 500
        },
        {
          "id": 2,
          "name": "시럽 추가",
          "price": 0
        }
      ]
    }
  ]
}
```

**GET /api/menus/:id**
- **목적**: 특정 메뉴 상세 정보 조회
- **응답**: 단일 메뉴 객체

#### 5.3.2 주문 관련 API

**POST /api/orders**
- **목적**: 새 주문 생성
- **요청 본문**:
```json
{
  "items": [
    {
      "menu_id": 1,
      "menu_name": "아메리카노(ICE)",
      "quantity": 2,
      "selected_options": [
        {
          "option_id": 1,
          "option_name": "샷 추가",
          "price": 500
        }
      ],
      "item_total_price": 9000
    }
  ],
  "total_amount": 9000
}
```
- **응답**:
```json
{
  "success": true,
  "data": {
    "order_id": 123,
    "order_time": "2024-07-31T13:00:00Z",
    "status": "received",
    "total_amount": 9000
  }
}
```

**GET /api/orders**
- **목적**: 모든 주문 목록 조회 (관리자용)
- **응답**:
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "order_time": "2024-07-31T13:00:00Z",
      "status": "received",
      "total_amount": 9000,
      "items": [
        {
          "menu_name": "아메리카노(ICE)",
          "quantity": 2,
          "selected_options": ["샷 추가"],
          "item_total_price": 9000
        }
      ]
    }
  ]
}
```

**PUT /api/orders/:id/status**
- **목적**: 주문 상태 변경
- **요청 본문**:
```json
{
  "status": "preparing"
}
```
- **응답**:
```json
{
  "success": true,
  "data": {
    "order_id": 123,
    "status": "preparing",
    "updated_at": "2024-07-31T13:05:00Z"
  }
}
```

**GET /api/orders/:id**
- **목적**: 특정 주문 상세 정보 조회
- **응답**: 단일 주문 객체

#### 5.3.3 관리자 관련 API

**GET /api/admin/dashboard**
- **목적**: 관리자 대시보드 통계 정보 조회
- **응답**:
```json
{
  "success": true,
  "data": {
    "total_orders": 15,
    "received_orders": 3,
    "preparing_orders": 2,
    "completed_orders": 10
  }
}
```

**PUT /api/admin/menus/:id/stock**
- **목적**: 메뉴 재고 수량 변경
- **요청 본문**:
```json
{
  "stock": 15
}
```
- **응답**:
```json
{
  "success": true,
  "data": {
    "menu_id": 1,
    "stock": 15,
    "updated_at": "2024-07-31T13:10:00Z"
  }
}
```

### 5.4 에러 처리

#### 5.4.1 공통 에러 응답 형식
```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "잘못된 요청입니다.",
    "details": "필수 필드가 누락되었습니다."
  }
}
```

#### 5.4.2 주요 에러 코드
- `INVALID_REQUEST`: 잘못된 요청 형식
- `MENU_NOT_FOUND`: 메뉴를 찾을 수 없음
- `ORDER_NOT_FOUND`: 주문을 찾을 수 없음
- `INSUFFICIENT_STOCK`: 재고 부족
- `INVALID_STATUS`: 잘못된 주문 상태
- `INTERNAL_ERROR`: 서버 내부 오류

### 5.5 데이터베이스 시드 데이터

#### 5.5.1 초기 메뉴 데이터
```sql
INSERT INTO menus (name, description, price, stock, category) VALUES
('아메리카노(ICE)', '진한 에스프레소에 시원한 얼음을 넣은 클래식 아메리카노', 4000, 10, 'coffee'),
('아메리카노(HOT)', '따뜻한 에스프레소에 뜨거운 물을 넣은 클래식 아메리카노', 4000, 8, 'coffee'),
('카페라떼', '부드러운 우유 거품과 에스프레소의 완벽한 조화', 5000, 12, 'coffee'),
('카페모카', '초콜릿과 에스프레소, 우유의 달콤한 만남', 5500, 5, 'coffee'),
('카푸치노', '진한 에스프레소와 부드러운 우유 거품의 클래식', 5000, 7, 'coffee'),
('바닐라라떼', '달콤한 바닐라 시럽이 들어간 부드러운 라떼', 5500, 9, 'coffee');
```

#### 5.5.2 초기 옵션 데이터
```sql
INSERT INTO options (name, price, menu_id) VALUES
('샷 추가', 500, 1), ('시럽 추가', 0, 1),
('샷 추가', 500, 2), ('시럽 추가', 0, 2),
('샷 추가', 500, 3), ('시럽 추가', 0, 3),
('샷 추가', 500, 4), ('시럽 추가', 0, 4),
('샷 추가', 500, 5), ('시럽 추가', 0, 5),
('샷 추가', 500, 6), ('시럽 추가', 0, 6);
```

### 5.6 기술 스택 및 환경 설정

#### 5.6.1 백엔드 기술 스택
- **Runtime**: Node.js (v18 이상)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma 또는 Sequelize
- **Validation**: Joi 또는 Yup
- **Environment**: dotenv

#### 5.6.2 개발 환경 설정
```javascript
// package.json dependencies
{
  "express": "^4.18.0",
  "pg": "^8.8.0",
  "prisma": "^4.0.0",
  "@prisma/client": "^4.0.0",
  "joi": "^17.7.0",
  "cors": "^2.8.5",
  "helmet": "^6.0.0",
  "dotenv": "^16.0.0"
}
```

## 6. 기본 사항
- 프런트엔드와 백엔드를 따로 개발
- 기본적인 웹 기술만 사용
- 학습 목적이므로 사용자 인증이나 결제 기능은 제외
- 메뉴는 커피 메뉴만 있음
- RESTful API 설계 원칙 준수
- 데이터베이스 정규화 및 관계 설정