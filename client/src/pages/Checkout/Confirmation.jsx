import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Confirmation = () => {
   const { steps,toggleStep, bookingData, bookingAmount, bookingItems, formatDateTime, PriceFormat } = useContext(AppContext);
  return (
    <fieldset className={`booking-content ${steps.confirmation ? "d-flex" : "d-none"}`}>
      <div className="book-card">
        <h6 className="fs-16 me-2 mb-3">Payment Method</h6>

        <div className="card">
          <div className="card-body">
            <h6 className="fs-14 fw-medium mb-3">
              Your Booking is Successful on {formatDateTime(bookingData.createdAt)}
              {/* Sun 16 July 2024 at 5:00pm */}
            </h6>

            <div className="card shadow-none mb-0">
              <div className="card-body p-3">
                {/* Booking Info */}
                
                {bookingItems.map((value, index)=>
                
                  <div className="d-flex align-items-center justify-content-between flex-wrap p-2 bg-light-300 rounded mb-3">
                    <div className="d-flex align-items-center pb-2">
                      <span className="avatar avatar-xl flex-shrink-0">
                        <img src="/assets/img/services/addservice-05.jpg" alt="img" />
                      </span>
                      <div className="ms-2">
                        <h6 className="mb-1">{value.name}</h6>
                        <p>
                          Booking ref. <span className="text-primary">#{bookingData.bookingId}</span>
                        </p>
                      </div>
                    </div>
                    <span className="badge badge-success">
                      <i className="ti ti-circle-check-filled me-1"></i>Confirmed
                    </span>
                  </div>
                )}


                {/* Services */}
                {bookingItems.map((value, index)=>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="fw-medium">{value.name}</h6>
                      <p className="fs-10">
                        {/* 30 Min */}
                        </p>
                    </div>
                    <h6 className="fs-12 fw-medium">{PriceFormat(value.salePrice)}</h6>
                  </div>
                )}

                

                {/* Totals */}
                <div className="border-top pt-2">
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <h6 className="fw-medium">Sub Total</h6>
                    <p>{PriceFormat(bookingAmount.amount)}</p>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <h6 className="fw-medium">GST({bookingAmount.gstPercent})</h6>
                    <p>{PriceFormat(bookingAmount.gstAmount)}</p>
                  </div>
                  
                </div>
                <div className="border-top pt-2 d-flex align-items-center justify-content-between">
                  <h6 className="fs-14">Total</h6>
                  <h6 className="fs-14">{PriceFormat(bookingAmount.payableAmount)}</h6>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex align-items-center justify-content-center flex-wrap">
              
              <Link
                to={'/'}
                className="btn btn-sm btn-primary d-inline-flex align-items-center mt-3"
              >
                <i className="ti ti-circle-plus me-1"></i>Start New Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default Confirmation;
