import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import apis from "../../apis/apis";

const UpdateTrainingSchedulePage = () => {
  const { validToken, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    scheduleDate: "",
    scheduleTime: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`${apis.trainingSchedule.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          setFormData({
            scheduleDate: res?.data?.data?.scheduleDate?.split("T")[0],
            scheduleTime: res?.data?.data?.scheduleTime,
          });
        };
      } catch (error) {
        console.log(error);
        toast.error("Failed to load training schedule");
      };
    };
    if (id) fetchSchedule();
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      scheduleDate: "",
      scheduleTime: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.scheduleDate) {
      toast.error("Schedule date is required");
      return;
    };

    if (!formData.scheduleTime) {
      toast.error("Schedule time is required");
      return;
    };

    try {
      setLoading(true);

      const data = {
        ...formData,
        updatedBy: user?._id,
      };

      const response = await axios.patch(`${apis.trainingSchedule.update}/${id}`, data, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Training schedule updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Training Schedule</h5>
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
              {/* Schedule Date */}
              <div className="mb-3">
                <label className="form-label">
                  Schedule Date <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Schedule Time */}
              <div className="mb-3">
                <label className="form-label">
                  Schedule Time <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
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

export default UpdateTrainingSchedulePage;
