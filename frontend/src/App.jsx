import "./App.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import DashBoardPage from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import MovementsPage from "./pages/MovementsPage";
import ProductsPage from "./pages/ProductsPage";

function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
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

            <Route
              path="/login"
              element={
                <>
                  <SignedIn>
                    <Navigate to="/dashboard" replace />
                  </SignedIn>
                  <SignedOut>
                    <LoginPage />
                  </SignedOut>
                </>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/movements"
              element={
                <ProtectedRoute>
                  <MovementsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
