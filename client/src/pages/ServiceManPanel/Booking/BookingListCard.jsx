import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";


const BookingListCard = () => {
    const { PriceFormat, myserviceListData, formatDateTime } = useContext(AppContext);
  return ( 
      <>  
      {myserviceListData.map((value, index)=>(

      
        <div className="card shadow-none booking-list" key={index}>
            <div className="card-body d-md-flex align-items-center">
                <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
                    <div className="booking-img me-sm-3 mb-3 mb-sm-0">
                    <Link to="booking-details.html" className="avatar">
                        <img src="assets/img/services/service-08.jpg" alt="User Image" />
                    </Link>
                    </div>
                    <div className="booking-det-info">
                    <h6 className="mb-3">
                        <Link to="booking-details.html">{value.bookingId}</Link>
                        <span className="badge badge-soft-info ms-2">{value?.status}</span>
                        <span className="badge badge-soft-danger ms-2">Cancelled</span>
                    </h6>
                    <ul className="booking-details">
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Booking Date</span> <small className="me-2">: </small>{formatDateTime(value.createdAt)}
                        </li>
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Amount</span> <small className="me-2">: </small> {PriceFormat(value.payableAmount)}<span className="badge badge-soft-primary ms-2">{value.paymentBy}</span>
                        </li>
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Location</span> <small className="me-2">: </small>{value?.address?.houseNumber}, {value?.address?.landmark}
                        </li>
                        <li className="d-flex align-items-center flex-wrap">
                        <span className="book-item">Service Man</span> <small className="me-2">: </small>
                        <div className="user-book d-flex align-items-center flex-wrap me-2">
                            <div className="avatar avatar-xs me-2">
                            <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                            </div>
                            John Doe
                        </div>
                        <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><Link to="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f990979f96b9939691979d969cd79a9694">[email&nbsp;protected]</Link></p>
                        <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 888 888 8888</p>
                        </li>
                    </ul>
                    </div>
                </div>
                <div>
                    <Link to={`booking/`+value._id} className="btn btn-light" data-bs-toggle="modal" data-bs-target="#reschedule">View Detail</Link>
                </div>
            </div>
        </div>
        ))}
    </>

  );
};

export default BookingListCard;





