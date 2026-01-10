import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p className="price">₹{product.price}</p>
      <button className="cart-btn">Add to Cart</button>
    </div>
  );
}

export default ProductCard; 

