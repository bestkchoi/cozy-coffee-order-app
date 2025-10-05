import { useState, useCallback, useMemo } from 'react';
import MenuCard from '../components/MenuCard';
import Cart from '../components/Cart';
import { menuItems } from '../data/menuData';
import './OrderPage.css';

function OrderPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((menuItem) => {
    const optionsPrice = menuItem.selectedOptions.reduce((total, option) => total + option.price, 0);
    const totalPrice = menuItem.price + optionsPrice;
    
    // 기존 장바구니에 같은 아이템(메뉴 + 옵션)이 있는지 확인
    const existingItemIndex = cartItems.findIndex(item => 
      item.menuId === menuItem.id && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(menuItem.selectedOptions)
    );

    if (existingItemIndex !== -1) {
      // 같은 아이템이 있으면 수량 증가
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * (menuItem.price + optionsPrice);
      setCartItems(updatedCart);
    } else {
      // 새로운 아이템 추가
      const newCartItem = {
        id: `${menuItem.id}_${menuItem.selectedOptions.map(opt => opt.id).join('_')}_${Date.now()}`, // 고유 ID 생성
        menuId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        selectedOptions: menuItem.selectedOptions,
        quantity: 1,
        totalPrice: totalPrice
      };
      setCartItems([...cartItems, newCartItem]);
    }
  }, [cartItems]);

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const optionsPrice = item.selectedOptions.reduce((total, option) => total + option.price, 0);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * (item.price + optionsPrice)
        };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }

    // 주문 확인
    const confirmOrder = window.confirm('정말 주문하시겠습니까?');
    if (!confirmOrder) return;

    const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    const orderDetails = cartItems.map(item => 
      `${item.name}${item.selectedOptions.length > 0 ? ` (${item.selectedOptions.map(opt => opt.name).join(', ')})` : ''} x ${item.quantity}`
    ).join('\n');

    alert(`주문이 완료되었습니다!\n\n주문 내역:\n${orderDetails}\n\n총 금액: ${totalAmount.toLocaleString()}원`);
    
    // 주문 완료 후 장바구니 비우기
    setCartItems([]);
  };

  return (
    <div className="order-page">
      <div className="order-content">
        <div className="menu-section">
          <h2 className="menu-section-title">메뉴</h2>
          <div className="menu-grid">
            {menuItems.map(menuItem => (
              <MenuCard
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
        
        <div className="cart-section">
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onPlaceOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
