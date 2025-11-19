/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateRequirementFromCustomerPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

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
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  // Fetch existing requirement
  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await axios.get(`${apis.requirementFromCustomer.get}/${id}`, {
          headers: { Authorization: validToken },
        });
        if (res?.data?.success && res.data.data) {
          const data = res.data.data;
          setMainTitle(data.mainTitle || "");
          setCategory(data?.category?._id);
          setSubCategory(data?.subCategory?._id);
          setSubSubCategory(data?.subSubCategory?._id);
          setSubSubSubCategory(data?.subSubSubCategory?._id);
          setSelectedServices(data.services?.map(s => s._id) || []);

          // Prepare requirements with preview
          if (data.requirements?.length) {
            const formatted = data.requirements.map(req => ({
              name: req.name || "",
              icon: null,
              preview: req.icon ? `${BASE_URL}/${req.icon}` : null,
            }));
            setRequirements(formatted);
          }
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to load requirement data");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchRequirement();
  }, [id, validToken]);

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
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainTitle.trim()) return toast.error("Main title is required");
    if (selectedServices.length === 0) return toast.error("Please select at least one service");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mainTitle", mainTitle);

      if (category) formData.append("category", category);
      if (subCategory) formData.append("subCategory", subCategory);
      if (subSubCategory) formData.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) formData.append("subSubSubCategory", subSubSubCategory);

      selectedServices.forEach((id, index) => {
        formData.append(`services[${index}]`, id);
      });

      requirements.forEach((req, idx) => {
        formData.append(`requirements[${idx}][name]`, req.name);
        if (req.icon instanceof File) formData.append("icons", req.icon);
      });

      const res = await axios.patch(`${apis.requirementFromCustomer.update}/${id}`, formData, {
        headers: { Authorization: validToken, "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success("Requirement updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="text-center mt-5">Loading data...</div>;

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Requirement From Customer</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
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

              {/* Requirements */}
              <div className="mb-3">
                <label className="form-label">Requirements <span style={{ color: "red" }}>*</span></label>
                {requirements.map((req, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
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
                    />
                    {req.preview && (
                      <img
                        src={req.preview}
                        alt="Icon Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "5px",
                          borderRadius: "4px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      onClick={() => removeRequirementField(index)}
                      disabled={requirements.length === 1}
                    >
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
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRequirementFromCustomerPage;
