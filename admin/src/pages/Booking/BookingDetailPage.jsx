/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { formatDate } from "../../helpers/formatDate";

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const [booking, setBooking] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookingDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apis.booking.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        setBooking(response?.data?.data?.booking);
        setItems(response?.data?.data?.items);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch booking detail");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (id) fetchBookingDetail();
  }, [id]);

  const getBookingStatus = (status) => {
    switch (status) {
      case 0:
        return "Created";
      case 1:
        return "Success";
      case 2:
        return "Failed";
      default:
        return "Unknown";
    };
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </div>
    );
  };

  if (!booking) {
    return (
      <div className="page-wrapper">
        <div className="container mt-5">
          <div className="alert alert-warning">Booking not found</div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold">Booking Details</h5>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="card shadow-sm rounded-4 border-0">
          <div className="card-body">
            {/* Booking Info */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h6 className="fw-bold text-uppercase text-muted">Booking Info</h6>
                <p className="mb-1"><strong>Booking ID:</strong> {booking?.bookingId}</p>
                <p className="mb-1"><strong>Booking Date:</strong> {formatDate(booking?.createdAt)}</p>
                <p className="mb-1"><strong>Scheduled At:</strong> {formatDate(booking?.scheduleDate)} at {booking?.scheduleTime}</p>
                <p className="mb-1"><strong>Payment Status:</strong> {getBookingStatus(booking?.paymentStatus)}</p>
                <p className="mb-1"><strong>Payment Mode:</strong> {booking?.paymentMode}</p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold text-uppercase text-muted">Customer</h6>
                <p className="mb-1"><strong>Name:</strong> {booking?.userId?.name || "N/A"}</p>
                <p className="mb-1"><strong>Email:</strong> {booking?.userId?.email || "N/A"}</p>
                <p className="mb-1"><strong>Mobile:</strong> {booking?.userId?.mobile || "N/A"}</p>
              </div>
            </div>

            <hr />

            {/* Address */}
            <div className="mb-4">
              <h6 className="fw-bold text-uppercase text-muted">Service Address</h6>
              {booking?.addressId ? (
                <p className="mb-0">
                  {booking?.addressId?.deliveryPersonName || "N/A"}, {booking?.addressId?.houseNumber || "N/A"}, {booking?.addressId?.landmark || "N/A"}
                </p>
              ) : (
                <p className="text-muted">No address provided</p>
              )}
            </div>

            {/* Items Table */}
            <h6 className="fw-bold text-uppercase text-muted mb-3">Booking Items</h6>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Service</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">MRP</th>
                    <th className="text-end">Sale Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>{item?.serviceId?.name}</td>
                      <td className="text-center">{item?.quantity}</td>
                      <td className="text-end">₹{item?.mrpPrice}</td>
                      <td className="text-end">₹{item?.salePrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="d-flex justify-content-end mt-3">
              <div style={{ minWidth: "300px" }}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Amount:</span>
                  <strong>₹{booking?.amount}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>GST ({booking?.gstPercent}):</span>
                  <strong>₹{booking?.gstAmount}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount:</span>
                  <strong>-₹{booking?.discountAmount}</strong>
                </div>
                <div className="d-flex justify-content-between border-top pt-2">
                  <span>Total Payable:</span>
                  <strong className="text-primary fs-5">₹{booking?.payableAmount}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
