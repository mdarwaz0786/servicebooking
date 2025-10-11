import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddWhyChooseUsPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [reasons, setReasons] = useState([{ title: "", description: "" }]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch services for multi-select
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setServices(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);

  const handleReasonChange = (index, field, value) => {
    const updated = [...reasons];
    updated[index][field] = value;
    setReasons(updated);
  };

  const addReasonField = () => setReasons([...reasons, { title: "", description: "" }]);
  const removeReasonField = (index) => setReasons(reasons.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        mainTitle,
        reasons: reasons.filter((r) => r.title.trim() !== ""),
        services: selectedServices,
      };

      const res = await axios.post(apis.whyChooseUs.create, payload, {
        headers: { Authorization: validToken },
      });

      console.log(res)

      if (res?.data?.success) {
        toast.success("Why Choose Us entry created successfully");
        setMainTitle("");
        setReasons([{ title: "", description: "" }]);
        setSelectedServices([]);
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
            <h5 className="mb-0">Create Why Choose Us</h5>
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

              {/* Reasons */}
              <div className="mb-5">
                <label className="form-label">Reasons</label>
                {reasons.map((reason, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex mb-1">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Reason Title"
                        value={reason.title}
                        onChange={(e) => handleReasonChange(index, "title", e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger me-1"
                        onClick={() => removeReasonField(index)}
                        disabled={reasons.length === 1}
                      >
                        -
                      </button>
                      {index === reasons.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={addReasonField}
                        >
                          +
                        </button>
                      )}
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Reason Description"
                      value={reason.description}
                      onChange={(e) => handleReasonChange(index, "description", e.target.value)}
                    />
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

export default AddWhyChooseUsPage;
