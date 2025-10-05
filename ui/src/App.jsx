import { useState } from 'react'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('order')

  console.log('App 렌더링:', { currentPage });

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>COZY</h1>
        </div>
        <nav className="navigation" role="navigation" aria-label="메인 네비게이션">
          <button 
            className={currentPage === 'order' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('order')}
            aria-current={currentPage === 'order' ? 'page' : undefined}
          >
            주문하기
          </button>
          <button 
            className={currentPage === 'admin' ? 'nav-button active' : 'nav-button'}
            onClick={() => setCurrentPage('admin')}
            aria-current={currentPage === 'admin' ? 'page' : undefined}
          >
            관리자
          </button>
        </nav>
      </header>
      
      <main className="app-main">
        {currentPage === 'order' ? (
          <OrderPage />
        ) : (
          <AdminPage />
        )}
      </main>
    </div>
  )
}

export default App
