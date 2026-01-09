/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { formatDate } from "../../helpers/formatDate";

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [activeTab, setActiveTab] = useState("detail");

  const [booking, setBooking] = useState(null);
  const [items, setItems] = useState([]);
  const [additionalParts, setAdditionalParts] = useState([]);
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
        setAdditionalParts(response?.data?.data?.booking?.additionalParts);
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

  const getPaymentStatus = (status) => {
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

          <div className="btn-group">
            <button
              className={`btn ${activeTab === "detail" ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setActiveTab("detail")}
            >
              Detail
            </button>
            <button
              className={`btn ${activeTab === "serviceman" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab("serviceman")}
            >
              Provider
            </button>
            <button
              className={`btn ${activeTab === "media" ? "btn-secondary" : "btn-outline-secondary"}`}
              onClick={() => setActiveTab("media")}
            >
              Media
            </button>
          </div>

          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Card */}
        {activeTab === "detail" && (
          <>
            <div div className="card shadow-sm rounded-4 border-0">
              <div className="card-body">
                {/* Booking Info */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase text-muted">Booking Info</h6>
                    <p className="mb-1"><strong>Booking ID:</strong> {booking?.bookingId}</p>
                    <p className="mb-1"><strong>Booking Date:</strong> {formatDate(booking?.createdAt)}</p>
                    <p className="mb-1"><strong>Scheduled At:</strong> {formatDate(booking?.scheduleDate)} at {booking?.scheduleTime}</p>
                    <p className="mb-1"><strong>Booking Status:</strong> {booking?.status}</p>
                    <p className="mb-1"><strong>Payment Status:</strong> {getPaymentStatus(booking?.paymentStatus)}</p>
                    <p className="mb-1"><strong>Payment Mode:</strong> {booking?.paymentMode}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase text-muted">Customer</h6>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <img
                        src={
                          booking?.user?.profileImage
                            ? `${BASE_URL}/${booking?.user?.profileImage}`
                            : "https://placehold.co/600x400/png"
                        }
                        alt="customer"
                        className="rounded-circle border"
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                      />
                      <div>
                        <p className="mb-1"><strong>Name:</strong> {booking?.user?.name || "N/A"}</p>
                        <p className="mb-1"><strong>Email:</strong> {booking?.user?.email || "N/A"}</p>
                        <p className="mb-1"><strong>Mobile:</strong> {booking?.user?.mobile || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Address */}
                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase text-muted">Service Address</h6>
                  {booking?.addressId ? (
                    <p className="mb-0">
                      {booking?.address?.deliveryPersonName || "N/A"}, {booking?.address?.houseNumber || "N/A"}, {booking?.address?.landmark || "N/A"}
                    </p>
                  ) : (
                    <p className="text-muted">No address provided</p>
                  )}
                </div>

                {booking?.latestServiceman?.serviceman && (
                  <>
                    <hr />
                    <div className="mb-4">
                      <h6 className="fw-bold text-uppercase text-muted">Latest Assigned Provider</h6>
                      <div className="d-flex align-items-center gap-3 mt-3">
                        <img
                          src={
                            booking?.latestServiceman?.serviceman?.profileImage
                              ? `${BASE_URL}/${booking?.latestServiceman?.serviceman?.profileImage}`
                              : "https://via.placeholder.com/80"
                          }
                          alt="serviceman"
                          className="rounded-circle border"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                        <div>
                          <p className="mb-1">
                            <strong>Name:</strong> {booking?.latestServiceman?.serviceman?.name}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong> {booking?.latestServiceman?.serviceman?.email}
                          </p>
                          <p className="mb-1">
                            <strong>Mobile:</strong> {booking?.latestServiceman?.serviceman?.mobile}
                          </p>
                          <p className="mb-1">
                            <strong>Staus:</strong> {booking?.latestServiceman?.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Items Table */}
                <h6 className="fw-bold text-uppercase text-muted mb-3">Booking Items</h6>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Service Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">MRP Price</th>
                        <th className="text-end">Sale Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item, i) => (
                        <tr key={i}>
                          <td>{item?.service?.name}</td>
                          <td className="text-center">{item?.quantity}</td>
                          <td className="text-end">₹{item?.mrpPrice}</td>
                          <td className="text-end">₹{item?.salePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Addional Parts Table */}
                <h6 className="fw-bold text-uppercase text-muted mb-3 mt-4">Additional Part</h6>
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Part Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Unit Price</th>
                        <th className="text-end">Labour Charge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {additionalParts?.map((item) => (
                        <tr key={item?._id}>
                          <td>{item?.description}</td>
                          <td className="text-center">{item?.quantity}</td>
                          <td className="text-end">₹{item?.unitPrice}</td>
                          <td className="text-end">₹{item?.laborCharge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="d-flex justify-content-end mt-3">
                  <div style={{ minWidth: "300px" }}>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Amount:</span>
                      <strong>₹{booking?.amount}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>GST ({booking?.gstPercent}%):</span>
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
          </>
        )}

        {activeTab === "serviceman" && (
          <>
            {/* Latest Serviceman */}
            {booking?.latestServiceman?.serviceman && (
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase text-muted">Latest Provider</h6>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <img
                    src={`${BASE_URL}/${booking?.latestServiceman?.serviceman?.profileImage}`}
                    className="rounded-circle border"
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                    alt="profile"
                  />
                  <div>
                    <p className="mb-0 text-muted"><strong>Name:</strong> {booking?.latestServiceman?.serviceman?.name}</p>
                    <p className="mb-0 text-muted"><strong>Email:</strong> {booking?.latestServiceman?.serviceman?.email}</p>
                    <p className="mb-0 text-muted"><strong>Mobile:</strong> {booking?.latestServiceman?.serviceman?.mobile}</p>
                    <p className="mb-0 text-muted"><strong>Status:</strong> {booking?.latestServiceman?.status}</p>
                  </div>
                </div>
              </div>
            )}

            <hr />

            {/* Serviceman History */}
            <h6 className="fw-bold text-uppercase text-muted mb-3">
              Provider Assignment History
            </h6>
            <div className="row">
              {booking?.servicemanHistory?.map((h, i) => (
                <div key={i} className="col-md-6 mb-3">
                  <div className="border rounded-3 p-3 h-100">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={
                          h?.serviceman?.profileImage
                            ? `${BASE_URL}/${h?.serviceman?.profileImage}`
                            : "https://via.placeholder.com/90"
                        }
                        className="rounded-circle border"
                        style={{ width: 90, height: 90, objectFit: "cover" }}
                        alt="profile"
                      />
                      <div>
                        <p className="mb-1 text-muted">
                          <strong>Name:</strong> {h?.serviceman?.name}
                        </p>
                        <p className="mb-1 text-muted">
                          <strong>Email:</strong> {h?.serviceman?.email}
                        </p>
                        <p className="mb-1 text-muted">
                          <strong>Mobile:</strong> {h?.serviceman?.mobile}
                        </p>
                        <p className="mb-0 text-muted">
                          <strong>Status:</strong>{" "}
                          <span className="text-capitalize">{h?.status}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "media" && (
          <>
            {/* ================= LATEST SERVICEMAN ================= */}
            <h6 className="fw-bold text-uppercase text-muted mb-3">
              Latest Provider Media
            </h6>

            {booking?.latestServiceman && (
              <div className="border rounded-3 p-3 mb-4">
                {/* Serviceman Info */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={`${BASE_URL}/${booking?.latestServiceman?.serviceman?.profileImage}`}
                    className="rounded-circle border"
                    style={{ width: 90, height: 90, objectFit: "cover" }}
                    alt="serviceman"
                  />
                  <div>
                    <p className="mb-0"><strong>Name:</strong> {booking?.latestServiceman?.serviceman?.name}</p>
                    <p className="mb-0"><strong>Email:</strong> {booking?.latestServiceman?.serviceman?.email}</p>
                    <p className="mb-0"><strong>Mobile:</strong> {booking?.latestServiceman?.serviceman?.mobile}</p>
                    <p className="mb-0"><strong>Status:</strong> {booking?.latestServiceman?.status}</p>
                  </div>
                </div>

                {/* Selfie */}
                {booking?.latestServiceman?.selfie && (
                  <>
                    <p className="fw-semibold mb-1">Selfie</p>
                    <img
                      src={`${BASE_URL}/${booking?.latestServiceman?.selfie}`}
                      className="img-thumbnail mb-3"
                      style={{ width: 160 }}
                      alt="selfie"
                    />
                  </>
                )}

                {/* Before Start */}
                {(booking?.latestServiceman?.beforeStartImages?.length > 0 ||
                  booking?.latestServiceman?.beforeStartVideos?.length > 0) && (
                    <>
                      <p className="fw-semibold mt-3">Before Start</p>
                      <div className="d-flex flex-wrap gap-2">
                        {booking?.latestServiceman?.beforeStartImages?.map((img, i) => (
                          <img
                            key={i}
                            src={`${BASE_URL}/${img}`}
                            className="img-thumbnail"
                            style={{ width: 140 }}
                            alt="before"
                          />
                        ))}
                        {booking?.latestServiceman?.beforeStartVideos?.map((vid, i) => (
                          <video
                            key={i}
                            src={`${BASE_URL}/${vid}`}
                            controls
                            style={{ width: 200 }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                {/* After Complete */}
                {(booking?.latestServiceman?.afterCompleteImages?.length > 0 ||
                  booking?.latestServiceman?.afterCompleteVideos?.length > 0) && (
                    <>
                      <p className="fw-semibold mt-3">After Complete</p>
                      <div className="d-flex flex-wrap gap-2">
                        {booking?.latestServiceman?.afterCompleteImages?.map((img, i) => (
                          <img
                            key={i}
                            src={`${BASE_URL}/${img}`}
                            className="img-thumbnail"
                            style={{ width: 140 }}
                            alt="after"
                          />
                        ))}
                        {booking?.latestServiceman?.afterCompleteVideos?.map((vid, i) => (
                          <video
                            key={i}
                            src={`${BASE_URL}/${vid}`}
                            controls
                            style={{ width: 200 }}
                          />
                        ))}
                      </div>
                    </>
                  )}
              </div>
            )}

            {/* ================= SERVICEMAN HISTORY ================= */}
            <h6 className="fw-bold text-uppercase text-muted mb-3">
              Provider History Media
            </h6>

            {booking?.servicemanHistory?.map((h, i) => (
              <div key={i} className="border rounded-3 p-3 mb-4">
                {/* Serviceman Info */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={`${BASE_URL}/${h?.serviceman?.profileImage}`}
                    className="rounded-circle border"
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                    alt="serviceman"
                  />
                  <div>
                    <p className="mb-0"><strong>Name:</strong> {h?.serviceman?.name}</p>
                    <p className="mb-0"><strong>Email:</strong> {h?.serviceman?.email}</p>
                    <p className="mb-0"><strong>Mobile:</strong> {h?.serviceman?.mobile}</p>
                    <p className="mb-0"><strong>Status:</strong> {h?.status}</p>
                  </div>
                </div>

                {/* Selfie */}
                {h?.selfie && (
                  <>
                    <p className="fw-semibold mb-1">Selfie</p>
                    <img
                      src={`${BASE_URL}/${h?.selfie}`}
                      className="img-thumbnail mb-3"
                      style={{ width: 160 }}
                      alt="selfie"
                    />
                  </>
                )}

                {/* Before Start */}
                {(h?.beforeStartImages?.length > 0 || h?.beforeStartVideos?.length > 0) && (
                  <>
                    <p className="fw-semibold">Before Start</p>
                    <div className="d-flex flex-wrap gap-2">
                      {h?.beforeStartImages?.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${BASE_URL}/${img}`}
                          className="img-thumbnail"
                          style={{ width: 140 }}
                          alt="before"
                        />
                      ))}
                      {h?.beforeStartVideos?.map((vid, idx) => (
                        <video
                          key={idx}
                          src={`${BASE_URL}/${vid}`}
                          controls
                          style={{ width: 200 }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* After Complete */}
                {(h?.afterCompleteImages?.length > 0 || h?.afterCompleteVideos?.length > 0) && (
                  <>
                    <p className="fw-semibold mt-3">After Complete</p>
                    <div className="d-flex flex-wrap gap-2">
                      {h.afterCompleteImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={`${BASE_URL}/${img}`}
                          className="img-thumbnail"
                          style={{ width: 140 }}
                          alt="after"
                        />
                      ))}
                      {h?.afterCompleteVideos?.map((vid, idx) => (
                        <video
                          key={idx}
                          src={`${BASE_URL}/${vid}`}
                          controls
                          style={{ width: 200 }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingDetailPage;
