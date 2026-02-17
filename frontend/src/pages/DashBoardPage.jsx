import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardSummary } from "../api";

export default function DashBoardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await getDashboardSummary();
        setSummary(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  if (loading) return <p className="state-text">Loading dashboard metrics...</p>;
  if (error) return <p className="state-text state-error">{error}</p>;
  if (!summary) return <p className="state-text">No dashboard data available.</p>;

  const stockHealth = summary.totalProducts
    ? Math.max(0, Math.round(((summary.totalProducts - summary.lowStockItems) / summary.totalProducts) * 100))
    : 100;

  return (
    <section className="page">
      <div className="page-heading">
        <h2>Dashboard</h2>
        <p>Current health of your inventory operation.</p>
      </div>

      <div className="kpi-grid">
        <article className="kpi-card">
          <p className="kpi-label">Total Products</p>
          <p className="kpi-value">{summary.totalProducts}</p>
        </article>

        <article className="kpi-card kpi-warning">
          <p className="kpi-label">Low Stock Items</p>
          <p className="kpi-value">{summary.lowStockItems}</p>
        </article>

        <article className="kpi-card kpi-info">
          <p className="kpi-label">Movements (24h)</p>
          <p className="kpi-value">{summary.recentMovements24h}</p>
        </article>

        <article className="kpi-card kpi-success">
          <p className="kpi-label">Stock Health</p>
          <p className="kpi-value">{stockHealth}%</p>
        </article>
      </div>

      <div className="split-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Low Stock Queue</h3>
            <Link className="text-link" to="/products">
              Open Products
            </Link>
          </div>

          {summary.lowStockProducts?.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Qty</th>
                    <th>Reorder</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.lowStockProducts.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.sku}</td>
                      <td>{item.quantity}</td>
                      <td>{item.reorderLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-block">
              <p>No low-stock products right now.</p>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Actions</h3>
          </div>

          <div className="action-list">
            <Link className="action-item" to="/products">
              Add or update catalog products
            </Link>
            <Link className="action-item" to="/movements">
              Record stock IN/OUT movement
            </Link>
            <Link className="action-item" to="/login">
              Review access configuration
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
