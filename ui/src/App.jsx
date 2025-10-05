import { useState } from 'react'
import OrderPage from './pages/OrderPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('order')

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>COZY</h1>
        </div>
        <nav className="navigation">
          <button 
            className={currentPage === 'order' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('order')}
          >
            주문하기
          </button>
          <button 
            className={currentPage === 'admin' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('admin')}
          >
            관리자
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {currentPage === 'order' ? (
          <OrderPage />
        ) : (
          <div className="admin-page">
            <h2>관리자 화면</h2>
            <p>관리자 화면이 여기에 구현됩니다.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
