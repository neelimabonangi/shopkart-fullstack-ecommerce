import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <h1 className="hero-title">
          Men & Women <br />
          Shopping Collection
        </h1>

        <p>
          Discover the latest fashion trends at unbeatable prices.
          <br />
          Premium styles. Everyday comfort.
        </p>

        {/* ✅ SHOP NOW → OPEN PRODUCTS PAGE */}
        <button
          className="shop-now-btn"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default HeroBanner;















