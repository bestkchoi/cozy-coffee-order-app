import { ORDER_STATUS } from '../data/adminData';
import './OrderManagement.css';

function OrderManagement({ orders, onUpdateOrderStatus }) {
  console.log('OrderManagement 렌더링:', { orders, onUpdateOrderStatus });
  
  const formatDateTime = (dateTime) => {
    try {
      // Date 객체인지 확인하고, 아니면 Date 객체로 변환
      let date;
      if (dateTime instanceof Date) {
        date = dateTime;
      } else if (typeof dateTime === 'string') {
        date = new Date(dateTime);
      } else {
        console.warn('Invalid dateTime:', dateTime);
        return '날짜 정보 없음';
      }
      
      // 유효한 날짜인지 확인
      if (isNaN(date.getTime())) {
        console.warn('Invalid date:', dateTime);
        return '날짜 정보 없음';
      }
      
      return date.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('날짜 포맷 오류:', error, dateTime);
      return '날짜 정보 없음';
    }
  };

  const formatOrderItems = (items) => {
    if (!items || !Array.isArray(items)) return '';
    
    return items.map(item => {
      // 백엔드 데이터 구조 처리
      if (item.menu_name) {
        return `${item.menu_name} x ${item.quantity}`;
      }
      // 로컬 데이터 구조 처리
      if (item.name) {
        return `${item.name} x ${item.quantity}`;
      }
      return '';
    }).join(', ');
  };

  const getNextStatus = (currentStatus) => {
    // 백엔드 상태값과 로컬 상태값 모두 처리
    if (currentStatus === 'received' || currentStatus === ORDER_STATUS.RECEIVED) {
      return 'preparing';
    }
    if (currentStatus === 'preparing' || currentStatus === ORDER_STATUS.PREPARING) {
      return 'completed';
    }
    return null;
  };

  const getStatusButtonText = (currentStatus) => {
    if (currentStatus === 'received' || currentStatus === ORDER_STATUS.RECEIVED) {
      return '제조 시작';
    }
    if (currentStatus === 'preparing' || currentStatus === ORDER_STATUS.PREPARING) {
      return '제조 완료';
    }
    return '완료됨';
  };

  const getStatusColor = (status) => {
    if (status === 'received' || status === ORDER_STATUS.RECEIVED) {
      return '#007bff';
    }
    if (status === 'preparing' || status === ORDER_STATUS.PREPARING) {
      return '#ffc107';
    }
    if (status === 'completed' || status === ORDER_STATUS.COMPLETED) {
      return '#28a745';
    }
    return '#6c757d';
  };

  const getStatusDisplayText = (status) => {
    if (status === 'received') return '주문 접수';
    if (status === 'preparing') return '제조 중';
    if (status === 'completed') return '제조 완료';
    return status; // 로컬 데이터의 경우 그대로 표시
  };

  return (
    <div className="order-management">
      <h2 className="order-title">주문 현황</h2>
      <div className="order-list">
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>현재 주문이 없습니다.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <div className="order-time">
                  {formatDateTime(order.order_time || order.orderTime)}
                </div>
                <div className="order-details">
                  <div className="order-items">
                    {formatOrderItems(order.items)}
                  </div>
                  <div className="order-total">
                    {(order.total_amount || order.totalPrice || 0).toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="order-status-section">
                <div 
                  className="order-status"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {getStatusDisplayText(order.status)}
                </div>
                <button
                  className={`status-btn ${order.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    const nextStatus = getNextStatus(order.status);
                    if (nextStatus) {
                      onUpdateOrderStatus(order.id, nextStatus);
                    }
                  }}
                  disabled={order.status === 'completed' || order.status === ORDER_STATUS.COMPLETED}
                >
                  {getStatusButtonText(order.status)}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrderManagement;
