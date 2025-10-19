import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Validate inputs
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        setMessage(res.data.message);

        // Save token if login successful
        if (res.data.token) {
          if (formData.remember) {
            localStorage.setItem("token", res.data.token);
          } else {
            sessionStorage.setItem("token", res.data.token);
          }
        }

        alert("Login Successful!");
        window.location.href = "/"; // redirect to homepage
      } catch (err) {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Server error, please try again later.");
        }
      }
    }
  };

  return (
    <>
      <Header />
      {/* Login Section */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
        <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
          <div className="text-center mb-4">
            <i className="bi bi-person-circle text-primary" style={{ fontSize: "3rem" }} />
            <h3 className="mt-2 text-primary">Login</h3>
          </div>

          {message && (
            <div className="alert alert-info text-center py-2">{message}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none text-primary small">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center mb-0">
              Don’t have an account?{" "}
              <a href="/signup" className="text-decoration-none text-primary">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
