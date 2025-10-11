import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddGIPromisePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [titles, setTitles] = useState([""]);
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
        setServices(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services");
      }
    };
    fetchServices();
  }, [validToken]);

  const handleTitleChange = (index, value) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const addTitleField = () => setTitles([...titles, ""]);
  const removeTitleField = (index) => setTitles(titles.filter((_, i) => i !== index));

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
        titles: titles.filter((t) => t.trim() !== ""),
        services: selectedServices,
      };

      const res = await axios.post(apis.giPromise.create, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("GI Promise created successfully");
        setMainTitle("");
        setTitles([""]);
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
            <h5 className="mb-0">Add GI Promise</h5>
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

              {/* Multiple Titles */}
              <div className="mb-3">
                <label className="form-label">Titles</label>
                {titles.map((title, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeTitleField(index)} disabled={titles.length === 1}>
                      -
                    </button>
                    {index === titles.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addTitleField}>
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

export default AddGIPromisePage;
