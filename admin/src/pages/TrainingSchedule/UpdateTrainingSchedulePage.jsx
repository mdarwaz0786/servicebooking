/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import apis from "../../apis/apis";
import SingleSelect from "../../components/Form/SingleSelect";

const UpdateTrainingSchedulePage = () => {
  const { validToken, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    scheduleDate: "",
    scheduleTime: "",
    providerId: "",
    trainingId: "",
  });

  const [providers, setProviders] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const providerRes = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });
        const trainingRes = await axios.get(apis.training.get, {
          headers: { Authorization: validToken },
        });

        if (providerRes.data.success) setProviders(providerRes.data.data);
        if (trainingRes.data.success) setTrainings(trainingRes.data.data);
      } catch (err) {
        console.log(err)
        toast.error("Failed to load dropdown data");
      }
    };

    fetchOptions();
  }, []);

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
            providerId: res?.data?.data?.providerId?._id,
            trainingId: res?.data?.data?.trainingId?._id,
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
      providerId: "",
      trainingId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.trainingId) {
      toast.error("Trainer is required");
      return;
    };

    if (!formData.providerId) {
      toast.error("Provider is required");
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
        toast.success("Updated successfully");
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
              <div className="row">
                {/* Provider */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Provider <span className="text-danger">*</span>
                  </label>
                  <SingleSelect
                    optionsList={providers}
                    value={formData.providerId}
                    onChange={(val) =>
                      setFormData({ ...formData, providerId: val })
                    }
                    placeholder="Select Provider"
                    labelKey="name"
                    valueKey="_id"
                  />
                </div>

                {/* Training */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Trainer <span className="text-danger">*</span>
                  </label>
                  <SingleSelect
                    optionsList={trainings}
                    value={formData.trainingId}
                    onChange={(val) =>
                      setFormData({ ...formData, trainingId: val })
                    }
                    placeholder="Select Trainer"
                    labelKey="fullName"
                    valueKey="_id"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Schedule Date */}
                  <div className="mb-3">
                    <label className="form-label">
                      Schedule Date
                    </label>
                    <input
                      type="date"
                      name="scheduleDate"
                      value={formData.scheduleDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Schedule Time */}
                  <div className="mb-3">
                    <label className="form-label">
                      Schedule Time
                    </label>
                    <input
                      type="time"
                      name="scheduleTime"
                      value={formData.scheduleTime}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
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
