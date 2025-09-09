import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    };

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);

      const response = await axios.post(
        apis.category.create,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: validToken,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Category created successfully");
        setFormData({ name: "", shortDescription: "", fullDescription: "" });
        setImage(null);
        setPreview(null);
        navigate("/categories")
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Category</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">Category Name <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="100"
                  required
                />
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="250"
                />
              </div>

              {/* Full Description */}
              <div className="mb-3">
                <label className="form-label">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Drag & Drop Image */}
              <div className="mb-3">
                <label className="form-label">Category Image</label>
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
                {/* Image Preview */}
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

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setFormData({ name: "", shortDescription: "", fullDescription: "" });
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>
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

export default AddCategoryPage;
