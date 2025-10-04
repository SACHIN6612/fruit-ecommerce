import Header from './Header'
import Footer from './Footer'
import { useState, useEffect } from 'react';

function Checkout() {
  const [cartdata, SetCartData] = useState([]);
  const [subtotal, SetSubTotal] = useState(0);
  const [shipping, SetShipping] = useState(30);
  const [total, SetTotal] = useState(0);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    mobile: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let cart_data = JSON.parse(localStorage.getItem('cart_data')) || [];
    SetCartData(cart_data);

    let sub_total = 0;
    cart_data.forEach((item) => {
      sub_total += parseFloat(item.price) * parseFloat(item.quantity);
    });

    sub_total = sub_total.toFixed(2);
    let totalValue = parseFloat(sub_total) + parseFloat(shipping);

    SetSubTotal(sub_total);
    SetTotal(totalValue);
  }, [cartdata]);

  // placeorder form validation
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit Mobile number";
    }

    // ✅ Email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid Email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const PlaceOrder = () => {
    if (validateForm()) {
      const orderDetails = {
        customer: formData,
        items: cartdata,
        subtotal: subtotal,
        shipping: shipping,
        total: total
      };

      // Save order details in localStorage
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      localStorage.removeItem("cart_data");

      // Redirect to Thankyou page
      window.location.href = "/thankyou";
    } else {
      alert("Please fill all the details.");
      return;
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <h1 className="mb-4">Billing details</h1>
          <form>
            <div className="row g-5">
              <div className="col-md-12 col-lg-6 col-xl-7">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">First Name<sup>*</sup></label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-item w-100">
                      <label className="form-label my-3">Last Name<sup>*</sup></label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Company Name<sup>*</sup></label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  {errors.company && <p className="text-danger">{errors.company}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Address <sup>*</sup></label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <p className="text-danger">{errors.address}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Town/City<sup>*</sup></label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className="text-danger">{errors.city}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Country<sup>*</sup></label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && <p className="text-danger">{errors.country}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                  <input
                    type="text"
                    name="postcode"
                    className="form-control"
                    value={formData.postcode}
                    onChange={handleChange}
                  />
                  {errors.postcode && <p className="text-danger">{errors.postcode}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Mobile<sup>*</sup></label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
                </div>

                <div className="form-item">
                  <label className="form-label my-3">Email Address<sup>*</sup></label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                </div>
              </div>

              <div className="col-md-12 col-lg-6 col-xl-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>

                      {(cartdata) ? cartdata.map((item) => (

                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                className="img-fluid me-5 rounded-circle"
                                style={{ width: 80, height: 80 }}
                                alt=""
                              />
                            </div>
                          </th>
                          <td>
                            <p className="mb-0 mt-4">{item.title}</p>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">₹{item.price}</p>
                          </td>
                          <td>
                            <div
                              className="input-group quantity mt-4"
                              style={{ width: 100 }}
                            >
                              <input
                                type="text"
                                className="form-control form-control-sm text-center border-0"
                                value={item.quantity}
                              />
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 mt-4">₹{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</p>
                          </td>
                        </tr>


                      )) : 'No Cart Data'}

                    </tbody>
                  </table>

                  <div className="bg-light rounded">
                    <div className="p-4">
                      <h1 className="display-6 mb-4">
                        Checkout <span className="fw-normal">Total</span>
                      </h1>
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="mb-0 me-4">Subtotal:</h5>
                        <p className="mb-0">₹{subtotal}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-0 me-4">Shipping</h5>
                        <div className="">
                          <p className="mb-0">Flat rate: ₹{shipping}</p>
                        </div>
                      </div>
                      <p className="mb-0 text-end">Shipping to Ukraine.</p>
                    </div>
                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                      <h5 className="mb-0 ps-4 me-4">Total</h5>
                      <p className="mb-0 pe-4">₹{total.toFixed(2)}</p>
                    </div>
                  </div>

                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Transfer-1"
                        name="Transfer"
                        defaultValue="Transfer"
                      />
                      <label className="form-check-label" htmlFor="Transfer-1">
                        Direct Bank Transfer
                      </label>
                    </div>
                    <p className="text-start text-dark">
                      Make your payment directly into our bank account. Please use
                      your Order ID as the payment reference. Your order will not be
                      shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Payments-1"
                        name="Payments"
                        defaultValue="Payments"
                      />
                      <label className="form-check-label" htmlFor="Payments-1">
                        Check Payments
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Delivery-1"
                        name="Delivery"
                        defaultValue="Delivery"
                      />
                      <label className="form-check-label" htmlFor="Delivery-1">
                        Cash On Delivery
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                  <div className="col-12">
                    <div className="form-check text-start my-3">
                      <input
                        type="checkbox"
                        className="form-check-input bg-primary border-0"
                        id="Paypal-1"
                        name="Paypal"
                        defaultValue="Paypal"
                      />
                      <label className="form-check-label" htmlFor="Paypal-1">
                        Paypal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                  <button onClick={PlaceOrder}
                    type="button"
                    className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                  >
                    Place Order
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
