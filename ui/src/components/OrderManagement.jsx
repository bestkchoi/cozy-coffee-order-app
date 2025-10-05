import { ORDER_STATUS } from '../data/adminData';
import './OrderManagement.css';

function OrderManagement({ orders, onUpdateOrderStatus }) {
  const formatDateTime = (dateTime) => {
    return dateTime.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatOrderItems = (items) => {
    return items.map(item => `${item.name} x ${item.quantity}`).join(', ');
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case ORDER_STATUS.RECEIVED:
        return ORDER_STATUS.PREPARING;
      case ORDER_STATUS.PREPARING:
        return ORDER_STATUS.COMPLETED;
      default:
        return null;
    }
  };

  const getStatusButtonText = (currentStatus) => {
    switch (currentStatus) {
      case ORDER_STATUS.RECEIVED:
        return '제조 시작';
      case ORDER_STATUS.PREPARING:
        return '제조 완료';
      default:
        return '완료됨';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case ORDER_STATUS.RECEIVED:
        return '#007bff';
      case ORDER_STATUS.PREPARING:
        return '#ffc107';
      case ORDER_STATUS.COMPLETED:
        return '#28a745';
      default:
        return '#6c757d';
    }
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
                  {formatDateTime(order.orderTime)}
                </div>
                <div className="order-details">
                  <div className="order-items">
                    {formatOrderItems(order.items)}
                  </div>
                  <div className="order-total">
                    {order.totalPrice.toLocaleString()}원
                  </div>
                </div>
              </div>
              <div className="order-status-section">
                <div 
                  className="order-status"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status}
                </div>
                <button
                  className={`status-btn ${order.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => {
                    const nextStatus = getNextStatus(order.status);
                    if (nextStatus) {
                      onUpdateOrderStatus(order.id, nextStatus);
                    }
                  }}
                  disabled={order.status === ORDER_STATUS.COMPLETED}
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
