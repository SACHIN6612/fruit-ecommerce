import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

function Shop() {
  const [products, setProducts] = useState([]);
  const [sideProducts, setSideProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Track current page

  useEffect(() => {
    axios.get("http://localhost:3000/categories-count")
      .then(res => setCategories(res.data))
      .catch(error => console.log(error));
  }, []);

  // Fetch paginated products whenever currentPage or limit changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products?limit=${limit}&page=${currentPage + 1}`);
        setProducts(response.data.products || []);
        if (response.data.total !== undefined) {
          setTotalPages(Math.ceil(response.data.total / limit));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, limit]);

  // Fetch all products for sidebar (one-time)
  useEffect(() => {
    const fetchSideProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all-products");
        setSideProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching sidebar products:", error);
      }
    };

    fetchSideProducts();
  }, []);

  // Pagination handlers
  const pageChange = (page) => setCurrentPage(page);
  const goToPreviousPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const goToNextPage = () =>
    currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);

  return (
    <>
      <Header />
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              {/* Categories, Price, Additional Filters */}
              <div className="row g-4">
                <div className="col-lg-12">
                  <h4>Categories</h4>
                  <ul className="list-unstyled fruite-categorie">

                    {categories.map((cat) => (

                      <li>
                        <div className="d-flex justify-content-between fruite-name">
                          <a href="#">{cat.category_name}</a>
                          <span>({cat.total})</span>
                        </div>
                      </li>

                    ))}

                  </ul>
                </div>

                {/* Featured Products */}
                <div className="col-lg-12">
                  <h4 className="mb-3">Featured products</h4>
                  {sideProducts.length > 0 ? (
                    sideProducts.slice(0, 5).map((prod, index) => (
                      <div
                        key={prod.id || index}
                        className="d-flex align-items-center justify-content-start mb-3"
                      >
                        <div
                          className="rounded me-4"
                          style={{ width: 100, height: 100 }}
                        >
                          <img
                            src={prod.thumbnail_image}
                            className="img-fluid rounded"
                            alt="product-image"
                          />
                        </div>
                        <div>
                          <h6 className="mb-2">{prod.title}</h6>
                          <div className="d-flex mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <small
                                key={star}
                                className={prod.rating >= star ? "fa fa-star text-secondary" : "fa fa-star"}
                              />
                            ))}
                          </div>
                          
                          <p className="mb-0">₹{prod.price}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Loading featured products...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Products */}
            <div className="col-lg-9">
              <div className="row g-4 justify-content-center">
                {products.length > 0 ? (
                  products.map((prod, index) => (
                    <div key={prod.id || index} className="col-md-6 col-lg-6 col-xl-4">
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
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{prod.title}</h4>
                          <p>{prod.description}</p>
                          <div className="d-flex mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <small
                                key={star}
                                className={prod.rating >= star ? "fa fa-star text-secondary" : "fa fa-star"}
                              />
                            ))}
                          </div>
                          <div className="justify-content-between flex-lg-wrap">
                            <p className="text-dark fs-5 fw-bold mb-0">
                              ₹{prod.price} / kg
                            </p>
                            <a
                              href={"/product/" + prod.id}
                              className="btn border border-secondary rounded-pill px-3 mt-3 text-primary"
                            >
                              <i className="fa fa-shopping-bag me-2 text-primary" />
                              Add to cart
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="text-center">Loading products...</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="col-12">
                    <div className="pagination d-flex justify-content-center mt-5">
                      <button
                        className={`btn rounded me-2 ${currentPage === 0 ? "btn-secondary" : "btn-outline-primary"
                          }`}
                        onClick={goToPreviousPage}
                        disabled={currentPage === 0}
                      >
                        «
                      </button>

                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => pageChange(index)}
                          className={`btn rounded me-1 ${currentPage === index ? "btn-primary" : "btn-outline-primary"
                            }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        className={`btn rounded ms-2 ${currentPage === totalPages - 1
                            ? "btn-secondary"
                            : "btn-outline-primary"
                          }`}
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1}
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
