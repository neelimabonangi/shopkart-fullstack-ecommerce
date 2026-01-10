// src/components/Header.jsx
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <h2 className="logo">FlipKart</h2>
      <input className="search" placeholder="Search for products" />
      <div className="actions">
        <button>Login</button>
        <button>Cart</button>
      </div>
    </div>
  );
}

export default Header;
