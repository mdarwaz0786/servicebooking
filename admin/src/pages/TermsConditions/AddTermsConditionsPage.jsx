import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/Form/TextEditor";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useEffect } from "react";

const AddTermsConditionsPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate(); 
  let id = 'fdgfd';
  


  const [descriptionKey, setdescriptionKey] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Terms and Conditions",
    effectiveDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.effectiveDate) {
      toast.error("Effective date is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(`${apis.termsConditions.update}/${id}`, formData, {
        headers: { Authorization: validToken },
      });

      if (res.data.success) {
        toast.success("Terms & Conditions created successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id || id=='') {
      setLoading(true);
      axios.get(`${apis.termsConditions.get}/${id}`, { headers: { Authorization: validToken } })
        .then(res => {
          if (res.data?.success) {
            const { title, description, effectiveDate } = res.data.data;
            setFormData({
              title: title || 'Terms and Conditions', // Ensure title has a default if missing
              description: description || '', // Ensure description is not null
              effectiveDate: effectiveDate
              ? effectiveDate.split("T")[0]
              : "", // format YYYY-MM-DD
            });
            setdescriptionKey(2)            
          };
        })
        .catch(err => toast.error(err?.response?.data?.message || err.message))
        .finally(() => setLoading(false));
    };
  }, []);



  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Terms & Conditions</h5>
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
                  required
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
                <TextEditor
                key={descriptionKey}
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Enter terms and conditions..."
                  height={200}
                />
              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() =>
                    setFormData({
                      title: "Terms and Conditions",
                      effectiveDate: "",
                      description: "",
                    })
                  }
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

export default AddTermsConditionsPage;
