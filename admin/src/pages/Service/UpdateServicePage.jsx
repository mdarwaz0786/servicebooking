import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis, { BASE_URL } from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../../components/Form/TextEditor";

const UpdateServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [descriptionKey, setdescriptionKey] = useState(1);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [popupImage, setPopupImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [popupImagePreview, setPopupImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    subSubSubCategoryId: "",
    name: "",
    timeTaking: "",
    mrpPrice: "",
    salePrice: "",
    taxablePrice: "",
    repairingDiagnostic: true,
    offerContent: "",
    maxBookingQuantity: "",
    taxPercent: "",
    creditPoint: "",
    transactionCharge: "",
    shortDescription: "",
    fullDescription: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${apis.service.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) {
          const s = res?.data?.data;
          setFormData({
            categoryId: s?.categoryId || "",
            subCategoryId: s.subCategoryId || "",
            subSubCategoryId: s?.subSubCategoryId || "",
            subSubSubCategoryId: s?.subSubSubCategoryId || "",
            name: s?.name || "",
            timeTaking: s?.timeTaking || "",
            mrpPrice: s?.mrpPrice || "",
            salePrice: s?.salePrice || "",
            taxablePrice: s?.taxablePrice || "",
            repairingDiagnostic: s?.repairingDiagnostic ?? true,
            offerContent: s?.offerContent || "",
            maxBookingQuantity: s?.maxBookingQuantity || "",
            taxPercent: s?.taxPercent || "",
            creditPoint: s?.creditPoint || "",
            transactionCharge: s?.transactionCharge || "",
            shortDescription: s?.shortDescription || "",
            fullDescription: s?.fullDescription || "",
          });
          if (s?.image) setPreview(`${BASE_URL}/${s?.image}`);
          if (s?.icon) setIconPreview(`${BASE_URL}/${s?.icon}`);
          if (s?.popupImage) setPopupImagePreview(`${BASE_URL}/${s?.popupImage}`);

          setdescriptionKey(2)

        };
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to load service");
      };
    };
    fetchService();
  }, [id, validToken]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to load categories");
      };
    };
    fetchCategories();
  }, [validToken]);

  useEffect(() => {
    if (!formData.categoryId) return;
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subCategory.get}?categoryId=${formData.categoryId}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) setSubCategories(res?.data?.data || []);
      } catch {
        toast.error("Failed to load sub categories");
      };
    };
    fetchSubCategories();
  }, [formData.categoryId, validToken]);

  useEffect(() => {
    if (!formData.subCategoryId) return;
    const fetchSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubCategory.get}?subCategoryId=${formData.subCategoryId}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) setSubSubCategories(res?.data?.data || []);
      } catch {
        toast.error("Failed to load sub sub categories");
      };
    };
    fetchSubSubCategories();
  }, [formData.subCategoryId, validToken]);

  useEffect(() => {
    if (!formData.subSubCategoryId) return;
    const fetchSubSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubSubCategory.get}?subSubCategoryId=${formData.subSubCategoryId}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) setSubSubSubCategories(res?.data?.data || []);
      } catch {
        toast.error("Failed to load sub sub sub categories");
      };
    };
    fetchSubSubSubCategories();
  }, [formData.subSubCategoryId, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDropImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    };
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageActive
  } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onDropIcon = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIcon(file);
      setIconPreview(URL.createObjectURL(file));
    };
  }, []);

  const {
    getRootProps: getIconRootProps,
    getInputProps: getIconInputProps,
    isDragActive: isIconActive
  } = useDropzone({
    onDrop: onDropIcon,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onDropPopupImage = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setPopupImage(file);
      setPopupImagePreview(URL.createObjectURL(file));
    };
  }, []);

  const { getRootProps: getPopupImageRootProps,
    getInputProps: getPopupImageInputProps,
    isDragActive: isPopupImageActive
  } = useDropzone({
    onDrop: onDropPopupImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Please select a category");
    if (!formData.name.trim()) return toast.error("Name is required");

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== "" && value !== undefined) {
          data.append(key, value);
        }
      });
      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);
      if (popupImage) data.append("popupImage", popupImage);

      const response = await axios.patch(`${apis.service.update}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Service updated successfully");
        navigate(-1);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update service");
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (iconPreview) URL.revokeObjectURL(iconPreview);
    };
  }, [preview, iconPreview]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Service</h5>
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
              {/* Category */}
              <div className="mb-3">
                <label className="form-label">Category *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId: e.target.value,
                      subCategoryId: "",
                      subSubCategoryId: "",
                      subSubSubCategoryId: "",
                    })
                  }
                  className="form-control"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories?.map((cat) => (
                    <option key={cat?._id} value={cat?._id}>
                      {cat?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Category */}
              <div className="mb-3">
                <label className="form-label">Sub Category</label>
                <select
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subCategoryId: e.target.value,
                      subSubCategoryId: "",
                      subSubSubCategoryId: "",
                    })
                  }
                  className="form-control"
                  disabled={!formData.categoryId}
                >
                  <option value="">-- Select Sub Category --</option>
                  {subCategories?.map((sub) => (
                    <option key={sub?._id} value={sub?._id}>
                      {sub?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Sub Category */}
              <div className="mb-3">
                <label className="form-label">Sub Sub Category</label>
                <select
                  name="subSubCategoryId"
                  value={formData.subSubCategoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subSubCategoryId: e.target.value,
                      subSubSubCategoryId: "",
                    })
                  }
                  className="form-control"
                  disabled={!formData.subCategoryId}
                >
                  <option value="">-- Select Sub Sub Category --</option>
                  {subSubCategories?.map((subsub) => (
                    <option key={subsub?._id} value={subsub?._id}>
                      {subsub?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sub Sub Sub Category */}
              <div className="mb-3">
                <label className="form-label">Sub Sub Sub Category</label>
                <select
                  name="subSubSubCategoryId"
                  value={formData.subSubSubCategoryId}
                  onChange={handleChange}
                  className="form-control"
                  disabled={!formData.subSubCategoryId}
                >
                  <option value="">-- Select Sub Sub Sub Category --</option>
                  {subSubSubCategories?.map((sss) => (
                    <option key={sss?._id} value={sss?._id}>
                      {sss?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Prices */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">MRP Price</label>
                  <input
                    type="number"
                    name="mrpPrice"
                    value={formData.mrpPrice}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Sale Price</label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Time Taking</label>
                  <input
                    type="text"
                    name="timeTaking"
                    value={formData.timeTaking}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="e.g. 30 mins"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Taxable Price</label>
                  <input type="number" placeholder="0" name="taxablePrice" value={formData.taxablePrice} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Repairing Diagnostic</label>
                  <select
                    name="repairingDiagnostic"
                    value={formData.repairingDiagnostic}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Offer Content</label>
                  <input type="text" placeholder="Add more and save upto 10%" name="offerContent" value={formData.offerContent} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Max Booking Quantity</label>
                  <input type="number" placeholder="0" name="maxBookingQuantity" value={formData.maxBookingQuantity} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Tax Percent</label>
                  <input type="number" placeholder="9, 12, 18" name="taxPercent" value={formData.taxPercent} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Credit Point</label>
                  <input type="number" name="creditPoint" placeholder="1, 2, 3" value={formData.creditPoint} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Transaction Charge</label>
                  <input type="number" name="transactionCharge" placeholder="5, 6, 7" value={formData.transactionCharge} onChange={handleChange} className="form-control" />
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <TextEditor
                  key={descriptionKey}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Enter impact Short Description..."
                  height={300}
                />
              </div>

              {/* Full Description */}
              <div className="mb-3">
                <label className="form-label">Full Description</label>
                <TextEditor
                  key={descriptionKey}
                  value={formData.fullDescription}
                  name="fullDescription"
                  onChange={handleChange}
                  placeholder="Enter impact Full Description..."
                  height={300}
                />
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <div
                  {...getImageRootProps()}
                  className={`border p-4 text-center rounded ${isImageActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getImageInputProps()} />
                  {isImageActive ? (
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
                      alt="Preview"
                      style={{ maxWidth: "200px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className="mb-3">
                <label className="form-label">Icon</label>
                <div
                  {...getIconRootProps()}
                  className={`border p-4 text-center rounded ${isIconActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getIconInputProps()} />
                  {isIconActive ? (
                    <p>Drop the icon here...</p>
                  ) : (
                    <p>
                      Drag & drop icon here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {iconPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={iconPreview}
                      alt="Icon Preview"
                      style={{ maxWidth: "100px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* Popup Image */}
              <div className="mb-3">
                <label className="form-label">Popup Image</label>
                <div
                  {...getPopupImageRootProps()}
                  className={`border p-4 text-center rounded ${isPopupImageActive ? "bg-light" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  <input {...getPopupImageInputProps()} />
                  {isPopupImageActive ? (
                    <p>Drop the popup image here...</p>
                  ) : (
                    <p>
                      Drag & drop popup image here, or{" "}
                      <span className="text-primary">browse</span>
                    </p>
                  )}
                </div>
                {popupImagePreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={popupImagePreview}
                      alt="Popup image Preview"
                      style={{ maxWidth: "100px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="text-end">
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

export default UpdateServicePage;
