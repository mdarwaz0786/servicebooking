import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import TextEditor from "../../components/Form/TextEditor";
import apis from "../../apis/apis";

const AddJobPostingPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    employmentType: "Full-time",
    shortDescription: "",
    fullDescription: "",
    status: true
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFullDescriptionChange = (editorContent) => {
    const value = typeof editorContent === "object" && editorContent.target?.value
      ? editorContent.target.value
      : editorContent;

    setFormData({ ...formData, fullDescription: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.shortDescription || !formData.fullDescription) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(apis.jobPosting.create, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Job created successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Job</h5>
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
                <TextEditor
                  value={formData.fullDescription}
                  onChange={handleFullDescriptionChange}
                  placeholder="Enter full job description..."
                  height="200px"
                />
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      title: "",
                      location: "",
                      employmentType: "Full-time",
                      shortDescription: "",
                      fullDescription: "",
                      status: true
                    })
                  }
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

export default AddJobPostingPage;
