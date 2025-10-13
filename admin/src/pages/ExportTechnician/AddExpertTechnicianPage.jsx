import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddExpertTechnicianPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [mainTitle, setMainTitle] = useState("");
  const [points, setPoints] = useState([{ icon: "", title: "" }]);
  const [pointIcons, setPointIcons] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch services
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

  const handlePointChange = (index, field, value) => {
    const updated = [...points];
    updated[index][field] = value;
    setPoints(updated);
  };

  const handlePointIconChange = (index, file) => {
    const updatedIcons = [...pointIcons];
    updatedIcons[index] = file;
    setPointIcons(updatedIcons);

    const updatedPoints = [...points];
    updatedPoints[index].icon = URL.createObjectURL(file); // preview
    setPoints(updatedPoints);
  };

  const addPointField = () => {
    setPoints([...points, { icon: "", title: "" }]);
    setPointIcons([...pointIcons, null]);
  };

  const removePointField = (index) => {
    setPoints(points.filter((_, i) => i !== index));
    setPointIcons(pointIcons.filter((_, i) => i !== index));
  };

  const handleImageChange = (file) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

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
      const formData = new FormData();
      formData.append("mainTitle", mainTitle);

      const filteredPoints = points.filter((p) => p.title.trim() !== "");
      formData.append(
        "points",
        JSON.stringify(filteredPoints.map((p) => ({ title: p.title })))
      );

      // Attach point icons
      pointIcons.forEach((file) => {
        if (file) formData.append("icons", file);
      });

      // Attach main image
      if (image) formData.append("image", image);

      // Attach services
      selectedServices.forEach((id) => {
        formData.append("services[]", id);
      });

      const res = await axios.post(apis.expertTechnician.create, formData, {
        headers: {
          Authorization: validToken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data?.success) {
        toast.success("Expert Technician created successfully");
        setMainTitle("");
        setPoints([{ icon: "", title: "" }]);
        setPointIcons([]);
        setImage(null);
        setImagePreview(null);
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
            <h5 className="mb-0">Add Expert Technician</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
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

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Main Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "5px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Points */}
              <div className="mb-3">
                <label className="form-label">Points (Icon + Title)</label>
                {points.map((point, index) => (
                  <div key={index} className="border p-3 mb-2 rounded">
                    <div className="row align-items-center">
                      <div className="col-md-4 mb-2">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) =>
                            handlePointIconChange(index, e.target.files[0])
                          }
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          value={point.title}
                          onChange={(e) =>
                            handlePointChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-4 d-flex align-items-center">
                        {point.icon && (
                          <img
                            src={point.icon}
                            alt="icon-preview"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "4px",
                              marginRight: "10px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => removePointField(index)}
                          disabled={points.length === 1}
                        >
                          -
                        </button>
                        {index === points.length - 1 && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={addPointField}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
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

export default AddExpertTechnicianPage;
