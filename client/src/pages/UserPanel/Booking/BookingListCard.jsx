import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";

import Pagination from '../../../components/Pagination/Pagination';

const BookingListCard = ({handlePagination}) => {
    const { PriceFormat, myserviceListData, formatDateTime, formatDate, imageCheck, bookingStatus } = useContext(AppContext);
  return ( 
    <>  
      {myserviceListData.map((value, index)=>(

      
        <div className="card shadow-none booking-list" key={index}>
            <div className="card-body d-md-flex align-items-center">
                <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
                    <div className="booking-img me-sm-3 mb-3 mb-sm-0">
                    <Link to={`booking/`+value._id} className="avatar">
                        <img src={imageCheck(value.bookingItems[0]?.service?.image)} alt="User Image" />
                    </Link>
                    </div>
                    <div className="booking-det-info">
                    <h4><Link to={`booking/`+value._id}>{value.bookingItems[0]?.service?.name}</Link></h4>
                    <h6 className="mb-3">
                        <Link to={`booking/`+value._id}>{value.bookingId}</Link>
                        
                    </h6>
                    <ul className="booking-details">
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Booking Date</span> <small className="me-2">: </small>{formatDateTime(value.createdAt)}
                        </li>
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Schedule Date</span> <small className="me-2">: </small>{formatDate(value.scheduleDate)+' '+value.scheduleTime}
                        </li>
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Amount</span> <small className="me-2">: </small> {PriceFormat(value.payableAmount)}
                        {(value.paymentMode=='online')?(
                            <><span className="badge badge-soft-success ms-2">Online</span></>
                            ):(
                                <><span className="badge badge-soft-success ms-2">COD</span></>
                            )}
                        </li>
                        <li className="d-flex align-items-center mb-2">
                        <span className="book-item">Location</span> <small className="me-2">: </small>{value?.address?.houseNumber}, {value?.address?.landmark}
                        </li>
                        {(value?.serviceman && value.status=='accept')?(
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

                        <li className="d-flex align-items-center mb-2">
                            <span className="book-item">Booking Status</span> <small className="me-2">: </small>
                        
                            {bookingStatus(value.status)}                            
                        </li>

                    </ul>
                    </div>
                </div>
                <div className="text-center">
                    <div className="booking-otp">
                        {value?.otp?.split("").map((digit, index) => (
                        <span key={index} className="otp-box">
                        {digit}
                        </span>
                    ))}
                    </div>
                    <Link to={`booking/`+value._id} className="btn btn-light" >View Detail</Link>
                </div>
            </div>
        </div>
        ))}

        <Pagination handlePagination={handlePagination} />
        

    </>

  );
};

export default BookingListCard;





