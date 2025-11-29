/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../../components/Form/RichTextEditor";

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
    frontImageAlt: "",
    detailImageAlt: "",
    metaKeywords: "",
    metaAuthor: "",
    metaDescription: "",
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

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, dullDescription: value }));
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
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("fullDescription", formData.fullDescription);

      data.append("frontImageAlt", formData.frontImageAlt);
      data.append("detailImageAlt", formData.detailImageAlt);

      data.append("meta[keywords]", formData.metaKeywords);
      data.append("meta[author]", formData.metaAuthor);
      data.append("meta[description]", formData.metaDescription);

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
        navigate(-1);
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
              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
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
                <RichTextEditor
                  value={formData.fullDescription}
                  onChange={handleDescriptionChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
                  {/* FRONT IMAGE ALT */}
                  <div className="mb-3">
                    <label className="form-label">Front Image Alt Text</label>
                    <input
                      type="text"
                      name="frontImageAlt"
                      className="form-control"
                      value={formData.frontImageAlt}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
                  {/* DETAIL IMAGE ALT */}
                  <div className="mb-3">
                    <label className="form-label">Detail Image Alt Text</label>
                    <input
                      type="text"
                      name="detailImageAlt"
                      className="form-control"
                      value={formData.detailImageAlt}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* META FIELDS */}
              <h6 className="mt-4 mb-3 text-center">SEO Meta Information</h6>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Meta Keywords</label>
                    <input
                      type="text"
                      name="metaKeywords"
                      className="form-control"
                      value={formData.metaKeywords}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Meta Author</label>
                    <input
                      type="text"
                      name="metaAuthor"
                      className="form-control"
                      value={formData.metaAuthor}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Meta Description</label>
                <textarea
                  name="metaDescription"
                  className="form-control"
                  rows="3"
                  value={formData.metaDescription}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setFormData({ category: "", title: "", shortDescription: "", fullDescription: "", metaAuthor: "", metaKeywords: "", metaDescription: "" });
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
