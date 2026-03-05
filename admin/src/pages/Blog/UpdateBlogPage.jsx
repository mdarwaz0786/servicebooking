/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../components/Form/Editor";
import LocationPicker from "../../components/Map/LocationPicker";

const UpdateBlogPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [frontImage, setFrontImage] = useState(null);
  const [detailImage, setDetailImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [detailPreview, setDetailPreview] = useState(null);
  const [metaImage, setMetaImage] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    frontImageAlt: "",
    detailImageAlt: "",
    tags: "",
    isComment: "enabled",
    publishStatus: "draft",
    publishDate: "",
    author: "",
    lat: "",
    long: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    address: "",
    canonicalTag: "",
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
          headers: { Authorization: validToken }
        });

        if (res?.data?.success) {
          setCategories(res.data.data || []);
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${apis.blog.get}/${id}`, {
          headers: { Authorization: validToken }
        });

        if (res?.data?.success) {
          const blog = res.data.data;
          const meta = res.data.meta;

          setFormData({
            category: blog.category?._id || "",
            title: blog.title || "",
            slug: blog.slug || "",
            shortDescription: blog.shortDescription || "",
            fullDescription: blog.fullDescription || "",
            frontImageUrl: blog.frontImage || "",
            detailImageUrl: blog.detailImage || "",
            frontImageAlt: blog.frontImageAlt,
            detailImageAlt: blog.detailImageAlt,
            pageName: meta?.pageName || "",
            metaTitle: meta?.metaTitle || "",
            metaAuthor: meta?.metaAuthor || "",
            metaKeywords: meta?.metaKeywords || "",
            metaDescription: meta?.metaDescription || "",
            tags: blog.tags || "",
            author: blog.author || "",
            canonicalTag: blog.canonicalTag || "",
            isComment: blog.isComment || "enabled",
            publishStatus: blog.publishStatus || "published",
            publishDate: blog.publishDate ? blog.publishDate.split("T")[0] : "",
            city: blog.city || "",
            state: blog.state || "",
            country: blog.country || "",
            zipCode: blog.zipCode || "",
            lat: blog.lat || "",
            long: blog.long || "",
            address: blog.address || "",
          });

          if (blog?.frontImage) setFrontPreview(`${BASE_URL}/${blog?.frontImage}`);
          if (blog?.detailImage) setDetailPreview(`${BASE_URL}/${blog?.detailImage}`);
          if (meta?.image) setMetaImagePreview(`${BASE_URL}/${meta?.image}`);
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load blog");
      };
    };

    fetchBlog();
  }, [id]);

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
      toast.error("Category is required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("tags", formData.tags);
      data.append("isComment", formData.isComment);
      data.append("publishStatus", formData.publishStatus);
      data.append("publishDate", formData.publishDate);
      data.append("author", formData.author);
      data.append("lat", formData.lat);
      data.append("long", formData.long);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("country", formData.country);
      data.append("zipCode", formData.zipCode);
      data.append("canonicalTag", formData.canonicalTag);
      data.append("address", formData.address);
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

      const res = await axios.patch(`${apis.blog.update}/${id}`, data, {
        headers: {
          Authorization: validToken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Blog updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Blog</h5>
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

              <div className="row">
                <div className="col-md-6">
                  {/* Tags */}
                  <div className="mb-3">
                    <label className="form-label">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Slug*/}
                  <div className="mb-3">
                    <label className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="form-control"
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
                <Editor
                  id="blogUpdateFullDescription"
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

              {/* BLOG SETTINGS */}
              <h4 className="mt-5 text-center mb-4">Blog Settings</h4>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Author</label>
                  <input
                    name="author"
                    className="form-control"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Publish Date</label>
                  <input
                    type="date"
                    name="publishDate"
                    className="form-control"
                    value={formData.publishDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Publish Status</label>
                  <select
                    name="publishStatus"
                    className="form-select"
                    value={formData.publishStatus}
                    onChange={handleChange}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Allow Comments</label>
                  <select
                    name="isComment"
                    className="form-select"
                    value={formData.isComment}
                    onChange={handleChange}
                  >
                    <option value="enabled">Enable</option>
                    <option value="disabled">Disable</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Canonical Tag</label>
                  <input
                    name="canonicalTag"
                    className="form-control"
                    value={formData.canonicalTag}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LOCATION */}
              <h4 className="mt-5 mb-4 text-center">Location</h4>

              <div className="mb-4">
                <LocationPicker setFormData={setFormData} />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>City</label>
                  <input
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>State</label>
                  <input
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Country</label>
                  <input
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Zip Code</label>
                  <input
                    name="zipCode"
                    className="form-control"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Latitude</label>
                  <input
                    name="lat"
                    className="form-control"
                    value={formData.lat}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label>Longitude</label>
                  <input
                    name="long"
                    className="form-control"
                    value={formData.long}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label>Address</label>
                  <input
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* META INFORMATION */}
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
                    Meta Title (max character 80) {formData.metaTitle.length}/80
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={80}
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
                    Meta Keywords (comma separated)
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
                    Meta Description (max character 180) {formData.metaDescription.length}/180
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={180}
                    rows={4}
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
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>

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

export default UpdateBlogPage;
