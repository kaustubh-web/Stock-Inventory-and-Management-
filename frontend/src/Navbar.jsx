import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/products", label: "Products" },
  { to: "/movements", label: "Movements" },
];

export default function Navbar() {
  return (
    <>
      <aside className="side-nav">
        <div className="side-brand">
          <p className="side-brand-title">Stock Inventory</p>
          <p className="side-brand-subtitle">Ops Workspace</p>
        </div>

        <nav className="side-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "side-link side-link-active" : "side-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="side-status">
          <p className="side-status-label">System</p>
          <p className="side-status-value">API Connected</p>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "mobile-link mobile-link-active" : "mobile-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
