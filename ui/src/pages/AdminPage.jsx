import { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import InventoryManagement from '../components/InventoryManagement';
import OrderManagement from '../components/OrderManagement';
import { inventoryData, sampleOrders } from '../data/adminData';
import './AdminPage.css';

function AdminPage() {
  const [inventory, setInventory] = useState(inventoryData);
  const [orders, setOrders] = useState(sampleOrders);

  const handleUpdateStock = (itemId, newStock) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === itemId ? { ...item, stock: newStock } : item
      )
    );
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-page">
      <div className="admin-content">
        <AdminDashboard orders={orders} />
        
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
