import Header from "./Header";
import Footer from "./Footer";

function Login() {
    return(
        <>
        <Header />
  {/* Login Section */}
  <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
    <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
      <div className="text-center mb-4">
        <i
          className="bi bi-person-circle text-primary"
          style={{ fontSize: "3rem" }}
        />
        <h3 className="mt-2 text-primary">Login</h3>
      </div>
      <form>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            required=""
          />
        </div>
        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            required=""
          />
        </div>
        {/* Remember Me & Forgot Password */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
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
          Don’t have an account?
          <a href="/signup" className="text-decoration-none text-primary">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  </div>
  <Footer />
</>

    )
}

export default Login;