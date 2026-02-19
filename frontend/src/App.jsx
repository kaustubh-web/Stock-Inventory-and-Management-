import "./App.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import DashBoardPage from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import MovementsPage from "./pages/MovementsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <SignedOut>
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </SignedOut>

      <SignedIn>
        <div className="app-layout">
          <Navbar />

          <div className="workspace">
            <header className="workspace-header">
              <h1>Inventory Operations</h1>
              <p>Single console for catalog control, stock flow, and restock risk.</p>
            </header>

            <main className="workspace-main">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashBoardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/movements" element={<MovementsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default App;
