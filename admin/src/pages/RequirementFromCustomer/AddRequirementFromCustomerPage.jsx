import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const AddRequirementFromCustomerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [requirements, setRequirements] = useState([{ name: "", icon: null, preview: null }]);
  const [loading, setLoading] = useState(false);

  const handleRequirementChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const handleIconChange = (index, file) => {
    const updated = [...requirements];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    updated[index].icon = file;
    updated[index].preview = URL.createObjectURL(file);
    setRequirements(updated);
  };

  const addRequirementField = () => setRequirements([...requirements, { name: "", icon: null, preview: null }]);
  const removeRequirementField = (index) => {
    const updated = [...requirements];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    setRequirements(updated.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mainTitle", mainTitle);

      requirements.forEach((req, idx) => {
        formData.append(`requirements[${idx}][name]`, req.name);
        if (req.icon) formData.append("icons", req.icon);
      });

      const res = await axios.post(apis.requirementFromCustomer.create, formData, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success("Requirement created successfully");
        setMainTitle("");
        setRequirements([{ name: "", icon: null, preview: null }]);
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
            <h5 className="mb-0">Create Requirement From Customer</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  required
                />
              </div>

              {/* Requirements */}
              <div className="mb-3">
                <label className="form-label">Requirements</label>
                {requirements.map((req, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Title"
                      value={req.name}
                      onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
                    />
                    <input
                      type="file"
                      className="form-control me-2"
                      onChange={(e) => handleIconChange(index, e.target.files[0])}
                      accept="image/*"
                    />
                    {req.preview && (
                      <img src={req.preview} alt="Icon Preview" style={{ width: "50px", height: "50px", marginRight: "5px", borderRadius: "4px" }} />
                    )}
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeRequirementField(index)} disabled={requirements.length === 1}>
                      -
                    </button>
                    {index === requirements.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addRequirementField}>
                        +
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-end">
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

export default AddRequirementFromCustomerPage;
