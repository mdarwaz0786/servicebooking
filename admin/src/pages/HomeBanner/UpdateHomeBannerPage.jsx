import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const UpdateHomeBannerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({ title: "", link: "" });

  // Desktop Banner
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Mobile Banner
  const [mobileBanner, setMobileBanner] = useState(null);
  const [mobileBannerPreview, setMobileBannerPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // ---------------------- LOAD DATA ----------------------
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${apis.banner.get}/${id}`, {
          headers: { Authorization: validToken },
        })
        .then((res) => {
          if (res.data?.success) {
            const { title, link, image, mobileBanner } = res.data.data;

            setFormData({ title, link });

            if (image) setPreview(`${BASE_URL}/${image}`);
            if (mobileBanner)
              setMobileBannerPreview(`${BASE_URL}/${mobileBanner}`);
          }
        })
        .catch((err) =>
          toast.error(err?.response?.data?.message || err.message)
        )
        .finally(() => setLoading(false));
    }
  }, [id, validToken]);

  // ---------------------- INPUT HANDLER ----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ---------------------- DROPZONE: DESKTOP ----------------------
  const onDropImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (preview) URL.revokeObjectURL(preview);
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [preview]
  );

  const desktopDropzone = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ---------------------- DROPZONE: MOBILE BANNER ----------------------
  const onDropMobileBanner = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (mobileBannerPreview) URL.revokeObjectURL(mobileBannerPreview);
        setMobileBanner(file);
        setMobileBannerPreview(URL.createObjectURL(file));
      }
    },
    [mobileBannerPreview]
  );

  const mobileDropzone = useDropzone({
    onDrop: onDropMobileBanner,
    accept: { "image/*": [] },
    multiple: false,
  });

  // ---------------------- SUBMIT FORM ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !preview) {
      toast.error("Desktop banner image is required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      console.log(mobileBanner)

      if (image) data.append("image", image);
      if (mobileBanner) data.append("mobileBanner", mobileBanner);

      const response = await axios.patch(`${apis.banner.update}/${id}`, data, {
        headers: {
          Authorization: validToken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Banner updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- CLEANUP ----------------------
  useEffect(() => {
    return () => {
      if (preview && image) URL.revokeObjectURL(preview);
      if (mobileBannerPreview && mobileBanner)
        URL.revokeObjectURL(mobileBannerPreview);
    };
  }, [preview, image, mobileBannerPreview, mobileBanner]);

  // ---------------------- UI ----------------------
  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Wide Banner</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* TITLE */}
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

              {/* LINK */}
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

              {/* DESKTOP BANNER */}
              <div className="mb-3">
                <label className="form-label">
                  Desktop Banner
                </label>

                <div
                  {...desktopDropzone.getRootProps()}
                  className={`border p-4 text-center rounded ${desktopDropzone.isDragActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...desktopDropzone.getInputProps()} />
                  {desktopDropzone.isDragActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop image here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>

                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Banner Preview"
                      style={{ maxWidth: "300px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* MOBILE BANNER */}
              <div className="mb-3">
                <label className="form-label">
                  Mobile Banner
                </label>

                <div
                  {...mobileDropzone.getRootProps()}
                  className={`border p-4 text-center rounded ${mobileDropzone.isDragActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...mobileDropzone.getInputProps()} />
                  {mobileDropzone.isDragActive ? (
                    <p>Drop the mobile image here...</p>
                  ) : (
                    <p>
                      Drag & drop mobile banner image, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>

                {mobileBannerPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={mobileBannerPreview}
                      alt="Mobile Banner Preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* BUTTONS */}
              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-secondary me-2"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                    setMobileBanner(null);
                    setMobileBannerPreview(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
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

export default UpdateHomeBannerPage;
