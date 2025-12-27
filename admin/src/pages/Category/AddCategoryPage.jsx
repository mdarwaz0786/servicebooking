import { useState, useCallback, useEffect } from "react";
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
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [metaImage, setMetaImage] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fullDescription: "",
    pageName: "",
    metaTitle: "",
    metaAuthor: "",
    metaKeywords: "",
    metaDescription: "",
  });

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
    isDragActive: isImageActive
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
    isDragActive: isIconActive
  } = useDropzone({
    onDrop: onDropIcon,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onDropMetaImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setMetaImage(file);
      setMetaImagePreview(URL.createObjectURL(file));
    };
  }, []);

  const {
    getRootProps: getMetaImageRootProps,
    getInputProps: getMetaImageInputProps,
    isDragActive: isMetaImageActive
  } = useDropzone({
    onDrop: onDropMetaImage,
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
      if (metaImage) data.append("metaImage", metaImage);

      const response = await axios.post(apis.category.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Category created successfully");
        setFormData({ name: "", shortDescription: "", fullDescription: "" });
        setImage(null);
        setPreview(null);
        setIcon(null);
        setIconPreview(null);
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (iconPreview) URL.revokeObjectURL(iconPreview);
      if (metaImagePreview) URL.revokeObjectURL(metaImagePreview);
    };
  }, [preview, iconPreview, metaImagePreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Product</h5>
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
                {/* Category Name */}
                <div className="col-md-6 mb-3">
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

                {/* Description */}
                <div className=" col-md-6 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    className="form-control"
                    rows="1"
                  ></textarea>
                </div>
              </div>

              <div className="row">
                {/* Category Image */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Banner</label>
                  <div
                    {...getImageRootProps()}
                    className={`border text-center rounded ${isImageActive ? "bg-light" : ""}`}
                    style={{ cursor: "pointer", padding: "9px" }}
                  >
                    <input {...getImageInputProps()} />
                    {isImageActive ? <p style={{ marginBottom: "0px" }}>Drop the banner here...</p> : <p style={{ marginBottom: "0px" }}>Drag & drop banner here, or <span className="text-primary">browse</span></p>}
                  </div>
                  {preview && (
                    <div className="mt-3 text-center">
                      <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                    </div>
                  )}
                </div>

                {/* Category Icon */}
                <div className=" col-md-6 mb-3">
                  <label className="form-label">Icon</label>
                  <div
                    {...getIconRootProps()}
                    className={`border text-center rounded ${isIconActive ? "bg-light" : ""}`}
                    style={{ cursor: "pointer", padding: "9px" }}
                  >
                    <input {...getIconInputProps()} />
                    {isIconActive ? <p style={{ marginBottom: "0px" }}>Drop the icon here...</p> : <p style={{ marginBottom: "0px" }}>Drag & drop icon here, or <span className="text-primary">browse</span></p>}
                  </div>
                  {iconPreview && (
                    <div className="mt-3 text-center">
                      <img src={iconPreview} alt="Icon Preview" style={{ maxWidth: "100px", borderRadius: "8px" }} />
                    </div>
                  )}
                </div>
              </div>

              <h4 className="mt-5 mb-4 text-center">Meta Information</h4>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Page Name
                  </label>
                  <input
                    type="text"
                    name="pageName"
                    value={formData.pageName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Meta Title (max character 100)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Meta Author
                  </label>
                  <input
                    type="text"
                    name="metaAuthor"
                    value={formData.metaAuthor}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Meta Description (max character 300)
                  </label>
                  <input
                    type="text"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={300}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Meta Image</label>
                  <div
                    {...getMetaImageRootProps()}
                    className={`border text-center rounded ${isMetaImageActive ? "bg-light" : ""}`}
                    style={{ cursor: "pointer", padding: "9px" }}
                  >
                    <input {...getMetaImageInputProps()} />
                    {isMetaImageActive ? <p style={{ marginBottom: "0px" }}>Drop the meta image here...</p> : <p style={{ marginBottom: "0px" }}>Drag & drop meta image here, or <span className="text-primary">browse</span></p>}
                  </div>
                  {metaImagePreview && (
                    <div className="mt-3 text-center">
                      <img src={metaImagePreview} alt="Meta Image Preview" style={{ maxWidth: "100px", borderRadius: "8px" }} />
                    </div>
                  )}
                </div>
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
                    setIcon(null);
                    setIconPreview(null);
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
