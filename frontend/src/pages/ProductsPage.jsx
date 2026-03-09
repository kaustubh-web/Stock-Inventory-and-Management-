import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../api";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  quantity: 0,
  reorderLevel: 5,
  unitPrice: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["quantity", "reorderLevel", "unitPrice"].includes(name)
        ? Number(value)
        : value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createProduct(form);
      setForm(initialForm);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page">
      <div className="page-heading">
        <h2>Products</h2>
        <p>Manage catalog records and stock thresholds.</p>
      </div>

      <section className="panel">
        <div className="panel-header">
          <h3>Add Product</h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
            <input name="sku" placeholder="SKU" value={form.sku} onChange={onChange} required />
            <input name="category" placeholder="Category" value={form.category} onChange={onChange} />
            <input name="quantity" type="number" value={form.quantity} onChange={onChange} min="0" />
            <input name="reorderLevel" type="number" value={form.reorderLevel} onChange={onChange} min="0" />
            <input name="unitPrice" type="number" value={form.unitPrice} onChange={onChange} min="0" />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </section>

      {loading && <p className="state-text">Loading products...</p>}
      {error && <p className="state-text state-error">{error}</p>}

      {!loading && (
        <section className="panel">
          <div className="panel-header">
            <h3>Product List</h3>
            <span className="badge">{products.length} items</span>
          </div>

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
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.sku}</td>
                    <td>{p.category}</td>
                    <td>{p.quantity}</td>
                    <td>{p.reorderLevel}</td>
                    <td>{p.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}
