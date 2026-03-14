import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/movements", label: "Movements" },
];

export default function Navbar({ isOpen, onNavigate, onToggleSidebar }) {
  return (
    <>
      <aside id="main-sidebar" className={`side-nav ${isOpen ? "side-nav-open" : ""}`}>
        <div className="side-brand-row">
          <div className="side-brand">
            <p className="side-brand-title">Stock Inventory</p>
            <p className="side-brand-subtitle">Daily stock desk</p>
          </div>
          <button
            type="button"
            className="hamburger-btn side-hamburger-btn"
            onClick={onToggleSidebar}
            aria-expanded={isOpen}
            aria-controls="main-sidebar"
            aria-label="Close sidebar"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className="side-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                isActive ? "side-link side-link-active" : "side-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="side-status">
          <p className="side-status-label">Today's focus</p>
          <p className="side-status-value">Review low-stock lines before dispatch</p>
        </div>
      </aside>
    </>
  );
}
