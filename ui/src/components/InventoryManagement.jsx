import { useState } from 'react';
import { getStockStatus } from '../data/adminData';
import './InventoryManagement.css';

function InventoryManagement({ inventory, onUpdateStock }) {
  console.log('InventoryManagement 렌더링:', { inventory, onUpdateStock });
  
  const handleStockChange = (itemId, change) => {
    const currentItem = inventory.find(item => item.id === itemId);
    if (currentItem) {
      const newStock = Math.max(0, currentItem.stock + change);
      onUpdateStock(itemId, newStock);
    }
  };

  return (
    <div className="inventory-management">
      <h2 className="inventory-title">재고 현황</h2>
      <div className="inventory-grid">
        {inventory.map(item => {
          const stock = item.stock || 0;
          const stockStatus = getStockStatus(stock);
          return (
            <div key={item.id} className="inventory-item">
              <div className="item-info">
                <div className="item-name">{item.name}</div>
                <div className="stock-info">
                  <span className="stock-count">{stock}개</span>
                  <span 
                    className="stock-status"
                    style={{ color: stockStatus.color }}
                  >
                    {stockStatus.status}
                  </span>
                </div>
              </div>
              <div className="stock-controls">
                <button 
                  className="stock-btn decrease"
                  onClick={() => handleStockChange(item.id, -1)}
                  disabled={stock <= 0}
                >
                  -
                </button>
                <button 
                  className="stock-btn increase"
                  onClick={() => handleStockChange(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryManagement;
