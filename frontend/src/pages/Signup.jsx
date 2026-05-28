import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Signup() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleSignup = (e) => {

    e.preventDefault();

    // ✅ EMPTY CHECK
    if (
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    // ✅ PASSWORD MATCH
    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match ❌"
      );

      return;
    }

    // ✅ GET EXISTING USERS
    const existingUsers =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // ✅ CHECK EMAIL ALREADY EXISTS
    const alreadyExists =
      existingUsers.find(
        (user) =>
          user.email.toLowerCase() ===
          email.toLowerCase()
      );

    // ✅ IF EMAIL EXISTS
    if (alreadyExists) {

      alert(
        "Account already exists. Please login ✅"
      );

      navigate("/login");

      return;
    }

    // ✅ SAVE NEW USER
    const newUser = {

      email:
        email.toLowerCase(),

      password

    };

    existingUsers.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    // ✅ SUCCESS
    alert(
      "Account created successfully ✅"
    );

    // ✅ GO TO LOGIN
    navigate("/login");
  };

  return (

    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={handleSignup}
      >

        <h2>
          Create Account
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          required
        />

        {/* SIGNUP BUTTON */}
        <button type="submit">
          Signup
        </button>

        {/* LOGIN LINK */}
        <p>

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Signup;
