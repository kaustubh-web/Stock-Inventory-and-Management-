import { useCallback, useEffect, useState } from "react";
import { createMovement, getMovements, getProducts } from "../api";

const initialForm = {
  productId: "",
  type: "IN",
  quantity: 1,
  note: "",
};

export default function MovementsPage() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setError("");
      const [productData, movementData] = await Promise.all([
        getProducts(),
        getMovements(),
      ]);

      setProducts(productData);
      setMovements(movementData);

      if (productData.length > 0) {
        setForm((prev) => ({
          ...prev,
          productId: prev.productId || productData[0]._id,
        }));
      }
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await createMovement(form);
      setForm((prev) => ({ ...prev, quantity: 1, note: "" }));
      await loadData();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page">
      <div className="page-heading">
        <h2>Movements</h2>
        <p>Record stock inflow and outflow with traceable notes.</p>
      </div>

      <div className="split-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>Record Movement</h3>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <select name="productId" value={form.productId} onChange={handleChange} required>
              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.sku}) - Qty {item.quantity}
                </option>
              ))}
            </select>

            <select name="type" value={form.type} onChange={handleChange}>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>

            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />

            <input name="note" placeholder="Movement note" value={form.note} onChange={handleChange} />

            <button className="btn" type="submit" disabled={saving || products.length === 0}>
              {saving ? "Saving..." : "Submit Movement"}
            </button>
          </form>

          {error ? <p className="state-text state-error">{error}</p> : null}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Movement Stats</h3>
            <span className="badge">{movements.length} records</span>
          </div>

          <div className="metric-stack">
            <div>
              <p className="metric-label">IN Records</p>
              <p className="metric-value">{movements.filter((item) => item.type === "IN").length}</p>
            </div>
            <div>
              <p className="metric-label">OUT Records</p>
              <p className="metric-value">{movements.filter((item) => item.type === "OUT").length}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>Movement Ledger</h3>
        </div>

        {loading ? (
          <p className="state-text">Loading movements...</p>
        ) : movements.length === 0 ? (
          <div className="empty-block">
            <p>No movement entries yet. Record the first one above.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((item) => (
                  <tr key={item._id}>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>{item.product?.name || "-"}</td>
                    <td>{item.product?.sku || "-"}</td>
                    <td>{item.type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
