/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { formatDate } from "../../helpers/formatDate";

const TransactionDetail = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`${apis.transaction.get}/${id}`, {
        headers: {
          Authorization: validToken,
        },
      });
      if (res?.data?.success) {
        setTransaction(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container py-5 text-center">
        <h5>No transaction found</h5>
      </div>
    );
  }

  const {
    transactionId,
    status,
    paymentBy,
    paymentDate,
    paymentTime,
    amount,
    gstPercent,
    finalAmount,
    user,
    PID,
    itemData,
  } = transaction;

  return (
    <div className="page-wrapper">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-content-center mb-4">
          <h4 className="mb-4">Transaction Details</h4>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        {/* Transaction Summary */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              {transactionId && (
                <div className="col-md-4">
                  <strong>Transaction ID</strong>
                  <div>{transactionId}</div>
                </div>
              )}

              {status && (
                <div className="col-md-4">
                  <strong>Status</strong>
                  <div>{status}</div>
                </div>
              )}

              {paymentBy && (
                <div className="col-md-4">
                  <strong>Payment Method</strong>
                  <div>{paymentBy}</div>
                </div>
              )}

              {paymentDate && (
                <div className="col-md-4">
                  <strong>Payment Date</strong>
                  <div>{formatDate(paymentDate)}</div>
                </div>
              )}

              {paymentTime && (
                <div className="col-md-4">
                  <strong>Payment Time</strong>
                  <div>{paymentTime}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Info */}
        <div className="card mb-4">
          <div className="card-header fw-bold">Booking Information</div>
          <div className="card-body">
            <div className="row g-3">
              {PID?.bookingId && (
                <div className="col-md-4">
                  <strong>Booking ID</strong>
                  <div>{PID.bookingId}</div>
                </div>
              )}

              {(PID?.scheduleDate || PID?.scheduleTime) && (
                <div className="col-md-4">
                  <strong>Schedule</strong>
                  <div>
                    {PID?.scheduleDate && formatDate(PID.scheduleDate)}
                    {PID?.scheduleTime && ` | ${PID.scheduleTime}`}
                  </div>
                </div>
              )}

              {PID?.paymentMode && (
                <div className="col-md-4">
                  <strong>Payment Mode</strong>
                  <div>{PID.paymentMode}</div>
                </div>
              )}

              {PID?.payableAmount && (
                <div className="col-md-4">
                  <strong>Payable Amount</strong>
                  <div>₹{PID.payableAmount}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services */}
        {itemData?.length > 0 && (
          <div className="card mb-4">
            <div className="card-header fw-bold">Service Details</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Service</th>
                      <th>Qty</th>
                      <th>MRP</th>
                      <th>Sale Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemData.map((item) => (
                      <tr key={item?._id}>
                        {item?.serviceId?.name && (
                          <td>{item.serviceId.name}</td>
                        )}
                        {item?.quantity && <td>{item.quantity}</td>}
                        {item?.mrpPrice && <td>₹{item.mrpPrice}</td>}
                        {item?.salePrice && <td>₹{item.salePrice}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Amount Summary */}
        <div className="card mb-4">
          <div className="card-header fw-bold">Amount Summary</div>
          <div className="card-body">
            <div className="row">
              {amount && (
                <div className="col-md-4">Base Amount: ₹{amount}</div>
              )}

              {gstPercent && (
                <div className="col-md-4">
                  GST ({gstPercent}%): Included
                </div>
              )}

              {finalAmount && (
                <div className="col-md-4 fw-bold">
                  Final Amount: ₹{finalAmount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="card">
            <div className="card-header fw-bold">User Information</div>
            <div className="card-body">
              <div className="row align-items-center g-3">
                {user?.profileImage && (
                  <div className="col-md-2 text-center">
                    <img
                      src={user.profileImage}
                      alt="User"
                      className="img-fluid rounded-circle border"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <div className="col-md-10">
                  <div className="row g-3">
                    {user?.name && (
                      <div className="col-md-4">
                        <strong>Name</strong>
                        <div>{user.name}</div>
                      </div>
                    )}

                    {user?.mobile && (
                      <div className="col-md-4">
                        <strong>Mobile</strong>
                        <div>{user.mobile}</div>
                      </div>
                    )}

                    {user?.email && (
                      <div className="col-md-4">
                        <strong>Email</strong>
                        <div>{user.email}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;
