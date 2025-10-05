import { useState, useEffect } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import InventoryManagement from '../components/InventoryManagement';
import OrderManagement from '../components/OrderManagement';
import { inventoryData, sampleOrders } from '../data/adminData';
import apiService from '../services/api';
import './AdminPage.css';

function AdminPage() {
  const [dashboardStats, setDashboardStats] = useState({
    total_orders: 0,
    received_orders: 0,
    preparing_orders: 0,
    completed_orders: 0
  });
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 로드
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      console.log('관리자 데이터 로드 시작...');
      
      // 임시로 로컬 데이터만 사용 (백엔드 연결 문제 해결 후 수정)
      console.log('로컬 데이터 사용:', { inventoryData, sampleOrders });
      
      setDashboardStats({
        total_orders: sampleOrders.length,
        received_orders: sampleOrders.filter(order => order.status === '주문 접수').length,
        preparing_orders: sampleOrders.filter(order => order.status === '제조 중').length,
        completed_orders: sampleOrders.filter(order => order.status === '제조 완료').length
      });
      setInventory(inventoryData);
      setOrders(sampleOrders);
      setError('로컬 데이터를 사용합니다. (백엔드 연결 테스트 중)');
      
      // 백엔드 연결 테스트 (선택적)
      try {
        const [dashboardResponse, menusResponse, ordersResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getMenus(),
          apiService.getOrders()
        ]);

        console.log('백엔드 응답 성공:', { dashboardResponse, menusResponse, ordersResponse });

        setDashboardStats(dashboardResponse.data);
        setInventory(menusResponse.data || []);
        setOrders(ordersResponse.data || []);
        setError(null);
      } catch (backendError) {
        console.warn('백엔드 연결 실패, 로컬 데이터 유지:', backendError.message);
      }
      
    } catch (error) {
      console.error('데이터 로드 오류:', error);
      setError('데이터 로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      console.log('관리자 데이터 로드 완료');
    }
  };

  const handleUpdateStock = async (itemId, newStock) => {
    try {
      await apiService.updateMenuStock(itemId, newStock);
      setInventory(prevInventory => 
        prevInventory.map(item => 
          item.id === itemId ? { ...item, stock: newStock } : item
        )
      );
    } catch (error) {
      console.error('재고 업데이트 오류:', error);
      alert(`재고 업데이트 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      // 대시보드 통계 업데이트
      loadAdminData();
      
    } catch (error) {
      console.error('주문 상태 변경 오류:', error);
      alert(`주문 상태 변경 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  console.log('AdminPage 렌더링:', { loading, error, dashboardStats, inventory, orders });

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <p>관리자 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {error && (
        <div className="error-notice">
          <p>{error}</p>
        </div>
      )}
      <div className="admin-content">
        <AdminDashboard stats={dashboardStats} />
        
        <div className="admin-sections">
          <div className="inventory-section">
            <InventoryManagement 
              inventory={inventory}
              onUpdateStock={handleUpdateStock}
            />
          </div>
          
          <div className="orders-section">
            <OrderManagement 
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
