/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-toastify";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import SingleSelect from "../../components/Form/SingleSelect";

const InsuranceFormPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [providers, setProviders] = useState([]);

  const [formData, setFormData] = useState({
    providerId: "",
    companyName: "",
    policyNumber: "",
    insuranceType: "",
    issueDate: "",
    expiryDate: "",
    coverageDetail: "",
    emergencyNumber: "",
    remarks: "",
    isRenewed: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });

        if (res.data.success) {
          setProviders(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apis.insurance.get}/${id}`, {
            headers: { Authorization: validToken },
          });

          if (res.data.success) {
            setFormData({
              providerId: res.data.data.providerId?._id || "",
              companyName: res.data.data.companyName || "",
              policyNumber: res.data.data.policyNumber || "",
              insuranceType: res.data.data.insuranceType || "",
              issueDate: res.data.data.issueDate
                ? res.data.data.issueDate.split("T")[0]
                : "",
              expiryDate: res.data.data.expiryDate
                ? res.data.data.expiryDate.split("T")[0]
                : "",
              coverageDetail: res.data.data.coverageDetail || "",
              emergencyNumber: res.data.data.emergencyNumber || "",
              remarks: res.data.data.remarks || "",
              isRenewed:
                res.data.data.isRenewed === true
                  ? "true"
                  : res.data.data.isRenewed === false
                    ? "false"
                    : "",
            });

            if (res.data.data.image) {
              setPreview(`${BASE_URL}/${res.data.data.image}`);
            }
          }
        } catch (err) {
          console.log(err)
          toast.error("Failed to fetch data");
        }
      };

      fetchData();
    }
  }, [id, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    if (!formData.policyNumber.trim()) {
      toast.error("Policy number is required");
      return;
    }

    if (!formData.providerId) {
      toast.error("Provider is required");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      setLoading(true);
      let res;

      if (id) {
        res = await axios.patch(`${apis.insurance.update}/${id}`, data, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post(apis.insurance.create, data, {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (res.data.success) {
        toast.success(`${id ? "Updated" : "Created"} successfully`);
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && !id) URL.revokeObjectURL(preview);
    };
  }, [preview, id]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{id ? "Update" : "Add"}</h5>
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

                  <SingleSelect
                    optionsList={providers}
                    value={formData.providerId}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        providerId: val,
                      })
                    }
                    placeholder="Select Provider"
                    labelKey="name"
                    valueKey="_id"
                  />
                </div>

                {/* Company Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Company Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Policy Number */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Policy Number <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Insurance Type */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Insurance Type <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Issue Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Issue Date <span className="text-danger">*</span></label>
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
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expiry Date <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {/* Emergency Number */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Emergency Number</label>
                  <input
                    type="text"
                    name="emergencyNumber"
                    value={formData.emergencyNumber}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Is Renewed */}
                {id && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Is Renewed</label>
                    <select
                      name="isRenewed"
                      value={formData.isRenewed}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Option</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                )}
                {
                  id && (
                    <div className="col-12 mb-3">
                      <label className="form-label">Remarks</label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                      />
                    </div>
                  )
                }
              </div>

              {/* Coverage Detail */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Coverage Detail</label>
                <textarea
                  name="coverageDetail"
                  value={formData.coverageDetail}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <div
                  {...getRootProps()}
                  className={`border p-4 text-center rounded ${isDragActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here...</p>
                  ) : (
                    <p>
                      Drag & drop image here or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>

                {preview && (
                  <div className="mt-3 text-center">
                    <img
                      src={preview}
                      alt="Preview"
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
                    setFormData({
                      providerId: "",
                      companyName: "",
                      policyNumber: "",
                      insuranceType: "",
                      issueDate: "",
                      expiryDate: "",
                      coverageDetail: "",
                      emergencyNumber: "",
                      remarks: "",
                    });
                    setImage(null);
                    setPreview(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (id ? "Updating..." : "Saving...") : id ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default InsuranceFormPage;
