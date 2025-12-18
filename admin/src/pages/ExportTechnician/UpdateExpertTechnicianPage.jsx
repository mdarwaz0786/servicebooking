/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateExpertTechnicianPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  const [subSubSubCategory, setSubSubSubCategory] = useState("");

  const [mainTitle, setMainTitle] = useState("");
  const [points, setPoints] = useState([]);
  const [removedIndexes, setRemovedIndexes] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [loading, setLoading] = useState(false);

  // FETCH SINGLE EXPERT TECHNICIAN
  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await axios.get(`${apis.expertTechnician.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (!res?.data?.success) return toast.error("Failed to load data.");

        const d = res.data.data;

        setMainTitle(d.mainTitle);
        setCategory(d.category?._id || "");
        setSubCategory(d.subCategory?._id || "");
        setSubSubCategory(d.subSubCategory?._id || "");
        setSubSubSubCategory(d.subSubSubCategory?._id || "");
        setSelectedServices(d.services?.map(s => s?._id) || []);

        // Points
        setPoints(
          d.points?.map(p => ({
            title: p.title,
            icon: p.icon ? `${BASE_URL}/${p.icon}` : null,
            _hasFile: false, // track new uploads
            hasOldIcon: !!p.icon
          })) || []
        );

        setImagePreview(d.image ? `${BASE_URL}/${d.image}` : null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingle();
  }, [id, validToken]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res?.data?.data || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load categories");
      };
    };
    fetchCategories();
  }, [validToken]);

  useEffect(() => {
    if (!category) return;
    const fetchSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subCategory.get}?categoryId=${category}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub categories");
      };
    };
    fetchSubCategories();
  }, [category, validToken]);

  useEffect(() => {
    if (!subCategory) return;
    const fetchSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubCategory.get}?subCategoryId=${subCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub sub categories");
      };
    };
    fetchSubSubCategories();
  }, [subCategory, validToken]);

  useEffect(() => {
    if (!subSubCategory) return;
    const fetchSubSubSubCategories = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubSubCategory.get}?subSubCategoryId=${subSubCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res?.data?.success) {
          setSubSubSubCategories(res?.data?.data || []);
          if (res?.data.data.length < 1) {
            fetchServices();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load sub sub sub categories");
      };
    };
    fetchSubSubSubCategories();
  }, [subSubCategory, validToken]);

  const fetchServices = async () => {
    try {
      const params = {};
      if (category) params.categoryId = category;
      if (subCategory) params.subCategoryId = subCategory;
      if (subSubCategory) params.subSubCategoryId = subSubCategory;
      if (subSubSubCategory) params.subSubSubCategoryId = subSubSubCategory;

      const res = await axios.get(apis.service.get, {
        params,
        headers: {
          Authorization: validToken,
        },
      });
      setServices(res?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // POINTS HANDLERS
  const handlePointChange = (index, field, value) => {
    const updated = [...points];
    updated[index][field] = value;
    setPoints(updated);
  };

  const handlePointIconChange = (index, file) => {
    const updated = [...points];
    updated[index].icon = URL.createObjectURL(file);
    updated[index]._hasFile = true;
    updated[index].iconFile = file;
    setPoints(updated);
  };

  const addPointField = () => {
    setPoints([...points, { title: "", icon: null, _hasFile: false }]);
  };

  const removePointField = (index) => {
    // If old icon exists, mark index for removal
    if (points[index].hasOldIcon) {
      setRemovedIndexes(prev => [...prev, index]);
    }
    setPoints(points.filter((_, i) => i !== index));
  };

  const handleImageChange = (file) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!mainTitle.trim()) return toast.error("Main title is required");
      if (!selectedServices.length) return toast.error("Please select at least one service");

      const fd = new FormData();
      fd.append("mainTitle", mainTitle);
      if (category) fd.append("category", category);
      if (subCategory) fd.append("subCategory", subCategory);
      if (subSubCategory) fd.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) fd.append("subSubSubCategory", subSubSubCategory);

      fd.append("services", JSON.stringify(selectedServices));
      fd.append("removedIndexes", JSON.stringify(removedIndexes));

      const newPointsPayload = points.map(p => ({
        title: p.title,
        _hasFile: !!p._hasFile
      }));

      fd.append("newPoints", JSON.stringify(newPointsPayload));

      points.forEach((p) => {
        if (p._hasFile) fd.append("icons", p._file || p.iconFile);
      });

      if (image) fd.append("image", image);

      const res = await axios.patch(`${apis.expertTechnician.update}/${id}`, fd, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Updated successfully");
        navigate(-1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Expert Technician</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">Product <span style={{ color: "red" }}>*</span></label>
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubCategory();
                        setSubSubCategory();
                        setSubSubSubCategory();
                        setSelectedServices([]);
                      }}
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
                </div>
                <div className="col-md-6">
                  {/* Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Variant</label>
                    <select
                      name="subCategory"
                      value={subCategory}
                      onChange={(e) => {
                        setSubCategory(e.target.value);
                        setSubSubCategory();
                        setSubSubSubCategory();
                        setSelectedServices([]);
                      }}
                      className="form-control"
                      disabled={!category}
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
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Sub Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Service Process</label>
                    <select
                      name="subSubCategory"
                      value={subSubCategory}
                      onChange={(e) => {
                        setSubSubCategory(e.target.value);
                        setSubSubSubCategory();
                        setSelectedServices([]);
                      }
                      }
                      className="form-control"
                      disabled={!subCategory}
                    >
                      <option value="">-- Select Service Process --</option>
                      {subSubCategories?.map((subsub) => (
                        <option key={subsub?._id} value={subsub?._id}>
                          {subsub?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Sub Sub Sub Category */}
                  <div className="mb-3">
                    <label className="form-label">Nested Service Process</label>
                    <select
                      name="subSubSubCategory"
                      value={subSubSubCategory}
                      onChange={(e) => setSubSubSubCategory(e.target.value)}
                      className="form-control"
                      disabled={!subSubCategory}
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
              </div>

              <div className="row">
                <div className="col-md-6">
                  {/* Services */}
                  <div className="mb-3">
                    <label className="form-label">
                      Select Services <span style={{ color: "red" }}>*</span>
                    </label>
                    <SelectMultipleService
                      optionsList={services}
                      value={selectedServices}
                      onChange={setSelectedServices}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Main Title */}
                  <div className="mb-3">
                    <label className="form-label">Main Title <span style={{ color: "red" }}>*</span></label>
                    <input type="text" className="form-control" value={mainTitle} onChange={(e) => setMainTitle(e.target.value)} required />
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="mb-3">
                <label className="form-label">Main Image</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => handleImageChange(e.target.files[0])} />
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: "100px", height: "100px", marginTop: "5px", borderRadius: "4px", objectFit: "cover" }} />}
              </div>

              {/* Points */}
              <div className="mb-3">
                <label className="form-label">Points (Icon + Title) <span style={{ color: "red" }}>*</span></label>
                {points.map((point, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input type="file" className="form-control me-3" accept="image/*" onChange={(e) => handlePointIconChange(index, e.target.files[0])} />
                    <input type="text" className="form-control me-2" placeholder="Title" value={point.title} onChange={(e) => handlePointChange(index, "title", e.target.value)} required />
                    {point.icon && <img src={point.icon} alt="preview" width={50} height={50} className="me-2 rounded" style={{ objectFit: "cover" }} />}
                    <button type="button" className="btn btn-danger me-1" disabled={points.length === 1} onClick={() => removePointField(index)}>-</button>
                    {index === points.length - 1 && <button type="button" className="btn btn-success" onClick={addPointField}>+</button>}
                  </div>
                ))}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateExpertTechnicianPage;
