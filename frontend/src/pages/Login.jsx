import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // 🔐 FRONTEND-ONLY AUTH LOGIC

    // ✅ MULTIPLE ADMIN EMAILS
    const adminEmails = [
      "admin@shopkart.com",
      "neelima@admin.com"
    ];

    const adminPassword = "Admin@123";

    // ✅ ADMIN LOGIN
    if (adminEmails.includes(email) && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      alert("Admin login successful");

      // 🔥 FORCE PAGE REFRESH so Navbar updates
      window.location.href = "/admin";
      return;
    }

    // ✅ NORMAL USER LOGIN
    localStorage.removeItem("isAdmin");
    alert("Login successful");

    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          New to ShopKart?{" "}
          <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;






