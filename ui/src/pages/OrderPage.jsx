import { useState, useEffect, useCallback, useMemo } from 'react';
import MenuCard from '../components/MenuCard';
import Cart from '../components/Cart';
import { fallbackMenuItems } from '../data/menuData';
import apiService from '../services/api';
import './OrderPage.css';

function OrderPage() {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 메뉴 데이터 로드
  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMenus();
      setMenuItems(response.data || []);
      setError(null);
    } catch (error) {
      console.warn('백엔드 연결 실패, 로컬 데이터 사용:', error.message);
      setMenuItems(fallbackMenuItems);
      setError('백엔드 서버에 연결할 수 없습니다. 로컬 데이터를 사용합니다.');
    } finally {
      setLoading(false);
    }
  };

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

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }

    // 주문 확인
    const confirmOrder = window.confirm('정말 주문하시겠습니까?');
    if (!confirmOrder) return;

    try {
      const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
      
      // 주문 데이터 생성
      const orderData = {
        total_amount: totalAmount,
        items: cartItems.map(item => ({
          menu_id: item.menuId,
          quantity: item.quantity,
          selected_options: item.selectedOptions.map(opt => ({
            option_id: opt.id
          })),
          item_total_price: item.totalPrice
        })),
        customer_info: {
          name: "고객",
          phone: "010-0000-0000"
        }
      };

      // 백엔드에 주문 전송
      const response = await apiService.createOrder(orderData);
      
      const orderDetails = cartItems.map(item => 
        `${item.name}${item.selectedOptions.length > 0 ? ` (${item.selectedOptions.map(opt => opt.name).join(', ')})` : ''} x ${item.quantity}`
      ).join('\n');

      alert(`주문이 완료되었습니다!\n주문번호: ${response.data.order_id}\n\n주문 내역:\n${orderDetails}\n\n총 금액: ${totalAmount.toLocaleString()}원`);
      
      // 주문 완료 후 장바구니 비우기
      setCartItems([]);
      
      // 메뉴 데이터 새로고침 (재고 업데이트)
      loadMenus();
      
    } catch (error) {
      console.error('주문 오류:', error);
      alert(`주문 처리 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="order-page">
        <div className="loading-container">
          <p>메뉴를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      {error && (
        <div className="error-notice">
          <p>{error}</p>
        </div>
      )}
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
