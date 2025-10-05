import './AdminDashboard.css';

function AdminDashboard({ orders }) {
  // 주문 상태별 개수 계산
  const totalOrders = orders.length;
  const receivedOrders = orders.filter(order => order.status === '주문 접수').length;
  const preparingOrders = orders.filter(order => order.status === '제조 중').length;
  const completedOrders = orders.filter(order => order.status === '제조 완료').length;

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">관리자 대시보드</h2>
      <div className="dashboard-stats">
        <div className="stat-item">
          <div className="stat-label">총 주문</div>
          <div className="stat-value">{totalOrders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">주문 접수</div>
          <div className="stat-value received">{receivedOrders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">제조 중</div>
          <div className="stat-value preparing">{preparingOrders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">제조 완료</div>
          <div className="stat-value completed">{completedOrders}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
