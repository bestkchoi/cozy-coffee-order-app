import './Cart.css';

function Cart({ cartItems, onRemoveItem, onUpdateQuantity, onPlaceOrder }) {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const formatItemName = (item) => {
    const optionsText = item.selectedOptions.length > 0 
      ? ` (${item.selectedOptions.map(opt => opt.name).join(', ')})`
      : '';
    return `${item.name}${optionsText}`;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="cart">
      <h2 className="cart-title">장바구니</h2>
      
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>장바구니가 비어있습니다.</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      {formatItemName(item)}
                    </div>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {item.totalPrice.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="cart-summary-section">
            <div className="cart-summary">
              <div className="cart-total">
                총 금액 <strong>{getTotalPrice().toLocaleString()}원</strong>
              </div>
              <button 
                className="order-btn"
                onClick={onPlaceOrder}
              >
                주문하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
