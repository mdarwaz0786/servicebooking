import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import Editor from "../../components/Form/Editor";
import apis from "../../apis/apis";

const AddImpactPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const id = "68f9c71c3cb87f459f74c3d7";

  const [formData, setFormData] = useState({
    title: "Green India Team Impact",
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

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(`${apis.impact.update}/${id}`, formData, {
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
      title: "Green India Team Impact",
      description: "",
    });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${apis.impact.get}/${id}`, { headers: { Authorization: validToken } })
        .then((res) => {
          if (res.data?.success) {
            const { title, description } = res.data.data;
            setFormData({
              title: title || "Green India Team Impact",
              description: description || "",
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
            <h5 className="mb-0">Add Impact</h5>
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
                <label className="form-label">Description</label>
                <Editor
                  id="impactDescription"
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

export default AddImpactPage;
