/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import SingleSelect from "../../components/Form/SingleSelect";
import apis from "../../apis/apis";

const TrainingFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    subject: "",
    firstName: "",
    lastName: "",
    startDate: "",
    startTime: "",
    endTime: "",
    location: "",
    maxParticipant: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res.data.success) {
          setCategories(res.data.data || []);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load categories");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.training.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            const t = res.data.data;

            setFormData({
              category: t.category?._id || "",
              subject: t.subject || "",
              firstName: t.firstName || "",
              lastName: t.lastName || "",
              startDate: t.startDate ? t.startDate.slice(0, 10) : "",
              startTime: t.startTime || "",
              endTime: t.endTime || "",
              location: t.location || "",
              maxParticipant: t.maxParticipant || "",
              description: t.description || "",
            });
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) return toast.error("Category is required");
    if (!formData.subject.trim()) return toast.error("Subject is required");
    if (!formData.firstName.trim()) return toast.error("First name is required");
    if (!formData.lastName.trim()) return toast.error("Last name is required");
    if (!formData.startDate) return toast.error("Start date is required");
    if (!formData.startTime) return toast.error("Start time is required");
    if (!formData.endTime) return toast.error("End time is required");
    if (!formData.location.trim()) return toast.error("Location is required");
    if (!formData.maxParticipant) return toast.error("Maximum participants required");

    try {
      setLoading(true);
      let res;
      if (id) {
        res = await axios.patch(`${apis.training.update}/${id}`, formData, {
          headers: { Authorization: validToken },
        });
      } else {
        res = await axios.post(apis.training.create, formData, {
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

  const resetForm = () => {
    setFormData({
      category: "",
      subject: "",
      firstName: "",
      lastName: "",
      startDate: "",
      startTime: "",
      endTime: "",
      location: "",
      maxParticipant: "",
      description: "",
      status: true,
    });
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          {/* Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          {/* Form Body */}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Category */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Category <span style={{ color: "red" }}>*</span>
                    </label>
                    <SingleSelect
                      optionsList={categories}
                      value={formData.category}
                      onChange={handleCategoryChange}
                      placeholder="Select Category"
                      labelKey="name"
                      valueKey="_id"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Subject <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      First Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Last Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Fields */}
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Start Date <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Start Time <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      End Time <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Other Fields */}
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Location <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Max Participants <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="maxParticipant"
                      value={formData.maxParticipant}
                      onChange={handleChange}
                      className="form-control"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingFormPage;
