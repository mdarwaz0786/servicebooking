import React from "react";

const PaymentMethod = () => {
  return (
    <fieldset className="booking-content">
      <div className="book-card">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center mb-2">
            <h6 className="fs-16 me-2 mb-2">Payment Method</h6>
          </div>
          <div className="d-flex align-items-center mb-2">
            <a
              href="#"
              className="btn btn-sm btn-secondary d-inline-flex align-items-center prev_btn mb-2"
            >
              <i className="ti ti-caret-left-filled me-1"></i>Back to Cart
            </a>
          </div>
        </div>

        <div className="row g-3">
          {/* Payment Types */}
          <div className="col-md-6">
            <h6 className="fs-13 mb-3">Payment Types</h6>

            {[
              { id: "payment1", name: "Stripe", img: "assets/img/icons/payment1.svg" },
              { id: "payment2", name: "Paypal", img: "assets/img/icons/payment2.svg" },
              { id: "payment3", name: "Razorpay", img: "assets/img/icons/razor-pay.svg" },
              { id: "payment4", name: "PaySolution", img: "assets/img/icons/pay-solution.svg" },
              { id: "payment5", name: "Square", img: "assets/img/icons/square.svg" },
            ].map((payment) => (
              <div className="payment-item d-flex align-items-center justify-content-between mb-2" key={payment.id}>
                <div className="form-check d-flex align-items-center ps-0">
                  <input
                    className="form-check-input ms-0 mt-0"
                    type="radio"
                    name="payment"
                    id={payment.id}
                  />
                  <label className="form-check-label ms-2" htmlFor={payment.id}>
                    {payment.name}
                  </label>
                </div>
                <div>
                  <img src={payment.img} alt={payment.name} />
                </div>
              </div>
            ))}
          </div>

          {/* Total & Payment Button */}
          <div className="col-md-6">
            <div className="card total-card">
              <div className="card-body p-3 d-flex justify-content-between flex-column">
                <div>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-medium">Lighting Services</h6>
                      <p className="fs-10">30 Min</p>
                    </div>
                    <h6 className="fs-12 fw-medium">$457</h6>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-medium">Outlets & Wiring</h6>
                      <p className="fs-10">30 Min</p>
                    </div>
                    <h6 className="fs-12 fw-medium">$200</h6>
                  </div>
                  <div className="mb-0 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-medium">Switches Changes</h6>
                      <p className="fs-10">30 Min</p>
                    </div>
                    <h6 className="fs-12 fw-medium">$100</h6>
                  </div>
                </div>

                {/* Totals */}
                <div>
                  <div className="total-wrap">
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">Sub Total</h6>
                      <p className="text-gray-9">$757</p>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Tax <span className="text-default fw-normal">(GST 5%)</span>
                      </h6>
                      <p className="text-gray-9">$60</p>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Discount <span className="text-default fw-normal">15%</span>
                      </h6>
                      <p className="text-gray-9">$757</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fs-14">Total</h6>
                      <h6 className="fs-14">$757</h6>
                    </div>
                  </div>

                  <a href="#" id="pay-btn" className="btn btn-light w-100 next_btn mt-3">
                    Pay $757
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default PaymentMethod;
