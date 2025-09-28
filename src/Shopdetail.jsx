import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from "axios";

function Shopdetail() {

  let params = useParams();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [side_products, setsideProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:3000/products/${params.id}`).then((response) => {
      setProduct(response.data)
    }).catch((error) => {
      console.log(error);
    })

    axios.get(`http://localhost:3000/products`).then((response) => {
      setsideProducts(response.data.products)
    }).catch((error) => {

    })

  }, [])

  useEffect(() => {
    axios.get("http://localhost:3000/categories-count")
      .then(res => setCategories(res.data))
      .catch(error => console.log(error));
  }, []);

  const formatDate = (reviewdate) => {
    const date = new Date(reviewdate);

    reviewdate = date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return reviewdate;
  }

  const increase = () => {
    if (quantity < product.stock) {
      let qty = quantity;
      qty = qty + 1;
      setQuantity(qty)
    } else {
      alert("Only " + product.stock + " in stock");
    }
  }

  const decrease = () => {
    if (quantity > 1) {
      let qty = quantity;
      qty = qty - 1;
      setQuantity(qty)
    }
  }

  const updateCart = () => {
    let id = product.id
    let title = product.title
    let price = product.price
    let qty = quantity
    let img = product.thumbnail_image
    let stock = product.stock
    let flag = 0

    let product_data = { 'id': id, 'title': title, 'price': price, 'quantity': qty, 'stock': stock, 'image': img }

    let cart_data = localStorage.getItem('cart_data') ? JSON.parse(localStorage.getItem('cart_data')) : []

    cart_data.map((item) => {
      if (item.id == id) {
        item.quantity = qty
        flag = 1
      }
    })

    if (flag == 0) {
      cart_data.push(product_data)
    }

    localStorage.setItem('cart_data', JSON.stringify(cart_data));

    window.location.href = "/cart"
  }

  return (
    <>
      <Header />
      {/* Single Product Start */}
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <a href="#">
                      <img
                        src={product.thumbnail_image}
                        className="img-fluid rounded"
                        alt="Image"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product.title}</h4>
                  <p className="mb-3">{product.category}</p>
                  <h5 className="fw-bold mb-3">{product.price}₹</h5>

                  <div className="d-flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <small
                        key={star}
                        className={product.rating >= star ? "fa fa-star text-secondary" : "fa fa-star"}
                      />
                    ))}
                    <small>({product.reviews?.length || 0})</small>
                  </div>

                  <p className="mb-4">
                    The generated Lorem Ipsum is therefore always free from
                    repetition injected humour, or non-characteristic words etc.
                  </p>
                  <p className="mb-4">
                    Susp endisse ultricies nisi vel quam suscipit. Sabertooth
                    peacock flounder; chain pickerel hatchetfish, pencilfish
                    snailfish
                  </p>
                  <div className="input-group quantity mb-5" style={{ width: 100 }}>
                    <div className="input-group-btn">
                      <button onClick={decrease} className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      value={quantity}
                    />
                    <div className="input-group-btn">
                      <button onClick={increase} className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                  <a href="#" onClick={updateCart} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                    cart
                  </a>
                </div>

                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3" id="productTab" role="tablist">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        id="nav-about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-about"
                        type="button"
                        role="tab"
                        aria-controls="nav-about"
                        aria-selected="true"
                      >
                        Description
                      </button>
                      <button
                        className="nav-link border-white border-bottom-0"
                        id="nav-reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-reviews"
                        type="button"
                        role="tab"
                        aria-controls="nav-reviews"
                        aria-selected="false"
                      >
                        Reviews
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5" id="productTabContent">
                    {/* Description Tab */}
                    <div
                      className="tab-pane fade show active"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <div className="px-2">
                        <div className="row g-4">
                          <div className="col-6">
                            <div className="row bg-light align-items-center text-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">1 kg</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Country of Origin</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Agro Farm</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Quality</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Organic</p>
                              </div>
                            </div>
                            <div className="row text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Check</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">Healthy</p>
                              </div>
                            </div>
                            <div className="row bg-light text-center align-items-center justify-content-center py-2">
                              <div className="col-6">
                                <p className="mb-0">Min Weight</p>
                              </div>
                              <div className="col-6">
                                <p className="mb-0">250 Kg</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reviews Tab */}
                    <div
                      className="tab-pane fade"
                      id="nav-reviews"
                      role="tabpanel"
                      aria-labelledby="nav-reviews-tab"
                    >
                      {/* Single Review */}
                      <div className="d-flex mb-4">
                        <div>
                          <p className="mb-2" style={{ fontSize: 14 }}>
                            24 September 2025
                          </p>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5>John Doe</h5>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-muted" />
                              <i className="fa fa-star text-muted" />
                            </div>
                          </div>
                          <p>Great product! Loved the quality and freshness.</p>
                        </div>
                      </div>
                      <div className="d-flex mb-4">
                        <div>
                          <p className="mb-2" style={{ fontSize: 14 }}>
                            22 September 2025
                          </p>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5>Jane Smith</h5>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-warning" />
                              <i className="fa fa-star text-muted" />
                            </div>
                          </div>
                          <p>Fresh and delicious. Will buy again!</p>
                        </div>
                      </div>
                      {/* Leave a Reply Form */}
                      <form className="mt-4">
                        <h4 className="mb-4 fw-bold">Leave a Reply</h4>
                        <div className="row g-4">
                          <div className="col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Your Name *"
                            />
                          </div>
                          <div className="col-lg-6">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Your Email *"
                            />
                          </div>
                          <div className="col-12">
                            <textarea
                              className="form-control"
                              rows={5}
                              placeholder="Your Review *"
                              defaultValue={""}
                            />
                          </div>
                          <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                            <div className="d-flex align-items-center">
                              <p className="mb-0 me-2">Please rate:</p>
                              <div className="d-flex">
                                <i className="fa fa-star text-muted" />
                                <i className="fa fa-star text-muted" />
                                <i className="fa fa-star text-muted" />
                                <i className="fa fa-star text-muted" />
                                <i className="fa fa-star text-muted" />
                              </div>
                            </div>
                            <button className="btn btn-primary rounded-pill px-4 py-2">
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-3">
              <div className="row g-4 fruite">
                <div className="col-lg-12">
                  <div className="input-group w-100 mx-auto d-flex mb-4">
                    <input
                      type="search"
                      className="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1"
                    />
                    <span id="search-icon-1" className="input-group-text p-3">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                  <div className="mb-4">
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
                </div>
                <div className="col-lg-12">
                  <h4 className="mb-4">Featured products</h4>

                  {
                    (side_products) ?

                      side_products.map((prod) => (

                        <div className="d-flex align-items-center justify-content-start">
                          <div
                            className="rounded me-4"
                            style={{ width: 100, height: 100 }}
                          >
                            <img
                              src={prod.thumbnail_image}
                              className="img-fluid rounded"
                              alt=""
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
                            <div className="d-flex mb-2">
                              <h5 className="fw-bold me-2">{prod.price}₹</h5>
                              <h5 className="text-danger text-decoration-line-through">
                                {prod.discountPercentage}₹
                              </h5>
                            </div>
                          </div>
                        </div>


                      ))
                      : ''
                  }

                </div>
              </div>
            </div>
          </div>
          <h1 className="fw-bold mb-0">Related products</h1>
          <div className="vesitable">
            <div className="owl-carousel vegetable-carousel justify-content-center">
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-6.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-1.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$4.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-3.png"
                    className="img-fluid w-100 rounded-top bg-light"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Banana</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-4.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Bell Papper</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-5.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Potatoes</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-6.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-5.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Potatoes</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary rounded position-relative vesitable-item">
                <div className="vesitable-img">
                  <img
                    src="img/vegetable-item-6.jpg"
                    className="img-fluid w-100 rounded-top"
                    alt=""
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  Vegetable
                </div>
                <div className="p-4 pb-0 rounded-bottom">
                  <h4>Parsely</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                    eiusmod te incididunt
                  </p>
                  <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold">$7.99 / kg</p>
                    <a
                      href="#"
                      className="btn border border-secondary rounded-pill px-3 py-1 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Add to
                      cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Single Product End */}
      <Footer />
    </>

  )
}

export default Shopdetail;