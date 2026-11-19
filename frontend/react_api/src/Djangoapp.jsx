import { useEffect,useState } from "react";
import axios from "axios";
const API_URL="http://127.0.0.1:8000/api/products/";
export function Djangoapp() {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);

      // This example expects DRF to return a JSON array.
      // For paginated DRF output, use response.data.results instead.
      const data = response.data;
      setProducts(Array.isArray(data) ? data : data.results ?? []);
    } catch (err) {
      console.error("Unable to fetch products:", err);
      setError(
        "Could not load products. Check that Django is running and the API URL is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <p className="eyebrow">DJANGO REST FRAMEWORK + REACT</p>
          <h1>Product Management</h1>
          <p className="subtitle">Products loaded from your Django API</p>
        </div>
        <button className="refresh-btn" onClick={fetchProducts} disabled={loading}>
          {loading ? "Loading..." : "Refresh products"}
        </button>
      </header>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p className="message">Loading products...</p>
      ) : !error ? (
        <section className="table-card">
          <div className="table-heading">
            <h2>Product list</h2>
            <span>{products.length} product(s)</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td className="product-name">{product.name}</td>
                      <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                      <td>{product.qty}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </main>
  );
}

