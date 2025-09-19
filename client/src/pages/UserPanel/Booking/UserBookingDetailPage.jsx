import { useContext, useEffect, useState } from "react";
import MyServiceListCard from "../../../components/Service/MyServiceListCard";
import { AppContext } from "../../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const UserBookingDetailPage = () => {
    const { bookingId } = useParams();
  const { Urls, postData, formatDateTime, PriceFormat } = useContext(AppContext);
  const [data, setdata] = useState([]);
  const [items, setitems] = useState([]);
  const fetchData = async () => {
      try { 
      const response = await postData({}, Urls.myBookingDetail+'/'+bookingId, "GET", 0, 1);
      
          setdata(response.data.booking?response.data.booking:[]);
          setitems(response.data.items?response.data.items:[]);
      
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }

  
  useEffect(() => {  
  fetchData(); 
  }, []);  

  return (
    <div className="row justify-content-center">
  <div className="col-lg-10 mx-auto">
    
    <div className="row booking-details">
      <div className="col-md-4">
        <div>
          <h4 className="mb-2 fs-19">Booking ID: {data.bookingId}</h4>
          <p className="fs-12">
            <i className="feather-calendar me-1" /> {formatDateTime(data.createdAt)}
          </p>
        </div>
      </div>
      <div className="col-md-8">
        <div className="d-flex gap-3 justify-content-end">
          {/* <Link
            to="javascript:void(0);"
            className="btn btn-light d-flex align-items-center justify-content-center"
          >
            <i className="ti ti-current-location me-1" />
            LiveTrack
          </Link> */}
          <Link
            to="invoice.html"
            className="btn btn-light d-flex align-items-center justify-content-center"
          >
            <i className="ti ti-file-text me-1" />
            Invoice
          </Link>
          {/* <Link
            to="javascript:void(0);"
            className="btn btn-light d-flex align-items-center justify-content-center"
          >
            <i className="ti ti-printer me-1" />
            Print
          </Link> */}
        </div>
      </div>
    </div>
    {/* Slot Booked */}
    <div className="slot-box mt-3">
      <div className="row">
        <div className="col-md-3">
          <div className="slot-booked">
            <h6>Booked Slot</h6>
            <ul>
              <li className="fs-12 d-flex align-items-center mb-2">
                <i className="feather-calendar me-1" /> {(data.scheduleDate)}
              </li>
              <li className="fs-12 d-flex align-items-center">
                <i className="feather-clock  me-1" /> {data.scheduleTime}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="slot-user">
            <h6>Services Provider</h6>
            <div className="slot-chat">
              <div className="slot-user-img d-flex align-items-center">
                <img
                  className="avatar rounded-circle  me-2"
                  src="assets/img/profiles/avatar-31.jpg"
                  alt="image"
                />
                <div className="slot-user-info">
                  <p className="mb-1 fs-12">John Doe</p>
                  <p className="mb-0 fs-12">john@example.com</p>
                </div>
              </div>
              <div className="chat-item d-flex align-items-center">
                <div className="slot-user-info">
                  <p className="mb-0 fs-12">+1 888 888 8888</p>
                  <p className="mb-0 fs-12">Montana, USA</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="slot-action">
            <h6>Booking Status</h6>
            {/* <span className="badge badge-success-100 p-2 me-3">Completed</span> */}

            <span className="badge badge-skyblue p-2">Pending</span>
          </div>
        </div>
      </div>
    </div>
    {/* /Slot Booked */}
    <div className="payment-summary">
      <div className="row">
        {/* Service Location */}
        <div className="col-md-6 service-location">
          <h6 className="order-title">
            Service Location &amp; Contact Details
          </h6>
          <div className="slot-address">
            <ul>
              <li>
                <span>
                  <i className=" ti ti-map-pin" />
                </span>
                <div>
                  <h6>Address</h6>
                  <p>{data?.address?.houseNumber}, {data?.address?.landmark}</p>
                </div>
              </li>
              
              <li>
                <span>
                  <i className="ti ti-phone" />
                </span>
                <div>
                  <h6>Phone</h6>
                  <p>{data?.user?.mobile}</p>
                </div>
              </li>
            </ul>
          </div>
          {/* <div className="slot-pay">
            <p> Payment</p>
            <span className="fs-14">
              Visa **** **** **** **56{" "}
              <img src="assets/img/icons/visa.svg" alt="Img" />
            </span>
          </div> */}
        </div>
        {/* /Service Location */}
        {/* Order Summary */}
        <div className="col-md-6 order-summary">
          <h6 className="order-title">Order Summary</h6>
          <div className="ord-summary">
            <>
                {items.map((value, index)=>(
                    <div className="order-amt" key={index}>
                    <div className="order-info">
                        <div className="order-img">
                        <img src="/assets/img/providers/provider-26.jpg" alt="img" />
                        </div>
                        <div className="order-profile">
                        <h6>{value?.service?.name}</h6>
                        </div>
                    </div>
                    <h5>{PriceFormat(value.salePrice*value.quantity)}</h5>
                    </div>
                ))}
            </>

            <ul>
              <li>
                Sub Total <span className="ord-amt">{PriceFormat(data.amount)}</span>
              </li>
              {/* <li>
                <p className="ord-code mb-0">
                  {" "}
                  Discount{" "}
                  <span className=" ms-2 p-2 badge badge-info-transparent">
                    NEW 2024
                  </span>
                </p>{" "}
                <span className="ord-amt">-$11.00</span>
              </li> */}
              <li>
                GST @ {data.gstPercent} <span className="ord-amt">{PriceFormat(data.gstAmount)}</span>
              </li>
              <li className="ord-total mb-0">
                Total <span className="ord-amt">{PriceFormat(data.payableAmount)}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* /Order Summary */}
        <div className="row booking d-none">
          {/* Booking History */}
          <div className="col-md-6">
            <h6 className="order-title">Booking History</h6>
            <div className="book-history">
              <ul>
                <li>
                  <h6>Booking</h6>
                  <p>
                    <i className="ti ti-calendar me-1" /> September 5, 2023
                  </p>
                </li>
                <li>
                  <h6>Provider Accept</h6>
                  <p>
                    <i className="ti ti-calendar me-1" /> September 5, 2023
                  </p>
                </li>
                <li>
                  <h6>Completed on</h6>
                  <p>
                    <i className="ti ti-calendar me-1" /> September 5, 2023
                  </p>
                </li>
              </ul>
            </div>
          </div>
          {/* /Booking History */}
          {/* Reviews */}
          <div className="col-md-6">
            <div className="order-reviews">
              <div className="row align-items-center mb-4">
                <div className="col-5">
                  <h6 className="order-title">Reviews</h6>
                </div>
                <div className="col-7 text-end d-flex justify-content-end">
                  <Link
                    to="javascript:void(0);"
                    className="btn btn-sm d-flex align-items-center btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#add-review"
                  >
                    <i className="feather-plus-circle me-2" />
                    Add Review
                  </Link>
                </div>
              </div>
              <ul>
                <li>
                  <div className="order-comment">
                    <div className="rating">
                      <i className="ti ti-star-filled text-warning" />
                      <i className="ti ti-star-filled text-warning" />
                      <i className="ti ti-star-filled text-warning" />
                      <i className="ti ti-star-filled text-warning" />
                      <i className="ti ti-star-filled text-warning" />
                    </div>
                    <h6>A wonderful experience was all the help...</h6>
                    <p>
                      <i className="fa-solid fa-calendar-days me-1" /> September
                      5, 2023
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* /Reviews */}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default UserBookingDetailPage;