/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useParams, useNavigate } from "react-router-dom";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const UpdateCategoryPage = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fullDescription: "",
  });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apis.category.get}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        const data = response.data.data;
        setFormData({
          name: data?.name || "",
          fullDescription: data?.fullDescription || "",
        });

        if (data?.image) setPreview(`${BASE_URL}/${data?.image}`);
        if (data?.icon) setIconPreview(`${BASE_URL}/${data?.icon}`);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch category");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    if (id) fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    };
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageActive,
  } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onDropIcon = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIcon(file);
      setIconPreview(URL.createObjectURL(file));
    };
  }, []);

  const {
    getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconActive,
  } = useDropzone({
    onDrop: onDropIcon,
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
      if (icon) data.append("icon", icon);

      const response = await axios.patch(`${apis.category.update}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Category updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update category");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (iconPreview) URL.revokeObjectURL(iconPreview);
    };
  }, [preview, iconPreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Category</h5>
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
              {/* Category Name */}
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
                  maxLength="100"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>

              {/* Category Image */}
              <div className="mb-3">
                <label className="form-label">Banner</label>
                <div
                  {...getImageRootProps()}
                  className={`border p-4 text-center rounded ${isImageActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getImageInputProps()} />
                  {isImageActive ? (
                    <p>Drop the banner here...</p>
                  ) : (
                    <p>
                      Drag & drop banner here, or{" "}
                      <span className="text-primary">browse</span>
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

              {/* Category Icon */}
              <div className="mb-3">
                <label className="form-label">Icon</label>
                <div
                  {...getIconRootProps()}
                  className={`border p-4 text-center rounded ${isIconActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getIconInputProps()} />
                  {isIconActive ? (
                    <p>Drop the icon here...</p>
                  ) : (
                    <p>
                      Drag & drop icon here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {iconPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={iconPreview}
                      alt="Icon Preview"
                      style={{ maxWidth: "100px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
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

export default UpdateCategoryPage;
