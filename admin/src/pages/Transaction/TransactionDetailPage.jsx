// import { FaCreditCard, FaUser, FaCalendarAlt } from "react-icons/fa";

import { useLocation } from "react-router-dom";

function TransactionDetailPage() {
  const location = useLocation();
  const data = location.state; // This is the transaction object

  console.log(data);

  if (!data) return <p>No transaction data found.</p>;

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="container my-4">

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Transaction Details</h2>
            <span className={`badge ${data.status === "success" ? "bg-success" : "bg-danger"} fs-6`}>
              {data.status.toUpperCase()}
            </span>
          </div>

          {/* Payment Summary */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">Payment Summary</div>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-5">Transaction ID</div>
                <div className="col-7">{data.transactionId}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">Payment Method</div>
                <div className="col-7"> {data.paymentBy.toUpperCase()}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">Amount</div>
                <div className="col-7">₹{data.amount}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">GST</div>
                <div className="col-7">{data.gstPercent}%</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">Final Amount</div>
                <div className="col-7 fw-bold text-primary">₹{data.finalAmount}</div>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">Booking Information</div>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-5">Booking ID</div>
                <div className="col-7">{data.PID?.bookingId}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">Schedule</div>
                <div className="col-7"> {data.PID?.scheduleDate?.slice(0, 10)} at {data.PID?.scheduleTime}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">Status</div>
                <div className="col-7">
                  <span className={`badge ${data.PID?.status === "new" ? "bg-warning" : "bg-info"}`}>
                    {data.PID?.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">Customer Details</div>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-5">Mobile</div>
                <div className="col-7">{data.user?.mobile}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5">User ID</div>
                <div className="col-7">{data.user?._id}</div>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="card mb-4 shadow-sm">
            <div className="card-header fw-bold">Service Details</div>
            <div className="card-body d-flex align-items-start">
              <img src={service?.image} alt={service?.name} className="img-thumbnail me-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
              <div>
                <h5>{service?.name}</h5>
                <p className="mb-1"><strong>Price:</strong> ₹{item?.salePrice}</p>
                <p className="mb-1"><strong>Quantity:</strong> {item?.quantity}</p>
                <p className="mb-0"><strong>Total:</strong> ₹{item?.salePrice * item?.quantity}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;