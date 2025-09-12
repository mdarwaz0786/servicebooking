/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const UpdateTimeSlotPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ time: "" });
  const [loading, setLoading] = useState(false);

  const fetchTimeSlot = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apis.timeSlot.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        const time12hr = response?.data?.data?.time || "";
        const time24hr = time12hr ? moment(time12hr, "hh:mm A").format("HH:mm") : "";
        setFormData({ time: time24hr });
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch time slot");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (id) fetchTimeSlot();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.time.trim()) {
      toast.error("Time is required");
      return;
    };

    try {
      setLoading(true);
      const response = await axios.patch(
        `${apis.timeSlot.update}/${id}`,
        formData,
        {
          headers: { Authorization: validToken },
        },
      );

      if (response?.data?.success) {
        toast.success("Time slot updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update time slot");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Time Slot</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Time Input */}
              <div className="mb-3">
                <label className="form-label">
                  Time <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                <small className="text-muted">
                  Please select time (12-hour format).
                </small>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTimeSlotPage;
