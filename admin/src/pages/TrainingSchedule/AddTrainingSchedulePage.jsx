/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import SingleSelect from "../../components/Form/SingleSelect";

const AddTrainingSchedulePage = () => {
  const { validToken, user } = useAuth();
  const navigate = useNavigate();
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
        createdBy: user?._id,
      };

      const response = await axios.post(apis.trainingSchedule.create, data, {
        headers: {
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Training schedule created successfully");
        navigate(-1)
        resetForm();
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
            <h5 className="mb-0">Add Training Schedule</h5>
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

export default AddTrainingSchedulePage;
