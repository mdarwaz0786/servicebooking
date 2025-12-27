/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const MetaTagFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    pageName: "",
    slug: "",
    metaTitle: "",
    metaAuthor: "",
    metaKeywords: "",
    metaDescription: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.metaTag.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res?.data?.success) {
            const d = res.data.data;
            setFormData({
              pageName: d.pageName || "",
              slug: d.slug || "",
              metaTitle: d.metaTitle || "",
              metaAuthor: d.metaAuthor || "",
              metaKeywords: d.metaKeywords || "",
              metaDescription: d.metaDescription || "",
            });
            setPreviewImage(d?.image ? `${BASE_URL}/${d.image}` : null);
          }
        } catch (err) {
          console.log(err)
          toast.error("Failed to load meta tag");
        }
      };
      fetchData();
    }
  }, [validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.slug.trim()) {
      return toast.error("Slug is required");
    }

    try {
      setLoading(true);

      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
      if (imageFile) fd.append("image", imageFile);

      let res;
      if (id) {
        res = await axios.patch(`${apis.metaTag.update}/${id}`, fd, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(apis.metaTag.create, fd, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res.data.success) {
        toast.success(id ? "Updated successfully" : "Created successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update Meta Tag" : "Add Meta Tag"}</h5>
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

                {/* PAGE NAME */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Page Name</label>
                  <input
                    type="text"
                    name="pageName"
                    value={formData.pageName}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
                  />
                </div>

                {/* SLUG */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Slug <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* META TITLE */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Meta Title (max character 100)</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
                  />
                </div>

                {/* META AUTHOR */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Meta Author</label>
                  <input
                    type="text"
                    name="metaAuthor"
                    value={formData.metaAuthor}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* META KEYWORDS */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Meta Keywords</label>
                  <textarea
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                  ></textarea>
                </div>

                {/* META DESCRIPTION */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Meta Description (max character 300)</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    maxLength={300}
                  ></textarea>
                </div>

                {/* IMAGE UPLOAD */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Image</label>
                  <input type="file" className="form-control" onChange={handleImageChange} />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="preview"
                      className="mt-2"
                      style={{ height: "80px", borderRadius: "4px" }}
                    />
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
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

export default MetaTagFormPage;
