import {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import "../styles/auth.css";

function Login() {

  // ✅ STATES
  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  // ✅ LOGIN
  const handleLogin =
    (e) => {

    e.preventDefault();

    // ✅ EMPTY CHECK
    if (
      !email ||
      !password
    ) {

      alert(
        "Please enter email and password"
      );

      return;
    }

    // ✅ USERS
    const users =

      JSON.parse(
        localStorage.getItem(
          "users"
        )
      ) || [];

    // ✅ ADMIN EMAILS
    const adminEmails = [

      "admin@shopkart.com",

      "neelima@admin.com"
    ];

    // ✅ ADMIN PASSWORD
    const adminPassword =
      "Admin@123";

    // ✅ ADMIN LOGIN
    if (

      adminEmails.includes(
        email.toLowerCase()
      )

      &&

      password ===
      adminPassword

    ) {

      // ✅ SAVE ADMIN
      localStorage.setItem(
        "isAdmin",
        "true"
      );

      // ✅ SAVE USER
      localStorage.setItem(

        "loggedInUser",

        JSON.stringify({

          email,

          role: "admin"
        })
      );

      alert(
        "Admin login successful ✅"
      );

      // ✅ REDIRECT
      window.location.href =
        "/";

      return;
    }

    // ✅ NORMAL USER LOGIN
    const existingUser =
      users.find(

        (user) =>

          user.email
            .toLowerCase()

            ===

          email
            .toLowerCase()

          &&

          user.password ===
          password
      );

    // ❌ INVALID
    if (!existingUser) {

      alert(
        "Invalid email or password ❌"
      );

      return;
    }

    // ✅ REMOVE ADMIN
    localStorage.removeItem(
      "isAdmin"
    );

    // ✅ SAVE USER
    localStorage.setItem(

      "loggedInUser",

      JSON.stringify(
        existingUser
      )
    );

    alert(
      "Login successful ✅"
    );

    // ✅ REDIRECT
    window.location.href =
      "/";
  };

  return (

    <div className="auth-container">

      <form
        className="auth-box"
        onSubmit={
          handleLogin
        }
      >

        {/* TITLE */}
        <h2>
          Login
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
        />

        {/* LOGIN BUTTON */}
        <button
          type="submit"
        >
          Login
        </button>

        {/* FORGOT PASSWORD */}
        <p
          style={{
            marginTop:
              "10px"
          }}
        >

          <span
            onClick={() => {

              const email =
                prompt(
                  "Enter your registered email"
                );

              if (!email)
                return;

              const users =

                JSON.parse(
                  localStorage.getItem(
                    "users"
                  )
                ) || [];

              const existingUser =
                users.find(
                  (user) =>

                    user.email
                      .toLowerCase()

                      ===

                    email
                      .toLowerCase()
                );

              if (
                !existingUser
              ) {

                alert(
                  "No account found ❌"
                );

                return;
              }

              alert(

                `Your password is: ${existingUser.password}`
              );

            }}

            style={{
              color:
                "#2874f0",

              cursor:
                "pointer",

              fontWeight:
                "bold"
            }}
          >
            Forgot Password?
          </span>

        </p>

        {/* SIGNUP */}
        <p>

          New to ShopKart?{" "}

          <Link to="/signup">
            Create an account
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;





