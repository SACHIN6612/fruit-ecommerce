import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [keyword, setKeyword] = useState("");
  const [cartCount, setCartCount] = useState(0); // ✅ cart count state
  const navigate = useNavigate();

  // ✅ Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed !== "") {
      navigate(`/shop?search=${encodeURIComponent(trimmed)}`);
      const modal = document.getElementById("searchModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modal);
      if (modalInstance) modalInstance.hide();
    }
  };

  // ✅ Fetch Cart Count from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(storedCart.length);

    // Optional: Listen to changes from other components (if they update cart)
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartCount(updatedCart.length);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Navbar start */}
      <div className="container-fluid fixed-top">
        <div className="container-fluid topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary" />
                <a href="#" className="text-white">
                  123 Street, New York
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary" />
                <a href="#" className="text-white">
                  Email@Example.com
                </a>
              </small>
            </div>
            <div className="top-link pe-2">
              <a href="#" className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </a>
              <a href="#" className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </a>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="container-fluid px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl mt-3">
            <a href="/" className="navbar-brand">
              <h1 className="text-primary display-6">Fruitables</h1>
            </a>

            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>

            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <a href="/" className="nav-item nav-link active">
                  Home
                </a>
                <a href="/shop" className="nav-item nav-link">
                  Shop
                </a>
                <a href="/shopdetail" className="nav-item nav-link">
                  Shop Detail
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <a href="/cart" className="dropdown-item">
                      Cart
                    </a>
                    <a href="/checkout" className="dropdown-item">
                      Checkout
                    </a>
                    <a href="/testimonial" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="/404" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div>
                <a href="/contact" className="nav-item nav-link">
                  Contact
                </a>
              </div>

              {/* Right icons */}
              <div className="d-flex m-3 me-0">
                {/* 🔍 Search Button */}
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary" />
                </button>

                {/* 🛒 Cart Button with Live Count */}
                <a href="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x text-primary" />
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1 fw-bold"
                    style={{
                      top: "-5px",
                      left: 15,
                      height: 22,
                      minWidth: 22,
                      fontSize: "12px",
                    }}
                  >
                    {cartCount}
                  </span>
                </a>

                <a href="/login" className="my-auto">
                  <i className="fas fa-user fa-2x text-primary" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* 🔍 Modal Search */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title">Search by keyword</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex align-items-center">
              <form
                onSubmit={handleSearch}
                className="input-group w-75 mx-auto d-flex"
              >
                <input
                  type="search"
                  className="form-control p-3"
                  placeholder="Enter product name..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  id="search-icon-1"
                  className="input-group-text p-3"
                >
                  <i className="fa fa-search" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
