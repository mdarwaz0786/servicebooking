import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateRequirementFromCustomerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [mainTitle, setMainTitle] = useState("");
  const [requirements, setRequirements] = useState([{ name: "", icon: null, preview: null }]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res.data.data || []);
      } catch {
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);

  // Fetch existing requirement
  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await axios.get(`${apis.requirementFromCustomer.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success && res.data.data) {
          const data = res.data.data;
          setMainTitle(data.mainTitle || "");
          setSelectedServices(data.services?.map(s => s._id) || []);

          // Prepare requirements with preview
          if (data.requirements?.length) {
            const formatted = data.requirements.map(req => ({
              name: req.name || "",
              icon: null,
              preview: req.icon ? `${BASE_URL}/${req.icon}` : null,
            }));
            setRequirements(formatted);
          }
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load requirement data");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchRequirement();
  }, [id, validToken]);

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
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainTitle.trim()) return toast.error("Main title is required");
    if (selectedServices.length === 0) return toast.error("Please select at least one service");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mainTitle", mainTitle);

      selectedServices.forEach((id, index) => {
        formData.append(`services[${index}]`, id);
      });

      requirements.forEach((req, idx) => {
        formData.append(`requirements[${idx}][name]`, req.name);
        if (req.icon instanceof File) formData.append("icons", req.icon);
      });

      const res = await axios.patch(`${apis.requirementFromCustomer.update}/${id}`, formData, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success("Requirement updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="text-center mt-5">Loading data...</div>;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Requirement From Customer</h5>
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

              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services <span style={{ color: "red" }}>*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
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
                      <img
                        src={req.preview}
                        alt="Icon Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "5px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      onClick={() => removeRequirementField(index)}
                      disabled={requirements.length === 1}
                    >
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

export default UpdateRequirementFromCustomerPage;
