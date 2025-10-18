import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

function Testimonial() {
  return (
    <>
      <Header />
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

export default Testimonial;
