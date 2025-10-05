// API 서비스 클래스
class ApiService {
  constructor(baseURL = 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  // 공통 요청 메서드
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'API 요청에 실패했습니다.');
      }

      return data;
    } catch (error) {
      console.error('API 요청 오류:', error);
      throw error;
    }
  }

  // GET 요청
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST 요청
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT 요청
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // 메뉴 관련 API
  async getMenus() {
    return this.get('/api/menus');
  }

  async getMenuById(id) {
    return this.get(`/api/menus/${id}`);
  }

  // 주문 관련 API
  async createOrder(orderData) {
    return this.post('/api/orders', orderData);
  }

  async getOrders() {
    return this.get('/api/orders');
  }

  async getOrderById(id) {
    return this.get(`/api/orders/${id}`);
  }

  async updateOrderStatus(id, status) {
    return this.put(`/api/orders/${id}/status`, { status });
  }

  // 관리자 관련 API
  async getDashboardStats() {
    return this.get('/api/admin/dashboard');
  }

  async updateMenuStock(id, stock) {
    return this.put(`/api/admin/menus/${id}/stock`, { stock });
  }
}

// API 서비스 인스턴스 생성
const apiService = new ApiService();

export default apiService;
