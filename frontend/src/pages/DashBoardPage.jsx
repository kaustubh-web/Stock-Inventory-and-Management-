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
  const urgentCount = summary.lowStockProducts?.filter(
    (item) => item.quantity <= Math.max(0, item.reorderLevel - 2)
  ).length ?? 0;
  const attentionMessage = summary.lowStockItems
    ? `${summary.lowStockItems} SKU${summary.lowStockItems > 1 ? "s are" : " is"} below target.`
    : "All tracked SKUs are above reorder level.";

  return (
    <section className="page">
      <div className="page-heading">
        <h2>Inventory snapshot</h2>
        <p>{attentionMessage}</p>
      </div>

      <div className="dashboard-grid">
        <section className="hero-panel">
          <div className="hero-panel-top">
            <div>
              <p className="hero-kicker">Priority queue</p>
              <h3>Low-stock items need attention first</h3>
            </div>
            <span className="badge">{summary.lowStockItems} flagged</span>
          </div>
          <p className="hero-copy">
            Use this view to catch products that can block packing or create manual stock corrections later in the day.
          </p>

          <div className="hero-metrics">
            <article className="hero-metric">
              <p className="kpi-label">Urgent lines</p>
              <p className="hero-metric-value">{urgentCount}</p>
              <p className="hero-metric-note">Already below buffer</p>
            </article>
            <article className="hero-metric">
              <p className="kpi-label">Healthy stock</p>
              <p className="hero-metric-value">{stockHealth}%</p>
              <p className="hero-metric-note">Across tracked SKUs</p>
            </article>
            <article className="hero-metric">
              <p className="kpi-label">Movement in last day</p>
              <p className="hero-metric-value">{summary.recentMovements24h}</p>
              <p className="hero-metric-note">Recent edits and scans</p>
            </article>
          </div>
        </section>

        <aside className="insight-stack">
          <article className="kpi-card kpi-warning">
            <p className="kpi-label">Low Stock</p>
            <p className="kpi-value">{summary.lowStockItems}</p>
          </article>

          <article className="kpi-card">
            <p className="kpi-label">Tracked SKUs</p>
            <p className="kpi-value">{summary.totalProducts}</p>
          </article>

          <article className="panel note-panel">
            <p className="metric-label">Shift note</p>
            <p className="note-copy">
              Check the flagged rows before adding new catalog entries. The quicker fix is usually a stock adjustment, not another SKU.
            </p>
          </article>
        </aside>
      </div>

      <div className="split-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Low-stock queue</h3>
            <Link className="text-link" to="/products">
              Open product list
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
              <p>No items have slipped below reorder level today.</p>
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Next actions</h3>
          </div>

          <div className="action-list">
            <Link className="action-item" to="/products">
              Review product details and restock levels
            </Link>
            <Link className="action-item" to="/movements">
              Log receiving or dispatch movement
            </Link>
            <Link className="action-item" to="/dashboard">
              Recheck the priority queue after updates
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
