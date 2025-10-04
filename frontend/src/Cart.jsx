import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react'

function Cart() {

  const [cartdata, SetCartData] = useState([]);
  const [subtotal, SetSubTotal] = useState(0);
  const [shipping, SetShipping] = useState(30);
  const [total, SetTotal] = useState(0);

  useEffect(() => {
    let cart_data = JSON.parse(localStorage.getItem('cart_data') || '[]');
    SetCartData(cart_data)

    let sub_total = 0
    let total = 0

    {
      cart_data.map((item) => {
        sub_total = sub_total + parseFloat(item.price) * parseFloat(item.quantity)
      })
    }

    sub_total = sub_total.toFixed(2)

    total = parseFloat(sub_total) + parseFloat(shipping)

    SetSubTotal(sub_total)
    SetTotal(total)

  }, [cartdata])

  const deleteProduct = (id) => {
    let cart_data = JSON.parse(localStorage.getItem('cart_data'));

    // Remove the clicked item
    const updatedData = cart_data.filter(item => item.id !== id);

    // Save new data in localStorage
    localStorage.setItem('cart_data', JSON.stringify(updatedData));

    // Update state
    SetCartData(updatedData);
  };

  const increase = (id) => {
    let flag = 0

    cartdata.map((item) => {
      if (item.id == id) {
        item.quantity = parseInt(item.quantity) + 1

        if (item.quantity > item.stock) {
          alert("Only " + item.stock + " in Stock")
          flag = 1
        }
      }
    })

    if (flag == 0) {
      localStorage.setItem('cart_data', JSON.stringify(cartdata))
      SetCartData(updatedData)
    }
  }

  const decrease = (id) => {
    let flag = 0

    cartdata.map((item) => {
      if (item.id == id) {
        item.quantity = parseInt(item.quantity) - 1

        if (item.quantity > item.stock) {
          alert("Only " + item.stock + " in stock")
          flag = 1
        }
      }
    })

    if (flag == 0) {
      localStorage.setItem('cart_data', JSON.stringify(cartdata))
      SetCartData(updatedData)
    }
  }

  return (
    <>
      {/* Cart Page Start */}
      <Header />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
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
                        <div className="input-group-btn">
                          <button onClick={() => decrease(item.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                            <i className="fa fa-minus" />
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-center border-0"
                          value={item.quantity}
                        />
                        <div className="input-group-btn">
                          <button onClick={() => increase(item.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                            <i className="fa fa-plus" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">₹{(parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2)}</p>
                    </td>
                    <td>
                      <button onClick={() => deleteProduct(item.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                        <i className="fa fa-times text-danger" />
                      </button>
                    </td>
                  </tr>

                )) : 'No Cart Data'}

              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <input
              type="text"
              className="border-0 border-bottom rounded me-5 py-3 mb-4"
              placeholder="Coupon Code"
            />
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              type="button"
            >
              Apply Coupon
            </button>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">
                    Cart <span className="fw-normal">₹ {total}</span>
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
                <a href="/checkout" className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button">Proceed to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Page End */}
      <Footer />
    </>

  )
}

export default Cart;