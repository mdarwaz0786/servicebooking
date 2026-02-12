import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import BookignReviewModal from "../../../components/Modal/BookignReviewModal";
import CompanyReviewModal from "../../../components/Modal/CompanyReviewModal";

const UserBookingDetailPage = () => {
    const { bookingId } = useParams();
    const { Urls, postData, formatDateTime, formatDate, PriceFormat, imageCheck, bookingStatus, toggleModal } = useContext(AppContext);
    const [data, setdata] = useState([]);
    const [items, setitems] = useState([]);
    const [isCancel, setisCancel] = useState();
    const [additionalParts, setAdditionalParts] = useState([]);
    const [showApproveReject, setShowApproveReject] = useState(false);

    const fetchData = async () => {
        try {
            const response = await postData({}, Urls.myBookingDetail + '/' + bookingId, "GET", 0, 1);
            setdata(response.data.booking ? response.data.booking : []);
            setitems(response.data.items ? response.data.items : []);
            setisCancel(response.data.items ? response.data.isCancel : null);
            
            // Extract all additional parts from all items
            const allParts = [];
            response.data.items?.forEach(item => {
                if (item.additionalParts && item.additionalParts.length > 0) {
                    allParts.push(...item.additionalParts.map(part => ({
                        ...part,
                        serviceName: item.service?.name,
                        serviceItemId: item._id
                    })));
                }
            });
            setAdditionalParts(allParts);
            
            // Check if we need to show approve/reject buttons
            setShowApproveReject(response.data.booking?.status === 'partstatusnew');
        } catch (error) {
            console.error("Cart API Error:", error);
        }
    }

    const handleApproveAllParts = async () => {
        try {
            // Approve all additional parts
            const response = await postData(
                { status: 'partstatusapprove' },
                Urls.approveAllAdditionalParts + '/' + bookingId,
                "POST"
            );
            if (response.success) {
                fetchData(); // Refresh data
            }
        } catch (error) {
            console.error("Approve all parts error:", error);
        }
    };

    const handleRejectAllParts = async () => {
        try {
            // Reject all additional parts
            const response = await postData(
                { status: 'partstatusreject' },
                Urls.rejectAllAdditionalParts + '/' + bookingId,
                "POST"
            );
            if (response.success) {
                fetchData(); // Refresh data
            }
        } catch (error) {
            console.error("Reject all parts error:", error);
        }
    };

    const handleCancelBooking = async () => {
        try {
            // Approve all additional parts
            const response = await postData(
                { status: 'cancel' },
                Urls.cancelAllAdditionalParts + '/' + bookingId,
                "POST"
            );
            if (response.success) {
                fetchData(); // Refresh data
            }
        } catch (error) {
            console.error("Approve all parts error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="col-lg-9 mx-auto">
                <div className="row justify-content-center card" style={{ padding: '10px 10px' }}>

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
                                {/* Approve/Reject Buttons - Only show when status is 'partstatusnew' */}
                                {showApproveReject && additionalParts.length > 0 && (
                                    <>
                                        <button
                                            className="btn btn-success d-flex align-items-center justify-content-center"
                                            onClick={handleApproveAllParts}
                                        >
                                            <i className="ti ti-check me-1" />
                                            Approve All Parts
                                        </button>
                                        <button
                                            className="btn btn-danger d-flex align-items-center justify-content-center"
                                            onClick={handleRejectAllParts}
                                        >
                                            <i className="ti ti-x me-1" />
                                            Reject All Parts
                                        </button>
                                    </>
                                )}
                                <Link
                                    to={'/user/booking/invoice/' + data._id}
                                    className="btn btn-light d-flex align-items-center justify-content-center"
                                >
                                    <i className="ti ti-file-text me-1" />
                                    Invoice
                                </Link>
                                {isCancel && data.status!='cancel'?
                                <button
                                    className="btn btn-danger d-flex align-items-center justify-content-center"
                                    onClick={handleCancelBooking}
                                >
                                    <i className="ti ti-x me-0" />
                                    Cancel
                                </button>
                                :null
                                }
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
                                            <i className="feather-calendar me-1" /> {formatDate(data.scheduleDate)}
                                        </li>
                                        <li className="fs-12 d-flex align-items-center">
                                            <i className="feather-clock  me-1" /> {data.scheduleTime}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="slot-user">
                                    {(data?.serviceman && data.status === 'accept') ? (
                                        <>
                                            <h6>Services Man</h6>
                                            <div className="slot-chat">
                                                <div className="slot-user-img d-flex align-items-center">
                                                    <img
                                                        className="avatar rounded-circle  me-2"
                                                        src={imageCheck(data.serviceman.profileImage)}
                                                        alt="image"
                                                    />
                                                    <div className="slot-user-info">
                                                        <p className="mb-1 fs-12">{data.serviceman.name}</p>
                                                    </div>
                                                </div>
                                                <div className="chat-item d-flex align-items-center">
                                                    <div className="slot-user-info">
                                                        <p className="mb-0 fs-12"><Link to={'tel:' + data.serviceman.mobile}>{data.serviceman.mobile}</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (null)}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="slot-action">
                                    <h6 className="text-end">Booking Status:
                                        {bookingStatus(data?.status)}
                                    </h6>
                                    <div className="booking-otp" style={{ justifyContent: 'end' }}>
                                        {data?.otp?.split("").map((digit, index) => (
                                            <span key={index} className="otp-box">
                                                {digit}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Slot Booked */}

                    <div className="payment-summary">
                        <div className="row">
                            {/* Service Location */}
                            <div className="col-md-12 service-location">
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
                            </div>
                            {/* /Service Location */}
                            
                            {/* Order Summary */}
                            <div className="col-md-12 order-summary">
                                <h6 className="order-title">Order Summary</h6>
                                <div className="ord-summary">
                                    {/* Services List */}
                                    {items.map((value, index) => (
                                        <div key={index}>
                                            <div className="order-amt">
                                                <div className="order-info">
                                                    <div className="order-img" style={{ width: '100px' }}>
                                                        <img src={imageCheck(value?.service?.image)} className="img-thumbnail w-20" alt="img" style={{ width: '80px' }} />
                                                    </div>
                                                    <div className="order-profile">
                                                        <h6>{value?.service?.name}</h6>
                                                        <p className="text-muted fs-12 mb-0">
                                                            Quantity: {value.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <h5 style={{ fontSize: '15px' }}>{PriceFormat(value.salePrice * value.quantity)}</h5>
                                            </div>
                                            
                                            {/* Additional Parts for this service */}
                                            {value.additionalParts && value.additionalParts.length > 0 && (
                                                <div className="additional-parts-list ms-4 mt-2 mb-3">
                                                    <h6 className="fs-14 text-muted mb-2">Additional Parts:</h6>
                                                    {value.additionalParts.map((part, partIndex) => (
                                                        <div className="additional-part-item mb-2 ps-3 border-start border-primary" key={part._id}>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <p className="mb-1 fs-13">{part.description}</p>
                                                                    <div className="d-flex gap-3">
                                                                        <span className="badge bg-light text-dark fs-11">
                                                                            {part.groupTitle}
                                                                        </span>
                                                                        <span className="fs-11">
                                                                            Qty: {part.quantity}
                                                                        </span>
                                                                        <span className="fs-11">
                                                                            ₹{part.unitPrice} each
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className="fs-13">
                                                                        ₹{parseFloat(part.unitPrice) * parseFloat(part.quantity || 1)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Summary Calculations */}
                                    <ul className="mt-3">
                                        
                                        {/* Additional Parts Total - Show only if there are parts */}
                                        {/* {data.additionalPartAmount > 0 && (
                                            <li>
                                                <div>Additional Parts</div>
                                                <span className="ord-amt">{PriceFormat(data.additionalPartAmount)}</span>                                                
                                            </li>
                                        )} */}
                                        
                                        {/* Subtotal before GST */}
                                        <li>
                                            Subtotal <span className="ord-amt">
                                                {PriceFormat(data.amount || 0)}
                                            </span>
                                        </li>
                                        
                                        <li>
                                            Service Tax & fees <span className="ord-amt">{PriceFormat(data.gstAmount)}</span>
                                        </li>
                                        
                                        {/* Final Total - Show different amounts based on approval status */}
                                        <li className="ord-total mb-0">
                                            
                                                <div>
                                                    Total Amount
                                                </div>
                                                <div>
                                                  <span className="ord-amt">{PriceFormat(data.payableAmount)}</span>
                                                </div>
                                            
                                        </li>
                                    </ul>
                                    
                                   
                                </div>
                            </div>
                            {/* /Order Summary */}
                           
                        </div>
                    </div>
                </div>
            </div>

            <BookignReviewModal bookingId={data._id} />
            <CompanyReviewModal bookingId={data._id} />
        </>
    );
};

export default UserBookingDetailPage;