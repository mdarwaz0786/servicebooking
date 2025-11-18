import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../../components/Cart/CartItem";
import { handlePayment } from "../../components/Payment/Razorpay";
import PaymentModeModal from "../../components/Modal/PaymentModeModal ";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const { modals, toggleModal } = useContext(AppContext);

   const { Urls,
     postData,
     steps,
    toggleStep,
     cartAmount,
     PriceFormat,
     bookingAddress,
     bookingDate,
     bookingTime,
     setbookingData,
     setbookingItems, 
     setbookingAmount,
     setcartAmount,
     setcartItems,
     toast
     } = useContext(AppContext);

     const [paymentMode, setpaymentMode] = useState('online')
     const [paymentModeTemp, setpaymentModeTemp] = useState('')


   const handleBooking = async () => {

   

      try {
        const response = await postData({
          addressId:bookingAddress,
          scheduleType:2,
          scheduleDate:bookingDate,
          scheduleTime:bookingTime,
          paymentMode:paymentMode,
          paymentBy:'',
          isCouponUsed:0,
        }, Urls.createBooking, "POST",0,1);
        if (response.success) {

          
          setbookingData(response.data.booking)
          setbookingItems(response.data.items)
          setbookingAmount(response.data.amountData)
          toggleStep('payment', false);
          setcartItems([]);
          setcartAmount([]);
          let success;
          if(paymentMode=='online')
          {
            success = await handlePayment({
              pId: response.data.booking._id,
              type: "booking",
              createUrl: Urls.createTransaction,
              verifyUrl: Urls.verifyTransaction,
              toast: toast
            });
          }
          else{
            success = true;
          }
          
          
          if (success) {
            // toggleStep('confirmation', true);   // ✅ move forward
            toggleStep('payment', false);
            navigate("/user/booking/"+response.data.booking._id);
          }
          else{
            navigate("/");
          }
          
        } 
      } catch (error) { 
        navigate("/");
        console.error("Cart API Error:", error);
      }
   }


   const handlePaymentSelect = (mode) => {
    console.log("Selected Payment Mode:", mode);
    setpaymentMode(mode);
    setpaymentModeTemp(mode);
    toggleModal('paymentModeModal',false)
  };


     const handleNext = () => {
        toggleStep('confirmation',false)
        toggleStep('datetime',true)
      }

      const handlePre = () => {
        toggleStep('payment',false)
        toggleStep('datetime',true)
      }
  return (
    <fieldset className={`booking-content ${steps.payment ? "d-flex" : "d-none"}`}>
      <div className="book-card">
        {/* Title */}
        <div className="d-flex align-items-center justify-content-between flex-wrap booking-title">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-success">Transaction Summary</h5>
          </div>
          <div className="d-flex align-items-center mb-2">

            <Link className="btn btn-sm btn-success d-inline-flex align-items-center prev_btn mb-2 me-2"
            onClick={() => toggleModal("paymentModeModal", true)}
            >
              <i className="fa fa-money-bill-alt me-1"></i>
              {paymentModeTemp === 'online'
                ? 'Online'
                : paymentModeTemp === 'cod'
                ? 'Cash'
                : 'Payment Mode'}
            </Link>


            <Link
              onClick={handlePre}
              className="btn btn-sm btn-success d-inline-flex align-items-center prev_btn mb-2"
            >
              <i className="ti ti-caret-left-filled me-1"></i>Back to Time Slot
            </Link>
          </div>
        </div>

        <div className="row g-3">

          {/* Total & Payment Button */}
          <div className="col-md-12">
            <div className="card total-card">
              <div className="card-body p-3 d-flex flex-column">
                <div>
                  <CartItem/>
                </div>

                {/* Totals */}
                <div>
                  <div className="total-wrap">
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">Item Value</h6>
                      <p className="text-gray-9">
                        <span className="old-price text-muted text-decoration-line-through me-2">
                          {PriceFormat(cartAmount.mrpAmount)}
                        </span>
                        {PriceFormat(cartAmount.amount)}
                      </p>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Taxes & fee  <span className="text-default fw-normal">({cartAmount.gstPercent})</span>
                      </h6>
                      <p className="text-gray-9">{PriceFormat(cartAmount.gstAmount)}</p>
                    </div>
                    {/* <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Discount <span className="text-default fw-normal"></span>
                      </h6>
                      <p className="text-gray-9">-{PriceFormat(cartAmount.discountAmount)}</p>
                    </div> */}
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fs-14">Grand Total</h6>
                      <h6 className="fs-14">{PriceFormat(cartAmount.payableAmount)}</h6>
                    </div>
                  </div>

                  <Link  className="btn btn-light w-100 next_btn mt-3"
                  onClick={handleBooking}
                  >
                    {(paymentMode=='online')
                    ?
                    (
                      <>Pay Now {PriceFormat(cartAmount.payableAmount)}</>
                    )
                    :
                    (
                      <>Book Now </>
                    )
                    }
                    
                    
                  </Link>
                  
                  <h5 className="mt-2 fs-15">Cancellation Policy (Timing & Charges)</h5>
                  <p > Free cancellations if done more than 24 hrs before the service or if a professional isn’t assigned. A fee will be charged otherwise.</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModeModal onSelect={handlePaymentSelect} />
    </fieldset>
  );
};

export default PaymentMethod;
