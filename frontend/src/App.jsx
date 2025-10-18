import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // typing value
  const [searchQuery, setSearchQuery] = useState(""); // button click value

  // ✅ Category Filter Logic
  const categoryFilteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category_name === selectedCategory);

  // ✅ Search + Category Combined Filter
  const filteredProducts = categoryFilteredProducts.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Fetch Products
  useEffect(() => {
    axios
      .get("http://localhost:3000/all-products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  // ✅ Fetch Categories
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories-count")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  // ✅ Search Button Click
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm); // 👈 This line applies the filter
  };

  return (
    <>
      <Header />

      {/* Hero Start */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container-fluid py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
              <h1 className="mb-5 display-3 text-primary">
                Organic Veggies & Fruits Foods
              </h1>

              {/* ✅ Search Input and Button */}
              <form
                className="position-relative mx-auto"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                  type="text"
                  placeholder="Search for a product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                  style={{ top: 0, right: "25%" }}
                >
                  Search
                </button>
              </form>
            </div>

            <div className="col-md-12 col-lg-5">
              <div
                id="carouselId"
                className="carousel slide position-relative"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img
                      src="img/hero-img-1.png"
                      className="img-fluid w-100 h-100 bg-secondary rounded"
                      alt="First slide"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Fruits
                    </a>
                  </div>
                  <div className="carousel-item rounded">
                    <img
                      src="img/hero-img-2.jpg"
                      className="img-fluid w-100 h-100 rounded"
                      alt="Second slide"
                    />
                    <a href="#" className="btn px-4 py-2 text-white rounded">
                      Vegetables
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* Products Section */}
      <div className="container-fluid fruite">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <button
                      className="d-flex m-2 py-2 px-4 btn btn-outline-primary"
                      onClick={() => setSelectedCategory("All")}
                    >
                      All Products
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="d-flex m-2 py-2 px-4 btn btn-outline-primary"
                      onClick={() => setSelectedCategory("Fruits")}
                    >
                      Fruits
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="d-flex m-2 py-2 px-4 btn btn-outline-primary"
                      onClick={() => setSelectedCategory("Vegetables")}
                    >
                      Vegetables
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* ✅ Filtered Products */}
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <div
                        className="col-md-6 col-lg-4 col-xl-3"
                        key={prod.id}
                      >
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img
                              src={prod.thumbnail_image}
                              className="img-fluid w-100 rounded-top"
                              alt={prod.title}
                            />
                          </div>
                          <div
                            className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                            style={{ top: 10, left: 10 }}
                          >
                            {prod.category_name}
                          </div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom text-start">
                            <h4>{prod.title}</h4>
                            <p>{prod.description}</p>
                            <div className="d-flex mb-4">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <small
                                  key={star}
                                  className={
                                    prod.rating >= star
                                      ? "fa fa-star text-secondary"
                                      : "fa fa-star"
                                  }
                                />
                              ))}
                            </div>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">
                                ₹{prod.price} / kg
                              </p>
                              <a
                                href={"/product/" + prod.id}
                                className="btn border border-secondary rounded-pill px-3 text-primary"
                              >
                                <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-danger text-center mt-4">
                      No products found
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section Start*/}
      <div className="container-fluid banner bg-secondary mt-5">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
                <p className="fw-normal display-3 text-dark mb-4">
                  in Our Store
                </p>
                <p className="mb-4 text-dark">
                  The generated Lorem Ipsum is therefore always free from
                  repetition injected humour, or non-characteristic words etc.
                </p>
                <a
                  href="/shop"
                  className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
                >
                  BUY
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="img/baner-1.png"
                  className="img-fluid w-100 rounded"
                  alt=""
                />
                <div
                  className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                  style={{ width: 140, height: 140, top: 0, left: 0 }}
                >
                  <h1 style={{ fontSize: 100 }}>1</h1>
                  <div className="d-flex flex-column">
                    <span className="h2 mb-0">50$</span>
                    <span className="h4 text-muted mb-0">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section End */}
      {/* Bestsaler Product Start */}
      <div className="container-fluid">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
            <h1 className="display-4">Bestseller Products</h1>
            <p>
              Latin words, combined with a handful of model sentence structures,
              to generate Lorem Ipsum which looks reasonable.
            </p>
          </div>
          <div className="row g-4">
            {products
              ? products.map((prod) => (
                  <div className="col-lg-6 col-xl-4">
                    <div className="p-4 rounded bg-light">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <img
                            src={prod.thumbnail_image}
                            className="img-fluid rounded-circle w-100"
                            alt=""
                          />
                        </div>
                        <div className="col-6">
                          <a href="#" className="h5">
                            {prod.title}
                          </a>
                          <div className="d-flex my-3">
                            <small
                              className={
                                prod.rating >= 1
                                  ? "fa fa-star text-primary"
                                  : "fa fa-star"
                              }
                            />
                            <small
                              className={
                                prod.rating >= 2
                                  ? "fa fa-star text-primary"
                                  : "fa fa-star"
                              }
                            />
                            <small
                              className={
                                prod.rating >= 3
                                  ? "fa fa-star text-primary"
                                  : "fa fa-star"
                              }
                            />
                            <small
                              className={
                                prod.rating >= 4
                                  ? "fa fa-star text-primary"
                                  : "fa fa-star"
                              }
                            />
                            <small
                              className={
                                prod.rating >= 5
                                  ? "fa fa-star text-primary"
                                  : "fa fa-star"
                              }
                            />
                            <small>({prod.reviews})</small>
                          </div>
                          <h4 className="mb-3">{prod.price}₹</h4>
                          <a
                            href={"/product/" + prod.id}
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
      {/* Bestsaler Product End */}

      {/* Tastimonial Start */}
      <div className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">What Our Clients Say</h2>
          <div className="row g-4">
            {/* Testimonial 1 */}
            <div className="col-12 col-md-4">
              <div className="card testimonial-card p-4 h-100">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Client 1"
                    className="client-img mb-3"
                  />
                  <h5 className="fw-semibold mb-0">Sarah Johnson</h5>
                  <span className="text-muted small mb-2">
                    Marketing Manager
                  </span>
                  <div className="stars mb-3">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-half" />
                  </div>
                  <p className="text-dark small">
                    “They did a fantastic job! The team was very professional,
                    and my website looks amazing.”
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="col-12 col-md-4">
              <div className="card testimonial-card p-4 h-100">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Client 2"
                    className="client-img mb-3"
                  />
                  <h5 className="fw-semibold mb-0">Michael Smith</h5>
                  <span className="text-muted small mb-2">Web Developer</span>
                  <div className="stars mb-3">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star" />
                  </div>
                  <p className="text-dark small">
                    “The experience was smooth and pleasant. Excellent design
                    quality and quick support.”
                  </p>
                </div>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="col-12 col-md-4">
              <div className="card testimonial-card p-4 h-100">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Client 3"
                    className="client-img mb-3"
                  />
                  <h5 className="fw-semibold mb-0">Emma Wilson</h5>
                  <span className="text-muted small mb-2">Entrepreneur</span>
                  <div className="stars mb-3">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                  <p className="text-dark small">
                    “Highly recommended! They provided creative ideas and
                    delivered on time.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tastimonial End */}
      <Footer />
    </>
  );
}

export default App;
