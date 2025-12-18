import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const AddSubSubSubCategoryPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    fullDescription: "",
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to load products");
      };
    };
    fetchCategories();
  }, [validToken]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!formData.categoryId) return;
      try {
        const res = await axios.get(
          `${apis.subCategory.get}?categoryId=${formData.categoryId}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) setSubCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load varinats");
      };
    };
    fetchSubCategories();
  }, [formData.categoryId, validToken]);

  useEffect(() => {
    const fetchSubSubCategories = async () => {
      if (!formData.subCategoryId) return;
      try {
        const res = await axios.get(
          `${apis.subSubCategory.get}?subCategoryId=${formData.subCategoryId}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) setSubSubCategories(res.data.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load service process");
      };
    };
    fetchSubSubCategories();
  }, [formData.subCategoryId, validToken]);

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

    if (!formData.categoryId) return toast.error("Please select a product");
    if (!formData.subCategoryId) return toast.error("Please select a varinat");
    if (!formData.subSubCategoryId) return toast.error("Please select a service process");
    if (!formData.name.trim()) return toast.error("Name is required");

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);

      const response = await axios.post(apis.subSubSubCategory.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Nested Service Process created successfully");
        setFormData((prev) => ({
          ...prev,
          name: "",
          fullDescription: "",
        }));
        setImage(null);
        setPreview(null);
        setIcon(null);
        setIconPreview(null);
        navigate(-1);
      };
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something Went Wrong"
      );
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
            <h5 className="mb-0">Add Nested Service Process</h5>
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
                <div className="col-md-6">
                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">Product *</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          categoryId: e.target.value,
                          subCategoryId: "",
                          subSubCategoryId: "",
                        })
                      }
                      className="form-control"
                      required
                    >
                      <option value="">-- Select Product --</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Variant *</label>
                    <select
                      name="subCategoryId"
                      value={formData.subCategoryId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subCategoryId: e.target.value,
                          subSubCategoryId: "",
                        })
                      }
                      className="form-control"
                      required
                      disabled={!formData.categoryId}
                    >
                      <option value="">-- Select Variant --</option>
                      {subCategories.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Sub Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Service Process *</label>
                    <select
                      name="subSubCategoryId"
                      value={formData.subSubCategoryId}
                      onChange={handleChange}
                      className="form-control"
                      required
                      disabled={!formData.subCategoryId}
                    >
                      <option value="">-- Select Service Process --</option>
                      {subSubCategories.map((subsub) => (
                        <option key={subsub?._id} value={subsub?._id}>
                          {subsub?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name *</label>
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
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">

                  {/* Image */}
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
                </div>
                <div className="col-md-6">
                  {/* Icon */}
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
                </div>
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

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      name: "",
                      shortDescription: "",
                      fullDescription: "",
                    }));
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

export default AddSubSubSubCategoryPage;
