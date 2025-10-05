import './AdminDashboard.css';

function AdminDashboard({ stats }) {
  console.log('AdminDashboard 렌더링:', { stats });
  
  // 백엔드에서 받은 통계 데이터 사용
  const dashboardStats = stats || {
    total_orders: 0,
    received_orders: 0,
    preparing_orders: 0,
    completed_orders: 0
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">관리자 대시보드</h2>
      <div className="dashboard-stats">
        <div className="stat-item">
          <div className="stat-label">총 주문</div>
          <div className="stat-value">{dashboardStats.total_orders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">주문 접수</div>
          <div className="stat-value received">{dashboardStats.received_orders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">제조 중</div>
          <div className="stat-value preparing">{dashboardStats.preparing_orders}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">제조 완료</div>
          <div className="stat-value completed">{dashboardStats.completed_orders}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
