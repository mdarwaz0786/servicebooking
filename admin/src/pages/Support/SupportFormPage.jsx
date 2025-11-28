import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import SingleSelect from "../../components/Form/SingleSelect";

const SupportFormPageFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    ticketNumber: "",
    name: "",
    userType: "",
    mobile: "",
    subject: "",
    priority: "",
    description: "",
    reply: "",
    scheduleTicket: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.supportTicket.get}/${id}`, {
            headers: { Authorization: validToken },
          });
          if (res.data.success) {
            setFormData({
              ticketNumber: res.data.data.ticketNumber || "",
              name: res.data.data.name || "",
              userType: res.data.data.userType || "",
              mobile: res.data.data.mobile || "",
              subject: res.data.data.subject || "",
              priority: res.data.data.priority || "",
              description: res.data.data.description || "",
              reply: res.data.data.reply || "",
              scheduleTicket: res.data.data.scheduleTicket || "",
            });
            if (res.data.data.image) {
              setPreview(`${BASE_URL}/${res.data.data.image}`);
            };
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || "Failed to fetch data");
        }
      };
      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBrandChange = (selectedId) => {
    setFormData({ ...formData, brandId: selectedId });
  };

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      setLoading(true);
      let res;
      if (id) {
        res = await axios.patch(`${apis.supportTicket.update}/${id}`, data, {
          headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(apis.supportTicket.create, data, {
          headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
        });
      }

      if (res.data.success) {
        toast.success(`${id ? "updated" : "created"} successfully`);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && !id) URL.revokeObjectURL(preview);
    };
  }, [preview, id]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Stock <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">
                      Price <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Brand */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Brand <span style={{ color: "red" }}>*</span>
                    </label>
                    <SingleSelect
                      optionsList={brand}
                      value={formData.brandId}
                      onChange={handleBrandChange}
                      placeholder="Select brand"
                      labelKey="name"
                      valueKey="_id"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Part Type
                    </label>
                    <input
                      type="text"
                      name="partType"
                      value={formData.partType}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Image</label>
                <div
                  {...getRootProps()}
                  className={`border p-4 text-center rounded ${isDragActive ? "bg-light" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop image here, or <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setFormData({ name: "", code: "", description: "" });
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportFormPage;
