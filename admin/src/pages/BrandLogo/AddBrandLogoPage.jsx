import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddBrandLogoPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icons, setIcons] = useState([{ file: null, preview: null }]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch services for the multi-select
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        setServices(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);

  // Handle icon change
  const handleIconChange = (index, file) => {
    const updated = [...icons];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    updated[index].file = file;
    updated[index].preview = URL.createObjectURL(file);
    setIcons(updated);
  };

  const addIconField = () => setIcons([...icons, { file: null, preview: null }]);
  const removeIconField = (index) => {
    const updated = [...icons];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    setIcons(updated.filter((_, i) => i !== index));
  };

  // Submit form
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
      formData.append("description", description);

      // Append selected service IDs
      selectedServices.forEach((id) => formData.append("services[]", id));

      // Append icon files
      icons.forEach((iconObj) => {
        if (iconObj.file) formData.append("icons", iconObj.file);
      });

      const res = await axios.post(apis.brandLogo.create, formData, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success("Brand logo created successfully");
        setMainTitle("");
        setDescription("");
        setIcons([{ file: null, preview: null }]);
        setSelectedServices([]);
      }
    } catch (error) {
      console.error(error);
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
            <h5 className="mb-0">Add Brand Logo</h5>
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

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Icons */}
              <div className="mb-3">
                <label className="form-label">Icons</label>
                {icons.map((iconObj, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="file"
                      className="form-control me-2"
                      onChange={(e) => handleIconChange(index, e.target.files[0])}
                      accept="image/*"
                    />
                    {iconObj.preview && (
                      <img
                        src={iconObj.preview}
                        alt="Preview"
                        style={{ width: "50px", height: "50px", marginRight: "5px", borderRadius: "4px" }}
                      />
                    )}
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeIconField(index)} disabled={icons.length === 1}>
                      -
                    </button>
                    {index === icons.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addIconField}>
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

export default AddBrandLogoPage;
