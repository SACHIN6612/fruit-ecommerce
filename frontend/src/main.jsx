import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App.jsx'
import Contact from './Contact.jsx'
import Shop from './Shop.jsx'
import Shopdetail from './Shopdetail.jsx'
import Cart from './Cart.jsx'
import Checkout from './Checkout.jsx'
import Testimonial from './Testimonial.jsx'
import Page404 from './Page404.jsx'
import Employees from './Employees.jsx'
import ThankYou from "./Thankyoupage.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="contact" element={<Contact />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Shopdetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="404" element={<Page404 />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>,
)
