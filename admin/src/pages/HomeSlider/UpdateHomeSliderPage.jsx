import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const UpdateHomeSliderPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ title: "", link: "" });
  const [image, setImage] = useState(null);                 // Desktop banner
  const [mobileImage, setMobileImage] = useState(null);     // Mobile banner
  const [preview, setPreview] = useState(null);
  const [mobilePreview, setMobilePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- Fetch Existing Slider ----------------
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${apis.slider.get}/${id}`, { headers: { Authorization: validToken } })
        .then((res) => {
          if (res.data?.success) {
            const { title, link, image, mobileBanner } = res.data.data;
            setFormData({ title, link });

            if (image) setPreview(`${BASE_URL}/${image}`);
            if (mobileBanner) setMobilePreview(`${BASE_URL}/${mobileBanner}`);
          }
        })
        .catch((err) => toast.error(err?.response?.data?.message || err.message))
        .finally(() => setLoading(false));
    }
  }, [id, validToken]);

  // ---------------- Input Change Handler ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ---------------- Desktop Banner Upload ----------------
  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ---------------- Mobile Banner Upload ----------------
  const onDropMobileImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (mobilePreview?.startsWith("blob:")) URL.revokeObjectURL(mobilePreview);
      setMobileImage(file);
      setMobilePreview(URL.createObjectURL(file));
    }
  }, [mobilePreview]);

  const {
    getRootProps: getMobileRootProps,
    getInputProps: getMobileInputProps,
    isDragActive: isMobileDragActive,
  } = useDropzone({
    onDrop: onDropMobileImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ---------------- Submit Update ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !preview) {
      toast.error("Desktop banner is required");
      return;
    }

    if (!mobileImage && !mobilePreview) {
      toast.error("Mobile banner is required");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append("image", image);
      if (mobileImage) data.append("mobileBanner", mobileImage);

      const response = await axios.patch(`${apis.slider.update}/${id}`, data, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        toast.success("Slider updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Cleanup previews ----------------
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
      if (mobilePreview?.startsWith("blob:")) URL.revokeObjectURL(mobilePreview);
    };
  }, [preview, mobilePreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Front Banner</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>← Back</button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="100"
                />
              </div>

              {/* Link */}
              <div className="mb-3">
                <label className="form-label">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="form-control"
                  maxLength="250"
                />
              </div>

              {/* Desktop Banner */}
              <div className="mb-3">
                <label className="form-label">Desktop Banner <span className="text-danger">*</span></label>
                <div {...getRootProps()} className={`border p-4 text-center rounded ${isDragActive ? "bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the desktop banner here...</p> : <p>Drag & drop desktop banner here, or <span className="text-primary">browse</span></p>}
                </div>
                {preview && (
                  <div className="mt-3 text-center">
                    <img src={preview} alt="Desktop Banner Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              {/* Mobile Banner */}
              <div className="mb-3">
                <label className="form-label">Mobile Banner <span className="text-danger">*</span></label>
                <div {...getMobileRootProps()} className={`border p-4 text-center rounded ${isMobileDragActive ? "bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input {...getMobileInputProps()} />
                  {isMobileDragActive ? <p>Drop the mobile banner here...</p> : <p>Drag & drop mobile banner here, or <span className="text-primary">browse</span></p>}
                </div>
                {mobilePreview && (
                  <div className="mt-3 text-center">
                    <img src={mobilePreview} alt="Mobile Banner Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                  </div>
                )}
              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setImage(null);
                    setMobileImage(null);
                    setPreview(null);
                    setMobilePreview(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHomeSliderPage;
