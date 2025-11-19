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
  const [pointIcons, setPointIcons] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [loading, setLoading] = useState(false);

  // 🚀 FETCH SINGLE
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
        console.log("lkjhgf", selectedServices)
        // Points
        setPoints(
          d.points?.map((p) => ({
            icon: p.icon ? `${BASE_URL}/${p.icon}` : "",
            title: p.title,
          })) || []
        );

        setImagePreview(d.image ? `${BASE_URL}/${d.image}` : null);
      } catch (error) {
        console.log(error)
      }
    };
    fetchSingle();
  }, [id]);

  // 🚀 FETCH CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apis.category.get, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success) setCategories(res.data.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchCategories();
  }, []);

  // FETCH SUB CATEGORIES
  useEffect(() => {
    if (!category) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${apis.subCategory.get}?categoryId=${category}`,
          { headers: { Authorization: validToken } }
        );
        if (res.data.success) setSubCategories(res.data.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [category]);

  // FETCH SUB SUB CATEGORY
  useEffect(() => {
    if (!subCategory) return;
    const load = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubCategory.get}?subCategoryId=${subCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res.data.success) setSubSubCategories(res.data.data);
      } catch (error) {
        console.log(error)
      }
    };
    load();
  }, [subCategory]);

  // FETCH SUB SUB SUB CATEGORY
  useEffect(() => {
    if (!subSubCategory) return;
    const load = async () => {
      try {
        const res = await axios.get(
          `${apis.subSubSubCategory.get}?subSubCategoryId=${subSubCategory}`,
          { headers: { Authorization: validToken } }
        );
        if (res.data.success) setSubSubSubCategories(res.data.data);
      } catch (error) {
        console.log(error)
      }
    };
    load();
  }, [subSubCategory]);

  // FETCH SERVICES
  const fetchServices = async () => {
    try {
      const params = {};
      if (category) params.categoryId = category;
      if (subCategory) params.subCategoryId = subCategory;
      if (subSubCategory) params.subSubCategoryId = subSubCategory;
      if (subSubSubCategory) params.subSubSubCategoryId = subSubSubCategory;

      const res = await axios.get(apis.service.get, {
        params,
        headers: { Authorization: validToken },
      });

      setServices(res?.data?.data || []);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchServices();
  }, [category, subCategory, subSubCategory, subSubSubCategory]);

  const handlePointChange = (index, field, value) => {
    const copy = [...points];
    copy[index][field] = value;
    setPoints(copy);
  };

  const handlePointIconChange = (index, file) => {
    const iconCopy = [...pointIcons];
    iconCopy[index] = file;
    setPointIcons(iconCopy);

    const p = [...points];
    p[index].icon = URL.createObjectURL(file);
    setPoints(p);
  };

  const addPointField = () => {
    setPoints([...points, { icon: "", title: "" }]);
    setPointIcons([...pointIcons, null]);
  };

  const removePointField = (index) => {
    setPoints(points.filter((_, i) => i !== index));
    setPointIcons(pointIcons.filter((_, i) => i !== index));
  };

  const handleImageChange = (file) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 🚀 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!mainTitle.trim()) {
        toast.error("Main title is required");
        return;
      }

      if (selectedServices?.length === 0) {
        toast.error("Please select at least one service");
        return;
      }

      const fd = new FormData();

      fd.append("mainTitle", mainTitle);
      if (category) fd.append("category", category);
      if (subCategory) fd.append("subCategory", subCategory);
      if (subSubCategory) fd.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) fd.append("subSubSubCategory", subSubSubCategory);

      fd.append(
        "points",
        JSON.stringify(points.map((p) => ({ title: p.title })))
      );

      pointIcons.forEach((f) => {
        if (f) fd.append("icons", f);
      });

      if (image) fd.append("image", image);

      selectedServices.forEach((id, index) => {
        fd.append(`services[${index}]`, id);
      });

      const res = await axios.patch(`${apis.expertTechnician.update}/${id}`, fd, {
        headers: {
          Authorization: validToken,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Updated successfully");
        navigate(-1);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
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
            <button
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

              {/* Main Title */}
              <div className="mb-3">
                <label className="form-label">
                  Main Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  required
                />
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Main Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginTop: "5px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Points */}
              <div className="mb-3">
                <label className="form-label">Points (Icon + Title) <span style={{ color: "red" }}>*</span></label>
                {points.map((point, index) => (
                  <div key={index} className="border p-3 mb-2 rounded">
                    <div className="row align-items-center">
                      <div className="col-md-4 mb-2">
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) =>
                            handlePointIconChange(index, e.target.files[0])
                          }
                        />
                      </div>
                      <div className="col-md-4 mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          required
                          value={point.title}
                          onChange={(e) =>
                            handlePointChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-md-4 d-flex align-items-center">
                        {point.icon && (
                          <img
                            src={point.icon}
                            alt="icon-preview"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "4px",
                              marginRight: "10px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => removePointField(index)}
                          disabled={points.length === 1}
                        >
                          -
                        </button>
                        {index === points.length - 1 && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={addPointField}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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

export default UpdateExpertTechnicianPage;
