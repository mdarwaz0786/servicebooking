import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import RichTextEditor from "../../components/Form/RichTextEditor";
import apis from "../../apis/apis";

const AddRefundPolicyPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const id = "68f9c555819007e42b718e67";

  const [formData, setFormData] = useState({
    title: "Refund Policy",
    description: "",
    effectiveDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim() || !formData.effectiveDate) {
      toast.error("Description and Effective Date are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(`${apis.refundPolicy.update}/${id}`, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Saved successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "Refund Policy",
      description: "",
      effectiveDate: "",
    });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${apis.refundPolicy.get}/${id}`, { headers: { Authorization: validToken } })
        .then((res) => {
          if (res.data?.success) {
            const { title, description, effectiveDate } = res.data.data;
            setFormData({
              title: title || "Refund Policy",
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
            <h5 className="mb-0">Add Refund Policy</h5>
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

              <div className="mb-3">
                <label className="form-label">Description</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
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

export default AddRefundPolicyPage;
