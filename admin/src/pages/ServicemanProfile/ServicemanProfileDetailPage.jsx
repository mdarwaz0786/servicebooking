import { useLocation, useNavigate } from "react-router-dom";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const ServicemanProfileDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { validToken } = useAuth();
  const { record } = location.state || {};
  const [currentStatus, setCurrentStatus] = useState(record?.profileStatus || "pending");
  const [remarks, setRemarks] = useState(record?.remarks || "");

  if (!record)
    return (
      <div className="page-wrapper page-settings">
        <div className="content">
          <p className="text-center">No data available</p>
        </div>
      </div>
    );

  const {
    profileImage,
    name,
    email,
    dob,
    experienceLevel,
    companyName,
    yearOfExperience,
    permanentAddress,
    currentAddress,
    referenceName1,
    referenceMobile1,
    referenceName2,
    referenceMobile2,
    profileStatus,
    user,
    categories,
  } = record;

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.patch(
        `${apis.servicemanProfile.update}/${record?._id}`,
        { profileStatus: currentStatus, remarks },
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
    <div className="page-wrapper page-settings">
      <div className="content">
        {/* Header with Back Button */}
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h5 className="mb-0">Serviceman Profile Detail</h5>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        {/* Profile Card */}
        <div className="container py-4">
          <div className="card shadow-lg border-0 rounded-3">
            {/* Card Header */}
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <img
                src={
                  profileImage
                    ? `${BASE_URL}/${profileImage}`
                    : "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="rounded-circle border border-3 border-light shadow-sm me-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <p className="mb-0 fw-bold fs-5">{name}</p>
                <p className="mb-0">{email}</p>
                <span className="badge bg-light text-dark mt-1 p-2">
                  {user?.role?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <div className="row g-4">
                {/* Profile Info */}
                <div className="col-md-6">
                  <h5 className="border-bottom pb-2">Profile Info</h5>
                  <ul className="list-unstyled mt-3">
                    <li>
                      <strong>DOB:</strong>{" "}
                      {dob ? new Date(dob).toLocaleDateString() : "-"}
                    </li>
                    <li>
                      <strong>Experience Level:</strong> {experienceLevel}
                    </li>
                    <li>
                      <strong>Company:</strong> {companyName || "N/A"}
                    </li>
                    <li>
                      <strong>Total Experience:</strong> {yearOfExperience || 0} Year
                    </li>
                    <li>
                      <strong>Permanent Address:</strong> {permanentAddress}
                    </li>
                    <li>
                      <strong>Current Address:</strong> {currentAddress}
                    </li>
                    <li>
                      <strong>Profile Status:</strong><span> {profileStatus}</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="col-md-6">
                  <h5 className="border-bottom pb-2">Contact</h5>
                  <ul className="list-unstyled mt-3">
                    <li>
                      <strong>Mobile:</strong> {user?.mobile}
                    </li>
                    <li>
                      <strong>Reference 1:</strong> {referenceName1} (
                      {referenceMobile1})
                    </li>
                    <li>
                      <strong>Reference 2:</strong> {referenceName2} (
                      {referenceMobile2})
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div className="col-md-6">
                  <h5 className="border-bottom pb-2">Categories</h5>
                  <div className="d-flex flex-wrap gap-4 mt-3">
                    {categories?.map((cat) => (
                      <div key={cat?._id} className="text-center">
                        <img
                          src={`${BASE_URL}/${cat?.image}`}
                          alt={cat?.name}
                          className="img-thumbnail shadow-sm"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <small className="d-block mt-2 fw-bold">
                          {cat?.name}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Update */}
                <div className="col-md-6">
                  <h5 className="border-bottom pb-2">Update Profile Status</h5>
                  <div className="mt-3 d-flex flex-column gap-2">
                    <select
                      className="form-select"
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter remark"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleStatusUpdate}>
                      Update Profile Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicemanProfileDetailPage;
