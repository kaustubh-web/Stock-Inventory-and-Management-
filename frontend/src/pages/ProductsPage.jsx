import { useEffect, useState } from "react";
import { createProduct, getProducts } from "../api";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  quantity: 0,
  reorderLevel: 10,
  unitPrice: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setError("");
      const response = await getProducts();
      setProducts(response);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["quantity", "reorderLevel", "unitPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      await createProduct(form);
      setForm(initialForm);
      await loadProducts();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page">
      <div className="page-heading">
        <h2>Products</h2>
        <p>Maintain the inventory catalog with operational fields.</p>
      </div>

      <div className="split-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>New Product</h3>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input name="name" placeholder="Product name" value={form.name} onChange={handleChange} required />
            <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} required />
            <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
            <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} />
            <input
              name="reorderLevel"
              type="number"
              min="0"
              value={form.reorderLevel}
              onChange={handleChange}
            />
            <input name="unitPrice" type="number" min="0" value={form.unitPrice} onChange={handleChange} />
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Product"}
            </button>
          </form>

          {error ? <p className="state-text state-error">{error}</p> : null}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>Catalog Overview</h3>
            <span className="badge">{products.length} items</span>
          </div>

          <div className="metric-stack">
            <div>
              <p className="metric-label">Tracked SKUs</p>
              <p className="metric-value">{products.length}</p>
            </div>
            <div>
              <p className="metric-label">Low Stock SKUs</p>
              <p className="metric-value">
                {products.filter((item) => item.quantity <= item.reorderLevel).length}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>Product Table</h3>
        </div>

        {loading ? (
          <p className="state-text">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="empty-block">
            <p>No products yet. Add the first product from the form above.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Reorder</th>
                  <th>Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.category || "-"}</td>
                    <td>{item.quantity}</td>
                    <td>{item.reorderLevel}</td>
                    <td>{item.unitPrice}</td>
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
