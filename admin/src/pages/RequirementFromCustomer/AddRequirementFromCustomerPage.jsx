/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddRequirementFromCustomerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);

  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subSubCategory, setSubSubCategory] = useState();
  const [subSubSubCategory, setSubSubSubCategory] = useState();

  const [mainTitle, setMainTitle] = useState("");
  const [requirements, setRequirements] = useState([{ name: "", icon: null, preview: null }]);
  const [loading, setLoading] = useState(false);

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

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

  const handleRequirementChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const handleIconChange = (index, file) => {
    const updated = [...requirements];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    updated[index].icon = file;
    updated[index].preview = URL.createObjectURL(file);
    setRequirements(updated);
  };

  const addRequirementField = () => setRequirements([...requirements, { name: "", icon: null, preview: null }]);
  const removeRequirementField = (index) => {
    const updated = [...requirements];
    if (updated[index].preview) URL.revokeObjectURL(updated[index].preview);
    setRequirements(updated.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainTitle.trim()) {
      toast.error("Main title is required");
      return;
    }

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mainTitle", mainTitle);
      if (category) formData.append("category", category);
      if (subCategory) formData.append("subCategory", subCategory);
      if (subSubCategory) formData.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) formData.append("subSubSubCategory", subSubSubCategory);

      selectedServices.forEach((id, index) => {
        console.log(id);
        formData.append(`services[${index}]`, id);
      });

      requirements.forEach((req, idx) => {
        formData.append(`requirements[${idx}][name]`, req.name);
        if (req.icon) formData.append("icons", req.icon);
      });

      const res = await axios.post(apis.requirementFromCustomer.create, formData, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success("Requirement created successfully");
        navigate(-1);
        setMainTitle("");
        setRequirements([{ name: "", icon: null, preview: null }]);
        setSelectedServices([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Create Requirement From Customer</h5>
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
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-3">
                <label className="form-label">Requirements <span style={{ color: "red" }}>*</span></label>
                {requirements.map((req, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-4"
                      placeholder="Title"
                      value={req.name}
                      required
                      onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
                    />
                    <input
                      type="file"
                      className="form-control me-2"
                      onChange={(e) => handleIconChange(index, e.target.files[0])}
                      accept="image/*"
                      required
                    />
                    {req.preview && (
                      <img src={req.preview} alt="Icon Preview" style={{ width: "50px", height: "50px", marginRight: "5px", borderRadius: "4px" }} />
                    )}
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeRequirementField(index)} disabled={requirements.length === 1}>
                      -
                    </button>
                    {index === requirements.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addRequirementField}>
                        +
                      </button>
                    )}
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

export default AddRequirementFromCustomerPage;
