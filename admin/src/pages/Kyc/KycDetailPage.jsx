import { useLocation, useNavigate } from "react-router-dom";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { formatDate } from "../../helpers/formatDate";

const KycDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { validToken } = useAuth();
  const { record } = location.state || {};
  const [status, setStatus] = useState(record?.status || "pending");
  const [remarks, setRemarks] = useState(record?.remarks || "");

  if (!record) return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <p className="text-center">No data available</p>;
      </div>
    </div>
  );

  const { profile, user } = record;

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.patch(
        `${apis.kyc.update}/${record?._id}`,
        { status, remarks },
        { headers: { Authorization: validToken } }
      );
      if (response?.data?.success) {
        toast.success("Status updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  return (
    <>
      <div className="page-wrapper page-settings">
        <div className="content">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">KYC Detail</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
          <div className="container py-4">
            <div className="card shadow-lg border-0 rounded-3">
              {/* Header */}
              <div className="card-header bg-primary text-white d-flex align-items-center">
                <img
                  src={
                    profile?.profileImage
                      ? `${BASE_URL}/${profile?.profileImage}`
                      : "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="rounded-circle border border-3 border-light shadow-sm me-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div>
                  <p className="mb-0">{profile?.name}</p>
                  <p className="mb-0">{profile?.email}</p>
                  <span className="badge bg-light text-dark mt-1 p-2">
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="card-body">
                <div className="row g-4">
                  {/* Profile Info */}
                  <div className="col-md-6">
                    <h5 className="border-bottom pb-2">Profile Info</h5>
                    <ul className="list-unstyled mt-3">
                      <li><strong>Provider Id:</strong> {profile?.servicemanId}</li>
                      <li><strong>Product:</strong> {profile?.categoryIds?.map((c) => <span>{c?.name}, </span>)}</li>
                      <li><strong>Variant:</strong> {profile?.subCategoryIds?.map((sc) => <span>{sc?.name}, </span>)}</li>
                      <li><strong>DOB:</strong> {formatDate(profile?.dob)}</li>
                      <li><strong>Experience Level:</strong> {profile?.experienceLevel}</li>
                      <li><strong>Total Experience:</strong> {profile?.yearOfExperience || 0} year {profile?.monthOfExperience || 0} month </li>
                      <li><strong>Company:</strong> {profile?.companyName || "-"}</li>
                      <li><strong>Permanent Address:</strong> {profile?.permanentAddress}</li>
                      <li><strong>Current Address:</strong> {profile?.currentAddress}</li>
                      <li>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${profile?.status === "pending p-2" ? "bg-warning p-2" : "bg-success p-2"}`}>
                          {profile?.profileStatus}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Contact Info */}
                  <div className="col-md-6">
                    <h5 className="border-bottom pb-2">Contact</h5>
                    <ul className="list-unstyled mt-3">
                      <li><strong>Mobile:</strong> {user?.mobile}</li>
                      <li>
                        <strong>Reference 1:</strong> {profile?.referenceName1} ({profile?.referenceMobile1})
                      </li>
                      <li>
                        <strong>Reference 2:</strong> {profile?.referenceName2} ({profile?.referenceMobile2})
                      </li>
                    </ul>
                  </div>

                  {/* Bank / KYC Info */}
                  <div className="col-md-6">
                    <h5 className="border-bottom pb-2">Bank & KYC</h5>
                    <ul className="list-unstyled mt-3">
                      <li><strong>Bank:</strong> {record?.bankName}, {record?.branchName}</li>
                      <li><strong>Account No:</strong> {record?.accountNumber}</li>
                      <li><strong>Account Holder Name:</strong> {record?.accountHolderName}</li>
                      <li><strong>IFSC:</strong> {record?.ifscCode}</li>
                      <li><strong>PAN:</strong> {record?.panCardNumber}</li>
                      <li><strong>Aadhar:</strong> {record?.aadharCardNumber}</li>
                      <li><strong>GST:</strong> {record?.gstNumber || "-"}</li>
                      <li>
                        <strong>KYC Status:</strong>{" "}
                        <span className={`badge ${record?.status === "pending p-2" ? "bg-warning p-2" : "bg-success p-2"}`}>
                          {record?.status}
                        </span>
                      </li>
                    </ul>

                    {/* Status Update */}
                    <div className="mt-5">
                      <h5 className="border-bottom pb-2">Update Status</h5>
                      <div className="mt-3 d-flex flex-column gap-2">
                        <select
                          className="form-select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add remarks"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleStatusUpdate}>
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Documents */}
                  <div className="col-md-6">
                    <h5 className="border-bottom pb-2">Uploaded Documents</h5>
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {record?.passbookOrCheque && (
                        <div className="text-center">
                          <img
                            src={`${BASE_URL}/${record?.passbookOrCheque}`}
                            alt="Passbook"
                            className="img-thumbnail shadow-sm"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                          />
                          <small className="d-block mt-1 text-muted">Passbook / Cheque</small>
                        </div>
                      )}
                      {record?.panCardImage && (
                        <div className="text-center">
                          <img
                            src={`${BASE_URL}/${record?.panCardImage}`}
                            alt="PAN"
                            className="img-thumbnail shadow-sm"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                          />
                          <small className="d-block mt-1 text-muted">PAN Card</small>
                        </div>
                      )}
                      {record?.aadharFrontImage && (
                        <div className="text-center">
                          <img
                            src={`${BASE_URL}/${record?.aadharFrontImage}`}
                            alt="Aadhar Front"
                            className="img-thumbnail shadow-sm"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                          />
                          <small className="d-block mt-1 text-muted">Aadhar Card Front</small>
                        </div>
                      )}
                      {record?.aadharBackImage && (
                        <div className="text-center">
                          <img
                            src={`${BASE_URL}/${record?.aadharBackImage}`}
                            alt="Aadhar Back"
                            className="img-thumbnail shadow-sm"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                          />
                          <small className="d-block mt-1 text-muted">Aadhar Card Back</small>
                        </div>
                      )}
                      {record?.shopImage && (
                        <div className="text-center">
                          <img
                            src={`${BASE_URL}/${record?.shopImage}`}
                            alt="Shop"
                            className="img-thumbnail shadow-sm"
                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                          />
                          <small className="d-block mt-1 text-muted">Shop</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycDetailsPage;
