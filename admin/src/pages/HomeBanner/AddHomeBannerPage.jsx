import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const AddHomeBannerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    link: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    if (!image) {
      toast.error("Banner image is required");
      return;
    };

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("image", image);

      const response = await axios.post(apis.banner.create, data, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.success) {
        toast.success("Banner created successfully");
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
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Create Banner</h5>
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
                <button type="reset" className="btn btn-secondary me-2" onClick={() => { setFormData({ title: "", link: "", status: true }); setImage(null); setPreview(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHomeBannerPage;
