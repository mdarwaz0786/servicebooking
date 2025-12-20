import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import { formatDate } from "../../helpers/formatDate";

const TrainingScheduleSubmitDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { validToken } = useAuth();

  const { record } = location.state || {};

  console.log(record)

  const [trainingScheduleStatus, setTrainingScheduleStatus] = useState(
    record?.trainingScheduleStatus || "New"
  );

  const [remarks, setRemarks] = useState(record?.remarks || "");

  if (!record) {
    return (
      <div className="page-wrapper page-settings">
        <div className="content text-center">No data available</div>
      </div>
    );
  }

  const { provider, training } = record;

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${apis.trainingScheduleSubmit.update}/${record?._id}`,
        { trainingScheduleStatus, remarks },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        toast.success("Training schedule updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Training Schedule Submit Detail</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <div className="card shadow border-0">
          {/* Header */}
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <img
              src={
                provider?.profileImage
                  ? `${BASE_URL}/${provider?.profileImage}`
                  : "https://via.placeholder.com/100"
              }
              alt="Provider"
              className="rounded-circle me-3"
              style={{ width: 90, height: 90, objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-0" style={{ color: "#fff" }}>{provider?.name}</h6>
              <small>{provider?.email}</small>
              <div className="mt-1">{provider?.mobile}</div>
            </div>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="row g-4">

              {/* Provider Info */}
              <div className="col-md-6">
                <h6 className="border-bottom pb-2">Provider Info</h6>
                <ul className="list-unstyled mt-3">
                  <li><strong>Experience:</strong> {provider?.experienceLevel}</li>
                  <li><strong>Company:</strong> {provider?.companyName}</li>
                  <li><strong>Address:</strong> {provider?.currentAddress}</li>
                </ul>
              </div>

              {/* Training Info */}
              <div className="col-md-6">
                <h6 className="border-bottom pb-2">Training Info</h6>
                <ul className="list-unstyled mt-3">
                  <li><strong>Subject:</strong> {training?.subject}</li>
                  <li><strong>Trainer:</strong> {training?.fullName}</li>
                  <li><strong>Location:</strong> {training?.location}</li>
                  <li>
                    <strong>Date:</strong>{" "}
                    {formatDate(training?.startDate)}
                  </li>
                  <li>
                    <strong>Time:</strong> {training?.startTime} - {training?.endTime}
                  </li>
                </ul>
              </div>

              {/* Schedule Info */}
              <div className="col-md-6">
                <h6 className="border-bottom pb-2">Schedule Info</h6>
                <ul className="list-unstyled mt-3">
                  <li>
                    <strong>Schedule Date:</strong>{" "}
                    {formatDate(record?.scheduleDate)}
                  </li>
                  <li><strong>Schedule Time:</strong> {record?.scheduleTime}</li>
                  <li>
                    <strong>Status:</strong>{" "}
                    <span >{record?.trainingScheduleStatus}</span>
                  </li>
                </ul>
              </div>

              {/* Update Status */}
              <div className="col-md-6">
                <h6 className="border-bottom pb-2">Update Status</h6>

                <div className="mt-3 d-flex flex-column gap-2">
                  <select
                    className="form-select"
                    value={trainingScheduleStatus}
                    onChange={(e) => setTrainingScheduleStatus(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Reject">Reject</option>
                    <option value="Complete">Complete</option>
                  </select>

                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Add remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  />

                  <button className="btn btn-primary" onClick={handleUpdate}>
                    Update
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

export default TrainingScheduleSubmitDetailPage;
