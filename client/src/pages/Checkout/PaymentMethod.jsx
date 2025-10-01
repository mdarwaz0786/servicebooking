import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../../components/Cart/CartItem";
import { handlePayment } from "../../components/Payment/Razorpay";

const PaymentMethod = () => {
  const navigate = useNavigate();

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


   const handleBooking = async () => {
      try {
        const response = await postData({
          addressId:bookingAddress,
          scheduleType:2,
          scheduleDate:bookingDate,
          scheduleTime:bookingTime,
          paymentMode:"online",
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
          
          const success = await handlePayment({
            pId: response.data.booking._id,
            type: "booking",
            createUrl: Urls.createTransaction,
            verifyUrl: Urls.verifyTransaction,
            toast: toast
          });


          if (success) {
            toggleStep('confirmation', true);   // ✅ move forward
            toggleStep('payment', false);
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
            <h5 className="fw-bold text-success">Payment Method</h5>
          </div>
          <div className="d-flex align-items-center mb-2">
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
              <div className="card-body p-3 d-flex justify-content-between flex-column">
                <div>
                  <CartItem/>
                </div>

                {/* Totals */}
                <div>
                  <div className="total-wrap">
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">Sub Total</h6>
                      <p className="text-gray-9">{PriceFormat(cartAmount.amount)}</p>
                    </div>
                    {/* <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Tax <span className="text-default fw-normal">(GST 5%)</span>
                      </h6>
                      <p className="text-gray-9">$60</p>
                    </div> */}
                    {/* <div className="mb-2 d-flex align-items-center justify-content-between">
                      <h6 className="fw-medium">
                        Discount <span className="text-default fw-normal">15%</span>
                      </h6>
                      <p className="text-gray-9">$757</p>
                    </div> */}
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fs-14">Total</h6>
                      <h6 className="fs-14">{PriceFormat(cartAmount.payableAmount)}</h6>
                    </div>
                  </div>

                  <Link  className="btn btn-light w-100 next_btn mt-3"
                  onClick={handleBooking}
                  >
                    Pay {PriceFormat(cartAmount.payableAmount)}
                    
                  </Link>
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
