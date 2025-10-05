import { useState } from 'react';
import './MenuCard.css';

function MenuCard({ menuItem, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (optionId, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, optionId]);
    } else {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    }
  };

  const handleAddToCart = () => {
    const selectedOptionObjects = menuItem.options.filter(option => 
      selectedOptions.includes(option.id)
    );
    
    onAddToCart({
      ...menuItem,
      selectedOptions: selectedOptionObjects
    });
    
    // 선택된 옵션 초기화
    setSelectedOptions([]);
  };

  const getTotalPrice = () => {
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = menuItem.options.find(opt => opt.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
    return menuItem.price + optionsPrice;
  };

  return (
    <div className="menu-card">
      <div className="menu-image">
        <div className="image-placeholder">
          <span>☕</span>
        </div>
      </div>
      
      <div className="menu-info">
        <h3 className="menu-name">{menuItem.name}</h3>
        <p className="menu-price">{menuItem.price.toLocaleString()}원</p>
        <p className="menu-description">{menuItem.description}</p>
        
        <div className="menu-options">
          {menuItem.options.map(option => (
            <label key={option.id} className="option-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={(e) => handleOptionChange(option.id, e.target.checked)}
              />
              <span className="option-text">
                {option.name} ({option.price > 0 ? `+${option.price.toLocaleString()}원` : '+0원'})
              </span>
            </label>
          ))}
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          담기
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
