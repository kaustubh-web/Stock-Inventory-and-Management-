import "./App.css";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import DashBoardPage from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import MovementsPage from "./pages/MovementsPage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth > 860 : true
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function closeSidebarOnMobile() {
    if (typeof window !== "undefined" && window.innerWidth <= 860) {
      setIsSidebarOpen(false);
    }
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <SignedOut>
        <div className="public-layout">
          <Routes>
            <Route path="*" element={<LoginPage />} />
          </Routes>
          <Footer />
        </div>
      </SignedOut>

      <SignedIn>
        <div className={`app-layout ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Navbar
            isOpen={isSidebarOpen}
            onNavigate={closeSidebarOnMobile}
            onToggleSidebar={toggleSidebar}
          />
          {!isSidebarOpen ? (
            <button
              type="button"
              className="sidebar-peek-btn"
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              aria-controls="main-sidebar"
              aria-label="Open sidebar"
            >
              <span />
              <span />
              <span />
            </button>
          ) : null}
          <button
            type="button"
            className="sidebar-overlay"
            onClick={closeSidebar}
            aria-hidden={!isSidebarOpen}
            aria-label="Close sidebar overlay"
          />

          <div className="workspace">
            <header className="workspace-header">
              <div className="workspace-header-top">
                <h1>Stock desk for daily ops</h1>
                <button
                  type="button"
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label="Toggle light and dark mode"
                  title="Toggle theme"
                >
                  <span className={`theme-toggle-track ${theme === "dark" ? "is-dark" : ""}`}>
                    <span className="theme-toggle-thumb" />
                  </span>
                </button>
              </div>
              <p>Check low stock, clean up SKUs, and log item movement before the next dispatch run.</p>
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

            <Footer />
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default App;
