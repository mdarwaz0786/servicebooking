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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`${apis.banner.get}/${id}`, { headers: { Authorization: validToken } })
        .then(res => {
          if (res.data?.success) {
            const { title, link, image } = res.data.data;
            setFormData({ title, link });
            if (image) setPreview(`${BASE_URL}/${image}`);
          };
        })
        .catch(err => toast.error(err?.response?.data?.message || err.message))
        .finally(() => setLoading(false));
    };
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setImage(file);
      setPreview(URL.createObjectURL(file));
    };
  }, [preview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !preview) {
      toast.error("Banner image is required");
      return;
    };

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append("image", image);

      const response = await axios.patch(`${apis.banner.update}/${id}`, data, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        toast.success("Banner updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      if (preview && image) URL.revokeObjectURL(preview);
    };
  }, [preview, image]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Banner</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>← Back</button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" maxLength="100" />
              </div>

              <div className="mb-3">
                <label className="form-label">Link</label>
                <input type="text" name="link" value={formData.link} onChange={handleChange} className="form-control" maxLength="250" />
              </div>

              <div className="mb-3">
                <label className="form-label">Banner Image <span className="text-danger">*</span></label>
                <div {...getRootProps()} className={`border p-4 text-center rounded ${isDragActive ? "bg-light" : ""}`} style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  {isDragActive ? <p>Drop the image here...</p> : <p>Drag & drop image here, or <span className="text-primary">browse</span></p>}
                </div>
                {preview && <div className="mt-3 text-center"><img src={preview} alt="Banner Preview" style={{ maxWidth: "300px", borderRadius: "8px" }} /></div>}
              </div>

              <div className="text-end">
                <button type="reset" className="btn btn-secondary me-2" onClick={() => { setImage(null); setPreview(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Update"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHomeBannerPage;
