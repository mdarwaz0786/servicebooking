/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import SingleSelect from "../../components/Form/SingleSelect";

const TrainingAttendanceFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    providerId: "",
    date: "",
    trainingId: "",
    location: "",
    interviewStatus: "",
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
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.trainingAttendance.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            const d = res.data.data;
            setFormData({
              providerId: d.providerId?._id || "",
              date: d.date?.slice(0, 10) || "",
              trainingId: d.trainingId?._id || "",
              location: d.location || "",
              interviewStatus: d.interviewStatus || "Pending",
            });
          }
        } catch (err) {
          console.log(err)
          toast.error("Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.providerId || !formData.trainingId) {
      return toast.error("All required fields must be filled");
    }

    try {
      setLoading(true);
      let res;

      if (id) {
        res = await axios.patch(
          `${apis.trainingAttendance.update}/${id}`,
          formData,
          { headers: { Authorization: validToken } }
        );
      } else {
        res = await axios.post(apis.trainingAttendance.create, formData, {
          headers: { Authorization: validToken },
        });
      }

      if (res.data.success) {
        toast.success(`${id ? "updated" : "created"} successfully`);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update Attendance" : "Add Attendance"}</h5>
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
                    labelKey="firtName"
                    valueKey="_id"
                  />
                </div>

                {/* Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Location */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Location <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={150}
                    required
                  />
                </div>

                {/* Interview Status */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Interview Status</label>
                  <select
                    name="interviewStatus"
                    value={formData.interviewStatus}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>

              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading
                    ? id
                      ? "Updating..."
                      : "Saving..."
                    : id
                      ? "Update"
                      : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingAttendanceFormPage;
