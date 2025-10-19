import Header from "./Header";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Shopdetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [allProducts, setAllProducts] = useState([]); // All products
  const [sideProducts, setSideProducts] = useState([]); // Filtered products
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch product & all products
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${params.id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:3000/products`)
      .then((response) => {
        setAllProducts(response.data.products);
        setSideProducts(response.data.products);
      })
      .catch((error) => console.log(error));
  }, [params.id]);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories-count")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  // Quantity handlers
  const increase = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
    else alert("Only " + product.stock + " in stock");
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Add to cart
  const updateCart = () => {
    const product_data = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      stock: product.stock,
      image: product.thumbnail_image,
    };

    const cart_data = JSON.parse(localStorage.getItem("cart_data")) || [];
    let exists = false;

    const updatedCart = cart_data.map((item) => {
      if (item.id === product.id) {
        exists = true;
        return { ...item, quantity };
      }
      return item;
    });

    if (!exists) updatedCart.push(product_data);

    localStorage.setItem("cart_data", JSON.stringify(updatedCart));

    // Notify Header about cart update
    window.dispatchEvent(new Event("storage"));

    navigate("/cart");
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = allProducts.filter((p) => p.category === category);
    setSideProducts(filtered);
  };

  // Related products: only current product's category, excluding itself
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-8 col-xl-9">
              {/* Product Images & Info */}
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <img
                      src={product.thumbnail_image}
                      className="img-fluid rounded"
                      alt={product.title}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product.title}</h4>
                  <p className="mb-3">{product.category}</p>
                  <h5 className="fw-bold mb-3">{product.price}₹</h5>

                  <div
                    className="input-group quantity mb-5"
                    style={{ width: 100 }}
                  >
                    <button
                      onClick={decrease}
                      className="btn btn-sm btn-minus rounded-circle bg-light border"
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <input
                      type="text"
                      className="form-control form-control-sm text-center border-0"
                      value={quantity}
                      readOnly
                    />
                    <button
                      onClick={increase}
                      className="btn btn-sm btn-plus rounded-circle bg-light border"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>

                  <button
                    onClick={updateCart}
                    className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <h3 className="fw-bold mb-4">Related Products</h3>
          <div className="row g-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((prod) => (
                <div key={prod.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="border border-primary rounded position-relative">
                    <img
                      src={prod.thumbnail_image}
                      className="img-fluid w-100 rounded-top"
                      alt={prod.title}
                    />
                    <div
                      className="text-white bg-primary px-3 py-1 rounded position-absolute"
                      style={{ top: 10, right: 10 }}
                    >
                      {prod.category_name}
                    </div>
                    <div className="p-3 rounded-bottom">
                      <h5>{prod.title}</h5>
                      <p className="text-dark fs-6 fw-bold">{prod.price}₹</p>
                      <button
                        onClick={() => navigate(`/shopdetail/${prod.id}`)}
                        className="btn border border-secondary rounded-pill px-3 py-1 mb-2 text-primary"
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shopdetail;
