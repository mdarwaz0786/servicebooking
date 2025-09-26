import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";

import Pagination from '../../../components/Pagination/Pagination';

import BookingStatus from "../../../components/Booking/BookingStatus";

const BookingListCard = ({handlePagination}) => {
    const { PriceFormat, myserviceListData, formatDateTime, imageCheck  } = useContext(AppContext);
  return ( 
      <>  
      {myserviceListData.map((value, index)=>(

      
        <div className="card shadow-none booking-list" key={index}>
            <div className="card-body d-md-flex align-items-center">
            <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
                <div className="booking-img me-sm-3 mb-3 mb-sm-0">
                <Link to={'booking/'+value._id} className="avatar">
                    <img
                    src="/assets/img/providers/provider-15.jpg"
                    alt="User Image"
                    />
                </Link>
                
                </div>
                <div className="booking-det-info">
                <h6 className="mb-3">
                    <Link to={'booking/'+value._id}>Computer Services</Link>
                    <BookingStatus value={value.status} />
                </h6>
                <ul className="booking-details">
                    <li className="d-flex align-items-center mb-2">
                    <span className="book-item">Booking Date</span>{" "}
                    <small className="me-2">: </small>{formatDateTime(value.createdAt)}
                    </li>
                    <li className="d-flex align-items-center mb-2">
                    <span className="book-item">Amount</span>{" "}
                    <small className="me-2">: </small> {PriceFormat(value.booking.payableAmount)}
                    </li>
                    <li className="d-flex align-items-center mb-2">
                    <span className="book-item">Location</span>{" "}
                    <small className="me-2">: </small>{value?.booking.address?.houseNumber}, {value?.booking.address?.landmark}
                    </li>
                    {(value?.serviceman)?(
                            <li className="d-flex align-items-center flex-wrap">
                                <span className="book-item">Service Man</span> <small className="me-2">: </small>
                                <div className="user-book d-flex align-items-center flex-wrap me-2">
                                    <div className="avatar avatar-xs me-2">
                                    <img className="avatar-img rounded-circle" alt="User Image" src={imageCheck(value?.serviceman?.profileImage?value?.serviceman?.profileImage:'', 'user.png')} />
                                    </div>
                                    {value?.serviceman.name}
                                </div>
                                <p><i className="ti ti-point-filled fs-10 text-muted me-2" /><Link to={`tel:`+value?.serviceman?.mobile}>{value?.serviceman?.mobile}</Link></p>
                            </li>
                        ):(null)
                        }
                </ul>
                </div>
            </div>
            <div>
                <Link
                href="booking.html"
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#reschedule"
                >
                Reschedule
                </Link>

                <div className="view-action mt-3 mb-0 me-0 ms-0"><div className="rating"><i className="fas fa-star filled"></i><i className="fas fa-star filled"></i><i className="fas fa-star filled"></i><i className="fas fa-star filled"></i><i className="fas fa-star filled"></i></div><a href="/serviceman" className="text-primary">View Details</a></div>

            </div>
            
            </div>
        </div>
        ))}

        <Pagination handlePagination={handlePagination} />

    </>

  );
};

export default BookingListCard;





