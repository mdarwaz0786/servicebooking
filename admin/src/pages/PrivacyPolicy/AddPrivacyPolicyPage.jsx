import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Editor from "../../components/Form/Editor";

const AddPrivacyPolicyPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const id = "69032f19d05bc860dfc159fb";

  const [formData, setFormData] = useState({
    title: "Privacy Policy",
    effectiveDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.effectiveDate || !formData.description?.trim()) {
      toast.error("Effective Date and Description are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(`${apis.privacyPolicy.update}/${id}`, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Saved successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "Privacy Policy",
      effectiveDate: "",
      description: "",
    });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${apis.privacyPolicy.get}/${id}`, { headers: { Authorization: validToken } })
        .then((res) => {
          if (res.data?.success) {
            const { title, description, effectiveDate } = res.data.data;
            setFormData({
              title: title || "Privacy Policy",
              description: description || "",
              effectiveDate: effectiveDate ? effectiveDate.split("T")[0] : "",
            });
          }
        })
        .catch((err) => toast.error(err?.response?.data?.message || err.message))
        .finally(() => setLoading(false));
    }
  }, [id, validToken]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Privacy Policy</h5>
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
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter title"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Effective Date</label>
                    <input
                      type="date"
                      name="effectiveDate"
                      value={formData.effectiveDate}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <Editor
                  id="privacyPolicyDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  height={300}
                />
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleCancel}
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

export default AddPrivacyPolicyPage;