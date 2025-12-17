/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/Form/Editor";

const AddBlogPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [frontImage, setFrontImage] = useState(null);
  const [detailImage, setDetailImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [detailPreview, setDetailPreview] = useState(null);
  const [metaImage, setMetaImage] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    shortDescription: "",
    fullDescription: "",
    frontImageAlt: "",
    detailImageAlt: "",
    pageName: "",
    metaTitle: "",
    metaAuthor: "",
    metaKeywords: "",
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
    setFormData((prev) => ({ ...prev, fullDescription: value }));
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

      if (formData.pageName) data.append("pageName", formData.pageName);
      if (formData.metaTitle) data.append("metaTitle", formData.metaTitle);
      if (formData.metaAuthor) data.append("metaAuthor", formData.metaAuthor);
      if (formData.metaKeywords) data.append("metaKeywords", formData.metaKeywords);
      if (formData.metaDescription) data.append("metaDescription", formData.metaDescription);

      if (frontImage) data.append("frontImage", frontImage);
      if (detailImage) data.append("detailImage", detailImage);
      if (metaImage) data.append("metaImage", metaImage);

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
      if (metaImagePreview) URL.revokeObjectURL(metaImagePreview);
    };
  }, [frontPreview, detailPreview, metaImagePreview]);

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
                />
              </div>

              {/* Full Description */}
              <div className="mb-3">
                <label className="form-label">Full Description</label>
                <Editor
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleDescriptionChange}
                  height={300}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Front Image */}
                  <div className="mb-3">
                    <label className="form-label">Front Image</label>
                    <div
                      {...getFrontRootProps()}
                      className={`border text-center rounded ${isFrontActive ? "bg-light" : ""}`}
                      style={{ cursor: "pointer", padding: "9px" }}
                    >
                      <input {...getFrontInputProps()} />
                      {isFrontActive ? (
                        <p style={{ marginBottom: "0px" }}>Drop the image here...</p>
                      ) : (
                        <p style={{ marginBottom: "0px" }}>
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
                      className={`border text-center rounded ${isDetailActive ? "bg-light" : ""}`}
                      style={{ cursor: "pointer", padding: "9px" }}
                    >
                      <input {...getDetailInputProps()} />
                      {isDetailActive ? (
                        <p style={{ marginBottom: "0px" }}>Drop the image here...</p>
                      ) : (
                        <p style={{ marginBottom: "0px" }}>
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
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-control"
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
                    Meta Description
                  </label>
                  <input
                    type="text"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-control"
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
