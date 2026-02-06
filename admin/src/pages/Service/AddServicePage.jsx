import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/Form/Editor";

const AddServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

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
  const [metaImage, setMetaImage] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subCategoryId: "",
    subSubCategoryId: "",
    subSubSubCategoryId: "",
    name: "",
    rating: "",
    review: "",
    timeTaking: "",
    mrpPrice: "",
    salePrice: "",
    taxablePrice: "",
    repairingDiagnostic: true,
    offerContent: "",
    maxBookingQuantity: "",
    creditPoint: "",
    transactionCharge: "",
    shortDescription: "",
    fullDescription: "",
    pageName: "",
    metaTitle: "",
    metaAuthor: "",
    metaKeywords: "",
    metaDescription: "",
    isMediaUpload: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load products");
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
      } catch (error) {
        console.log(error);
        toast.error("Failed to load variants");
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
      } catch (error) {
        console.log(error);
        toast.error("Failed to load service process");
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
      } catch (error) {
        console.log(error);
        toast.error("Failed to load Nested Service Process");
      };
    };
    fetchSubSubSubCategories();
  }, [formData.subSubCategoryId, validToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFullDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      fullDescription: value,
    }));
  };

  const handleShortDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      shortDescription: value,
    }));
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

  const { getRootProps: getIconRootProps,
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

    if (!formData.categoryId) return toast.error("Please select a product");
    if (!formData.name.trim()) return toast.error("Name is required");

    try {
      setLoading(true);
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== "" && value !== undefined) {
          data.append(key, value);
        };
      });
      if (image) data.append("image", image);
      if (icon) data.append("icon", icon);
      if (popupImage) data.append("popupImage", popupImage);
      if (metaImage) data.append("metaImage", metaImage);

      const response = await axios.post(apis.service.create, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: validToken,
        },
      });

      if (response?.data?.success) {
        toast.success("Service created successfully");
        navigate(-1);
        setFormData((prev) => ({
          ...prev,
          name: "",
          rating: "",
          review: "",
          mrpPrice: "",
          salePrice: "",
          timeTaking: "",
          taxablePrice: "",
          repairingDiagnostic: true,
          offerContent: "",
          maxBookingQuantity: "",
          creditPoint: "",
          transactionCharge: "",
          shortDescription: "",
          fullDescription: "",
          isMediaUpload: 1,
        }));
        setImage(null);
        setPreview(null);
        setIcon(null);
        setIconPreview(null);
        setPopupImage(null);
        setPopupImagePreview(null);
      };
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something Went Wrong"
      );
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (iconPreview) URL.revokeObjectURL(iconPreview);
      if (popupImagePreview) URL.revokeObjectURL(popupImagePreview);
      if (metaImagePreview) URL.revokeObjectURL(metaImagePreview);
    };
  }, [preview, iconPreview, popupImagePreview, metaImagePreview]);

  useEffect(() => {
    const mrp = parseFloat(formData.mrpPrice);
    const sale = parseFloat(formData.salePrice);

    const offer = !isNaN(mrp) ? Math.max(mrp - (isNaN(sale) ? 0 : sale), 0) : 0;

    setFormData(prev => ({
      ...prev,
      offerContent: offer
    }));
  }, [formData.mrpPrice, formData.salePrice]);

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Service</h5>
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
                {/* Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Product <span className="text-danger">*</span></label>
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
                    <option value="">-- Select Product --</option>
                    {categories?.map((cat) => (
                      <option key={cat?._id} value={cat?._id}>
                        {cat?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Variant</label>
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
                    <option value="">-- Select Variant --</option>
                    {subCategories?.map((sub) => (
                      <option key={sub?._id} value={sub?._id}>
                        {sub?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Sub Sub Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Service Process</label>
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
                    <option value="">-- Select Service Process --</option>
                    {subSubCategories?.map((subsub) => (
                      <option key={subsub?._id} value={subsub?._id}>
                        {subsub?.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub Sub Sub Category */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nested Service Process</label>
                  <select
                    name="subSubSubCategoryId"
                    value={formData.subSubSubCategoryId}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!formData.subSubCategoryId}
                  >
                    <option value="">-- Select Nested Service Process --</option>
                    {subSubSubCategories?.map((sss) => (
                      <option key={sss?._id} value={sss?._id}>
                        {sss?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Max Booking Quantity</label>
                  <input type="number" placeholder="0" name="maxBookingQuantity" value={formData.maxBookingQuantity} onChange={handleChange} className="form-control" />
                </div>
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
                    placeholder="0"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Sale Price <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Service Duration</label>
                  <input
                    type="text"
                    name="timeTaking"
                    value={formData.timeTaking}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="30 mins"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="1-5"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Number of Reviews</label>
                  <input
                    type="number"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">
                    Repairing Diagnostic
                  </label>
                  <select
                    name="isMediaUpload"
                    value={formData.isMediaUpload}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isMediaUpload: Number(e.target.value),
                      }))
                    }
                    className="form-control"
                  >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Taxable Price <span className="text-danger">*</span></label>
                  <input required type="number" placeholder="for e.g. 299 or 199" name="taxablePrice" value={formData.taxablePrice} onChange={handleChange} className="form-control" />
                </div>
                {/* <div className="col-md-4 mb-3">
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
                </div> */}
                <div className="col-md-4 mb-3">
                  <label className="form-label">Off Price</label>
                  <input type="number" name="offerContent" value={formData.offerContent} onChange={handleChange} className="form-control" readOnly disabled={true} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Credit Point <span className="text-danger">*</span></label>
                  <input required type="number" name="creditPoint" placeholder="1, 2, 3" value={formData.creditPoint} onChange={handleChange} className="form-control" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Transaction Charge <span className="text-danger">*</span></label>
                  <input required type="number" name="transactionCharge" placeholder="5, 6, 7" value={formData.transactionCharge} onChange={handleChange} className="form-control" />
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <Editor
                  id="shortDescription"
                  name="sortDescription"
                  value={formData.shortDescription}
                  onChange={handleShortDescriptionChange}
                  height={200}
                />
              </div>

              {/* Full Description */}
              <div className="mb-3">
                <label className="form-label">Full Description</label>
                <Editor
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleFullDescriptionChange}
                  height={300}
                />
              </div>

              <div className="row">
                {/* Image */}
                <div className="col-md-6 mb-3">
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
                <div className="col-md-6 mb-3 d-none">
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
                <div className="col-md-6 mb-3">
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
                    Meta Title (max character 100)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={100}
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
                    Meta Description (max character 300)
                  </label>
                  <input
                    type="text"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-control"
                    maxLength={300}
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
                    setFormData({
                      categoryId: "",
                      subCategoryId: "",
                      subSubCategoryId: "",
                      subSubSubCategoryId: "",
                      name: "",
                      rating: "",
                      review: "",
                      mrpPrice: "",
                      salePrice: "",
                      timeTaking: "",
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
                    setImage(null);
                    setPreview(null);
                    setIcon(null);
                    setIconPreview(null);
                    setPopupImage(null);
                    setPopupImagePreview(null);
                    setSubCategories([]);
                    setSubSubCategories([]);
                    setSubSubSubCategories([]);
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

export default AddServicePage;
