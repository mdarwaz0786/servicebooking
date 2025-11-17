/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../components/Form/TextEditor";

const AddBlogPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [frontImage, setFrontImage] = useState(null);
  const [detailImage, setDetailImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [detailPreview, setDetailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.blogCategory.get, {
          headers: {
            Authorization: validToken,
          }
        });
        if (res?.data?.success) {
          setCategories(res?.data?.data || []);
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleFullDescriptionChange = (editorContent) => {
    const value = typeof editorContent === "object" && editorContent.target?.value
      ? editorContent.target.value
      : editorContent;

    setFormData({ ...formData, fullDescription: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDropFront = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFrontImage(file);
      setFrontPreview(URL.createObjectURL(file));
    }
  }, []);

  const onDropDetail = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setDetailImage(file);
      setDetailPreview(URL.createObjectURL(file));
    }
  }, []);

  const {
    getRootProps: getFrontRootProps,
    getInputProps: getFrontInputProps,
    isDragActive: isFrontActive,
  } = useDropzone({
    onDrop: onDropFront,
    accept: { "image/*": [] },
    multiple: false,
  });

  const {
    getRootProps: getDetailRootProps,
    getInputProps: getDetailInputProps,
    isDragActive: isDetailActive,
  } = useDropzone({
    onDrop: onDropDetail,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Blog title is required");
      return;
    }

    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (frontImage) data.append("frontImage", frontImage);
      if (detailImage) data.append("detailImage", detailImage);

      const res = await axios.post(apis.blog.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (res.data.success) {
        toast.success("Blog created successfully");
        setFormData({ category: "", title: "", shortDescription: "", fullDescription: "" });
        setFrontImage(null);
        setFrontPreview(null);
        setDetailImage(null);
        setDetailPreview(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (detailPreview) URL.revokeObjectURL(detailPreview);
    };
  }, [frontPreview, detailPreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Blog</h5>
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
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">
                  Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="mb-3">
                <label className="form-label">
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="150"
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
                <TextEditor
                  value={formData.fullDescription}
                  onChange={handleFullDescriptionChange}
                  placeholder="Enter full blog content..."
                />
              </div>

              {/* Front Image */}
              <div className="mb-3">
                <label className="form-label">Front Image</label>
                <div
                  {...getFrontRootProps()}
                  className={`border p-4 text-center rounded ${isFrontActive ? "bg-light" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getFrontInputProps()} />
                  {isFrontActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop front image here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {frontPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={frontPreview}
                      alt="Front Preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* Detail Image */}
              <div className="mb-3">
                <label className="form-label">Detail Image</label>
                <div
                  {...getDetailRootProps()}
                  className={`border p-4 text-center rounded ${isDetailActive ? "bg-light" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getDetailInputProps()} />
                  {isDetailActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop detail image here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {detailPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={detailPreview}
                      alt="Detail Preview"
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
                    setFormData({ category: "", title: "", shortDescription: "", fullDescription: "" });
                    setFrontImage(null);
                    setFrontPreview(null);
                    setDetailImage(null);
                    setDetailPreview(null);
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

export default AddBlogPage;
