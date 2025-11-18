import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubSubCategoryPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          setCategories(res?.data?.data || []);
        };
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
          {
            headers: { Authorization: validToken },
          }
        );
        if (res?.data?.success) {
          setSubCategories(res?.data?.data || []);
        };
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to load variants");
      };
    };
    fetchSubCategories();
  }, [formData.categoryId, validToken]);

  useEffect(() => {
    const fetchSubSubCategory = async () => {
      try {
        const res = await axios.get(`${apis.subSubCategory.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          const subSub = res?.data?.data;
          setFormData({
            name: subSub?.name || "",
            fullDescription: subSub?.fullDescription || "",
            categoryId: subSub?.categoryId || "",
            subCategoryId: subSub?.subCategoryId || "",
          });
          if (subSub?.image) setPreview(`${BASE_URL}/${subSub?.image}`);
          if (subSub?.icon) setIconPreview(`${BASE_URL}/${subSub?.icon}`);
        };
      } catch (error) {
        console.log(error);
        toast.error("Failed to load Service Process");
      };
    };
    if (id) fetchSubSubCategory();
  }, [id, validToken]);

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

  const { getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconActive
  } = useDropzone({
    onDrop: onDropIcon,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryId) {
      toast.error("Please select a product");
      return;
    };

    if (!formData.subCategoryId) {
      toast.error("Please select a variant");
      return;
    };

    if (!formData.name.trim()) {
      toast.error("Service Process name is required");
      return;
    };

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);

      const response = await axios.patch(`${apis.subSubCategory.update}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Service Process updated successfully");
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
    };
  }, [preview, iconPreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Service Process</h5>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Category Select */}
              <div className="mb-3">
                <label className="form-label">Select Product <span style={{ color: "red" }}>*</span></label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value, subCategoryId: "" })
                  }
                  className="form-control"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories?.map((cat) => (
                    <option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Select */}
              <div className="mb-3">
                <label className="form-label">Select variant <span style={{ color: "red" }}>*</span></label>
                <select
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={handleChange}
                  className="form-control"
                  required
                  disabled={!formData.categoryId}
                >
                  <option value="">-- Select Variant --</option>
                  {subCategories?.map((sub) => (
                    <option key={sub?._id} value={sub?._id}>
                      {sub?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name <span style={{ color: "red" }}>*</span></label>
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

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Banner</label>
                <div {...getImageRootProps()} className={`border p-4 text-center rounded ${isImageActive ? "bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input {...getImageInputProps()} />
                  {isImageActive ? <p>Drop the banner here...</p> : <p>Drag & drop banner here, or <span className="text-primary">browse</span></p>}
                </div>
                {preview && (
                  <div className="mt-3 text-center">
                    <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className="mb-3">
                <label className="form-label">Icon</label>
                <div {...getIconRootProps()} className={`border p-4 text-center rounded ${isIconActive ? "bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input {...getIconInputProps()} />
                  {isIconActive ? <p>Drop the icon here...</p> : <p>Drag & drop icon here, or <span className="text-primary">browse</span></p>}
                </div>
                {iconPreview && (
                  <div className="mt-3 text-center">
                    <img src={iconPreview} alt="Icon Preview" style={{ maxWidth: "100px", borderRadius: "8px" }} />
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

export default UpdateSubSubCategoryPage;
