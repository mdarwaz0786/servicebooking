import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import BookignReviewModal from "../../../components/Modal/BookignReviewModal";

const UserBookingInvoice = () => {
    const { bookingId } = useParams();
    const { Urls, postData, formatDateTime, formatDate, PriceFormat, imageCheck, bookingStatus, toggleModal } = useContext(AppContext);
    const [data, setdata] = useState([]);
    const [items, setitems] = useState([]);
    const [additionalParts, setAdditionalParts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await postData({}, Urls.myBookingDetail + '/' + bookingId, "GET", 0, 1);
            setdata(response.data.booking ? response.data.booking : []);
            setitems(response.data.items ? response.data.items : []);
            
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
        } catch (error) {
            console.error("Cart API Error:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="col-lg-9 mx-auto card" style={{ padding: '15px 15px' }}>

            {/* Invoice Header */}
            <div className="row invoice-details">
                <div className="col-md-4">
                    <div>
                        <img src="/assets/img/logo.png" alt="logo" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="text-end">
                        <h5 className="mb-1">Invoice</h5>
                        <div className="d-flex gap-3 justify-content-end">
                            <span className="fs-12 d-flex align-items-center">
                                <i className="ti ti-file-text me-1"></i>#{data.bookingId}
                            </span>
                            <span className="fs-12 d-flex align-items-center">
                                <i className="ti ti-calendar me-1"></i>{formatDateTime(data.createdAt)}
                            </span>
                        </div>
                        {/* Status Badge */}
                        <div className="mt-2">
                            {bookingStatus(data?.status)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Content */}
            <div className="invoice-wrap">
                <div className="row">
                    {/* From */}
                    <div className="col-md-6">
                        <div className="invoice-address">
                            <h6 className="mb-2">Invoice From:</h6>
                            <ul>
                                <li>Truelysell</li>
                                <li>367 Hillcrest Lane, Irvine, California, United States</li>
                                <li className="mb-0">truelysell@example.com</li>
                            </ul>
                        </div>
                    </div>

                    {/* To */}
                    <div className="col-md-6">
                        <div className="invoice-address d-flex justify-content-end">
                            <div>
                                <h6 className="mb-2">Invoice To:</h6>
                                <ul>
                                    <li>{data?.user?.name}</li>
                                    <li>{data?.address?.houseNumber}</li>
                                    <li>{data?.address?.landmark}</li>
                                    <li className="mb-0">Phone: {data?.user?.mobile}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="invoice-info">
                                    <h6>Booking Details:</h6>
                                    <p className="mb-1">
                                        <i className="ti ti-calendar me-1"></i>
                                        Date: {formatDate(data.scheduleDate)}
                                    </p>
                                    <p className="mb-1">
                                        <i className="ti ti-clock me-1"></i>
                                        Time: {data.scheduleTime}
                                    </p>
                                    <p className="mb-0">
                                        <i className="ti ti-user me-1"></i>
                                        Serviceman: {data?.serviceman?.name || 'Not Assigned'}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="invoice-info">
                                    <h6>Payment Details:</h6>
                                    <p className="mb-1">
                                        Payment Mode: {data.paymentMode === 'cod' ? 'Cash on Delivery' : data.paymentMode}
                                    </p>
                                    <p className="mb-1">
                                        Payment Status: {data.paymentStatus === 1 ? 'Paid' : 'Pending'}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="invoice-info text-end">
                                    <h6>Service Location:</h6>
                                    <p className="mb-0">{data?.address?.houseNumber}</p>
                                    <p className="mb-0">{data?.address?.landmark}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="col-12 mt-4">
                        <div className="table-responsive">
                            <table className="table datatable">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Description</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((value, index) => (
                                        <>
                                            {/* Main Service Row */}
                                            <tr key={`service-${index}`}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img 
                                                            src={imageCheck(value?.service?.image)} 
                                                            className="img-thumbnail me-2" 
                                                            alt="img" 
                                                            style={{ width: '60px', height: '60px' }} 
                                                        />
                                                        <div>
                                                            <p className="mb-0 fw-semibold">{value?.service?.name}</p>
                                                            {value.additionalParts && value.additionalParts.length > 0 && (
                                                                <small className="text-muted">
                                                                    Includes {value.additionalParts.length} additional part(s)
                                                                </small>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-14 text-gray mb-0">
                                                        Service Charges
                                                    </p>
                                                </td>
                                                <td className="text-end">
                                                    <span className="fs-14">{PriceFormat(value.salePrice)}</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="fs-14">{value.quantity}</span>
                                                </td>
                                                <td className="text-end">
                                                    <span className="fs-14 fw-semibold">
                                                        {PriceFormat(value.salePrice * value.quantity)}
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* Additional Parts for this service */}
                                            {value.additionalParts && value.additionalParts.map((part, partIndex) => (
                                                <tr key={`part-${index}-${partIndex}`} className="additional-part-row">
                                                    <td>
                                                        <div className="d-flex align-items-center ps-4">
                                                            <div className="me-2">
                                                                <i className="ti ti-package text-warning"></i>
                                                            </div>
                                                            <div>
                                                                <p className="mb-0 fs-13">{part.description}</p>
                                                                <small className="text-muted">
                                                                    {part.groupTitle}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="fs-14 text-gray mb-0">
                                                            Additional Part
                                                        </p>
                                                    </td>
                                                    <td className="text-end">
                                                        <span className="fs-14">{PriceFormat(part.unitPrice)}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="fs-14">{part.quantity}</span>
                                                    </td>
                                                    <td className="text-end">
                                                        <span className="fs-14">
                                                            {PriceFormat(parseFloat(part.unitPrice) * parseFloat(part.quantity || 1))}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="col-md-6 offset-md-6">
                        <div className="invoice-total mt-4">
                            <ul>
                                <li className="d-flex justify-content-between">
                                    <span>Services Total:</span>
                                    <span>{PriceFormat(data.amount)}</span>
                                </li>
                                
                                {/* Additional Parts Total */}
                                {data.additionalPartAmount > 0 && (
                                    <li className="d-flex justify-content-between">
                                        <span>
                                            Additional Parts:
                                            {data.status === 'partstatusnew' && (
                                                <span className="badge bg-warning ms-2 fs-10">Pending Approval</span>
                                            )}
                                        </span>
                                        <span className={data.status === 'partstatusnew' ? 'text-warning' : ''}>
                                            {PriceFormat(data.additionalPartAmount)}
                                        </span>
                                    </li>
                                )}
                                
                                {/* Subtotal */}
                                <li className="d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <span>
                                        {PriceFormat(
                                            (data.amount || 0) + 
                                            (data.status === 'partstatusnew' ? (data.additionalPartAmount || 0) : 0)
                                        )}
                                    </span>
                                </li>
                                
                                {/* GST */}
                                <li className="d-flex justify-content-between">
                                    <span>GST @ {data.gstPercent}%:</span>
                                    <span>{PriceFormat(data.gstAmount)}</span>
                                </li>
                                
                                {/* Total Amount - Show different based on status */}
                                <li className="ord-total d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Total Amount:</strong>
                                        {data.status === 'partstatusnew' && additionalParts.length > 0 && (
                                            <div className="fs-11 text-warning mt-1">
                                                *Final amount after parts approval
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-end">
                                        {data.status === 'partstatusnew' && additionalParts.length > 0 ? (
                                            <>
                                                <div className="text-decoration-line-through text-muted fs-12">
                                                    {PriceFormat(data.payableAmount)}
                                                </div>
                                                <div className="fs-18 fw-bold text-warning">
                                                    {PriceFormat(data.payableAmount + (data.additionalPartAmount || 0))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="fs-18 fw-bold">
                                                {PriceFormat(data.payableAmount)}
                                            </div>
                                        )}
                                    </div>
                                </li>
                                
                                {/* Payment Status */}
                                <li className="d-flex justify-content-between mt-3 pt-3 border-top">
                                    <span className="fw-semibold">Amount {data.paymentStatus === 1 ? 'Paid' : 'Due'}:</span>
                                    <span className={data.paymentStatus === 1 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                        {data.status === 'partstatusnew' && additionalParts.length > 0 ? (
                                            PriceFormat(data.payableAmount + (data.additionalPartAmount || 0))
                                        ) : (
                                            PriceFormat(data.payableAmount)
                                        )}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className="col-md-12 mt-4">
                        <div className="invoice-notes">
                            <h6 className="mb-2">Notes:</h6>
                            {data.status === 'partstatusnew' && additionalParts.length > 0 ? (
                                <div className="alert alert-warning mb-3">
                                    <p className="mb-0">
                                        <i className="ti ti-alert-circle me-2"></i>
                                        <strong>Important:</strong> This invoice includes {additionalParts.length} additional part(s) 
                                        that are pending your approval. The final amount will be confirmed after you approve 
                                        or reject these parts.
                                    </p>
                                </div>
                            ) : (
                                <p className="text-muted mb-0">
                                    All services are covered under our standard warranty terms. Please contact customer support 
                                    for any queries regarding this invoice.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="col-md-12 mt-4">
                        <div className="invoice-terms rounded p-3 border">
                            <h6 className="fs-14 mb-3">Terms &amp; Conditions:</h6>
                            <ul className="mb-0">
                                <li className="mb-2">
                                    All payments must be made according to the agreed schedule. Late
                                    payments may incur additional fees.
                                </li>
                                <li className="mb-2">
                                    For pending approvals (additional parts), the final amount will be 
                                    confirmed only after customer approval.
                                </li>
                                <li className="mb-0">
                                    Cancellations must be made within 10 days of service. Refunds
                                    are subject to review and may not be granted if the service has
                                    been substantially performed.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="col-md-12 mt-4 pt-4 border-top">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="invoice-footer">
                                    <p className="mb-1 text-muted">Thank you for your business!</p>
                                    <p className="mb-0 text-muted">
                                        For any queries, contact: support@truelysell.com | +1 234 567 890
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 text-end">
                                <div className="invoice-footer">
                                    <p className="mb-1 text-muted">Invoice Generated On: {formatDateTime(new Date())}</p>
                                    <p className="mb-0 text-muted">
                                        This is a computer-generated invoice, no signature required.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Button */}
            <div className="row mt-4">
                <div className="col-md-12 text-end">
                    <button 
                        className="btn btn-primary d-inline-flex align-items-center"
                        onClick={() => window.print()}
                    >
                        <i className="ti ti-printer me-2"></i>
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBookingInvoice;