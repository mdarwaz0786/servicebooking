/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import RichTextEditor from "../../components/Form/RichTextEditor";

const UpdateJobPostingPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    employmentType: "Full-time",
    shortDescription: "",
    fullDescription: "",
    status: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, fullDescription: value }));
  };

  // ------------------------------------------------------
  // FETCH EXISTING JOB
  // ------------------------------------------------------
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${apis.jobPosting.get}/${id}`, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          const job = res.data.data;

          setFormData({
            title: job.title || "",
            location: job.location || "",
            employmentType: job.employmentType || "Full-time",
            shortDescription: job.shortDescription || "",
            fullDescription: job.fullDescription || "",
            status: job.status ?? true
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load job details");
      }
    };

    fetchJob();
  }, [id]);

  // ------------------------------------------------------
  // UPDATE JOB
  // ------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.shortDescription || !formData.fullDescription) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(`${apis.jobPosting.update}/${id}`, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Job updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Job</h5>
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

              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Employment Type */}
              <div className="mb-3">
                <label className="form-label">Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Full Description */}
              <div className="mb-3">
                <label className="form-label">Full Description</label>
                <RichTextEditor
                  key={formData.fullDescription}  // ensures editor loads initial value
                  value={formData.fullDescription}
                  onChange={handleDescriptionChange}
                />
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
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

export default UpdateJobPostingPage;
