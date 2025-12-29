import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const CertificateFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    providerId: "",
    title: "",
    number: "",
    issuedFrom: "",
    issueDate: "",
    expiryDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });

        setProviders(res?.data?.data || []);
      } catch {
        toast.error("Failed to load providers");
      }
    };

    fetchProviders();
  }, [validToken]);


  useEffect(() => {
    if (!isEdit) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apis.providerCertificate.get}/${id}`, {
          headers: { Authorization: validToken },
        });

        const d = res?.data?.data;
        setFormData({
          providerId: d?.providerId?._id || "",
          title: d?.title || "",
          number: d?.number || "",
          issuedFrom: d?.issuedFrom || "",
          issueDate: d?.issueDate?.substring(0, 10) || "",
          expiryDate: d?.expiryDate?.substring(0, 10) || "",
          description: d?.description || "",
        });
        if (d?.image) {
          setPreview(`${BASE_URL}/${d?.image}`);
        };
      } catch {
        toast.error("Failed to load certificate");
      }
    };

    fetchData();
  }, [id, isEdit, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      Object.entries(formData).forEach(([k, v]) => {
        data.append(k, v ?? "");
      });

      if (image) data.append("image", image);

      const url = isEdit
        ? `${apis.providerCertificate.update}/${id}`
        : apis.providerCertificate.create;

      const method = isEdit ? "patch" : "post";

      await axios({
        url,
        method,
        data,
        headers: {
          Authorization: validToken,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(isEdit ? "Updated successfully" : "Created successfully");
      navigate(-1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4">
        <div className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              {isEdit ? "Update Provider Certificate" : "Create Provider Certificate"}
            </h5>
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

                {/* Provider */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Provider <span className="text-danger">*</span>
                  </label>
                  <select
                    name="providerId"
                    value={formData.providerId}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">-- Select Provider --</option>
                    {providers?.map((p) => (
                      <option key={p?._id} value={p?._id}>
                        {p?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Certificate Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter certificate title"
                    required
                  />
                </div>

                {/* Certificate Number */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Certificate Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter certificate number"
                    required
                  />
                </div>

                {/* Issued From */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Issued From <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="issuedFrom"
                    value={formData.issuedFrom}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Authority / Organization"
                    required
                  />
                </div>

                {/* Certificate Image */}
                <div className="col-md-4 mb-4">
                  <label className="form-label">Certificate Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      };
                    }}
                  />
                </div>

                {/* Issue Date */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Issue Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Expiry Date */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Expiry Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {
                  preview && (
                    <div className="col-md-12 mb-4">
                      <div className="mt-0">
                        <img
                          src={preview}
                          alt="Certificate Preview"
                          className="img-thumbnail"
                          style={{ height: "100px", width: "100px", objectFit: "fill" }}
                        />
                      </div>
                    </div>
                  )
                }

                {/* Description */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                    placeholder="Optional description"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  {loading ? "Saving..." : isEdit ? "Update Certificate" : "Create Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateFormPage;
