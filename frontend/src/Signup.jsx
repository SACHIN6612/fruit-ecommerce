import Footer from "./Footer";
import Header from "./Header";

function Signup() {
  return (
    <>
      <Header />
      {/* Signup Form Section */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
        <div
          className="card shadow p-4"
          style={{ maxWidth: 420, width: "100%" }}
        >
          <h3 className="text-center mb-4 text-primary">Create an Account</h3>
          <form>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Enter your full name"
                required=""
              />
            </div>
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
            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Enter your phone number"
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
            {/* Confirm Password */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re-enter your password"
                required=""
              />
            </div>
            {/* Terms Checkbox */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                required=""
              />
              <label className="form-check-label" htmlFor="terms">
                I agree to the <a href="#">terms &amp; conditions</a>
              </label>
            </div>
            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none text-primary">
              Login here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
