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
  const [requirements, setRequirements] = useState([]);
  const [removedIndexes, setRemovedIndexes] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await axios.get(`${apis.requirementFromCustomer.get}/${id}`, {
          headers: { Authorization: validToken }
        });

        if (res?.data?.success) {
          const data = res?.data?.data;

          setMainTitle(data.mainTitle);
          setCategory(data?.category?._id);
          setSubCategory(data?.subCategory?._id);
          setSubSubCategory(data?.subSubCategory?._id);
          setSubSubSubCategory(data?.subSubSubCategory?._id);
          setSelectedServices(data?.services?.map((s) => s?._id) || []);

          const formatted = data?.requirements?.map((item) => ({
            name: item?.name,
            icon: null,
            preview: item?.icon ? `${BASE_URL}/${item?.icon}` : null,
            hasOldIcon: !!item?.icon
          }));

          setRequirements(formatted);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load requirement");
      };
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
    updated[index].icon = file;
    updated[index].preview = URL.createObjectURL(file);
    updated[index]._hasFile = true;
    setRequirements(updated);
  };

  const removeRequirementField = (index) => {
    if (requirements[index].hasOldIcon) {
      setRemovedIndexes((prev) => [...prev, index]);
    }
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addRequirementField = () =>
    setRequirements([...requirements, { name: "", icon: null, preview: null }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainTitle.trim()) return toast.error("Main title is required");

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    try {
      setLoading(true);
      const fd = new FormData();

      fd.append("mainTitle", mainTitle);
      if (category) fd.append("category", category);
      if (subCategory) fd.append("subCategory", subCategory);
      if (subSubCategory) fd.append("subSubCategory", subSubCategory);
      if (subSubSubCategory) fd.append("subSubSubCategory", subSubSubCategory);

      fd.append("services", JSON.stringify(selectedServices));
      fd.append("removedIndexes", JSON.stringify(removedIndexes));

      const newReqPayload = requirements?.map((item) => ({
        name: item?.name,
        _hasFile: !!(item.icon instanceof File)
      }));

      fd.append("newRequirements", JSON.stringify(newReqPayload));

      requirements.forEach((item) => {
        if (item.icon instanceof File) fd.append("icons", item.icon);
      });

      const res = await axios.patch(
        `${apis.requirementFromCustomer.update}/${id}`,
        fd,
        {
          headers: {
            Authorization: validToken,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res?.data?.success) {
        toast.success("Updated successfully");
        navigate(-1);
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
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubCategory();
                    setSubSubCategory();
                    setSubSubSubCategory();
                    setSelectedServices([]);
                  }}
                  className="form-control"
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
                      value={req.name}
                      onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
                      placeholder="Requirement name"
                      required
                    />
                    <input
                      type="file"
                      className="form-control me-2"
                      accept="image/*"
                      onChange={(e) => handleIconChange(index, e.target.files[0])}
                    />
                    {req.preview && (
                      <img
                        src={req.preview}
                        alt="preview"
                        width={50}
                        height={50}
                        className="me-2 rounded"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      disabled={requirements.length === 1}
                      onClick={() => removeRequirementField(index)}
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

export default UpdateRequirementFromCustomerPage;