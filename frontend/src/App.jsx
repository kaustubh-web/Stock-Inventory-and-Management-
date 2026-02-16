import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import MovementsPage from './pages/MovementsPage';
import DashBoardPage from './pages/DashBoardpage';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/movements" element={<MovementsPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
    </>
  );
}

export default App;
