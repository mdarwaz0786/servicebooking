import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const AddTimeSlotPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time) {
      toast.error("Time is required");
      return;
    };

    try {
      setLoading(true);
      const response = await axios.post(
        apis.timeSlot.create,
        { time },
        {
          headers: { Authorization: validToken },
        },
      );

      if (response?.data?.success) {
        toast.success("Time slot created successfully");
        setTime("");
      };
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Time Slot</h5>
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
              <div className="row">
                <div className="col-md-6">
                  {/* Time*/}
                  <div className="mb-3">
                    <label className="form-label">
                      Time <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="text-start">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => setTime("")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTimeSlotPage;
