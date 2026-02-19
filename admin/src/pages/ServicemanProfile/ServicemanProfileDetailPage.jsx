import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import MultiSelect from "../../components/Form/MultiSelect";

const ServicemanProfileDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { validToken } = useAuth();

  const { record } = location.state || {};

  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [zones, setZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);

  useEffect(() => {
    if (!record) return;
    setCurrentStatus(record.profileStatus || "Pending");
    setRemarks(record.remarks || "");
    setSelectedZones(record?.zones?.map((z) => z?._id) || []);
  }, [record]);

  useEffect(() => {
    if (!validToken) return;

    const fetchZones = async () => {
      try {
        const res = await axios.get(apis.zone.get, {
          headers: { Authorization: validToken }
        });

        setZones(res?.data?.data || []);
      } catch {
        toast.error("Failed to load zones");
      }
    };

    fetchZones();
  }, [validToken]);

  if (!record) {
    return (
      <div className="page-wrapper page-settings">
        <div className="content text-center">
          <p>No data available</p>
        </div>
      </div>
    );
  };

  const {
    profileImage,
    name,
    email,
    dob,
    gender,
    experienceLevel,
    companyName,
    yearOfExperience,
    monthOfExperience,
    permanentAddress,
    currentAddress,
    referenceName1,
    referenceMobile1,
    referenceName2,
    referenceMobile2,
    profileStatus,
    user,
    categories,
    subCategories,
  } = record;

  const handleStatusUpdate = async () => {
    try {
      const res = await axios.patch(
        `${apis.servicemanProfile.update}/${record._id}`,
        { profileStatus: currentStatus, remarks },
        { headers: { Authorization: validToken } }
      );

      if (res?.data?.success) {
        toast.success("Status updated successfully");
        navigate(-1);
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    };
  };

  const handleZoneUpdate = async () => {
    try {
      const res = await axios.patch(
        `${apis.servicemanProfile.update}/${record?._id}`,
        { zones: selectedZones },
        { headers: { Authorization: validToken } }
      );

      if (res?.data?.success) {
        toast.success("Zones assigned successfully");
        navigate(-1);
      };
    } catch {
      toast.error("Failed to assign zones");
    };
  };

  return (
    <div className="page-wrapper page-settings">
      <div className="content">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5>Serviceman Profile Detail</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <div className="container py-3">
          <div className="card shadow border-0 rounded-3">

            {/* HEADER CARD */}
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <img
                src={
                  profileImage
                    ? `${BASE_URL}/${profileImage}`
                    : "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="rounded-circle me-3"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <div>
                <h5 className="mb-0">{name}</h5>
                <small>{email}</small>
                <div>
                  <span className="badge bg-light text-dark mt-1">
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="card-body">
              <div className="row g-4">

                {/* PROFILE INFO */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Profile Info</h6>
                  <ul className="list-unstyled mt-3">
                    <li><strong>DOB:</strong> {dob ? new Date(dob).toLocaleDateString() : "-"}</li>
                    <li><strong>Gender:</strong> {gender}</li>
                    <li><strong>Experience Level:</strong> {experienceLevel}</li>
                    <li><strong>Company:</strong> {companyName || "N/A"}</li>
                    <li><strong>Total Experience:</strong> {yearOfExperience || 0} Year {monthOfExperience || 0} </li>
                    <li><strong>Permanent Address:</strong> {permanentAddress}</li>
                    <li><strong>Current Address:</strong> {currentAddress}</li>
                    <li><strong>Status:</strong> {profileStatus}</li>
                  </ul>
                </div>

                {/* CONTACT */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Contact Info</h6>
                  <ul className="list-unstyled mt-3">
                    <li><strong>Mobile:</strong> {user?.mobile}</li>
                    <li><strong>Reference 1:</strong> {referenceName1} ({referenceMobile1})</li>
                    <li><strong>Reference 2:</strong> {referenceName2} ({referenceMobile2})</li>
                  </ul>
                </div>

                {/* CATEGORIES */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Product</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {categories?.map((cat) => (
                      <div key={cat?._id} className="text-center">
                        <img
                          src={`${BASE_URL}/${cat?.icon}`}
                          alt={cat?.name}
                          className="img-thumbnail"
                          style={{ width: 50, height: 50, objectFit: "contain" }}
                        />
                        <small className="fw-bold d-block">
                          {cat?.name}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SUBCATEGORIES */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Variant</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {subCategories?.map((cat) => (
                      <div key={cat?._id} className="text-center">
                        <img
                          src={`${BASE_URL}/${cat?.icon}`}
                          alt={cat?.name}
                          className="img-thumbnail"
                          style={{ width: 50, height: 50, objectFit: "contain" }}
                        />
                        <small className="fw-bold d-block">
                          {cat?.name}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ASSIGN ZONES */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Assign Zones</h6>

                  <MultiSelect
                    optionsList={zones}
                    value={selectedZones}
                    onChange={setSelectedZones}
                    placeholder="Select Zones"
                  />

                  <button
                    className="btn btn-success mt-3"
                    onClick={handleZoneUpdate}
                  >
                    Save Zones
                  </button>
                </div>

                {/* STATUS UPDATE */}
                <div className="col-md-6">
                  <h6 className="border-bottom pb-2">Update Profile Status</h6>

                  <select
                    className="form-select mt-2"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Enter remark"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleStatusUpdate}
                  >
                    Update Status
                  </button>
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
