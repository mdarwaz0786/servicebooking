/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddRateCardPage = () => {
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

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [rateGroups, setRateGroups] = useState([
    { title: "", rates: [{ description: "", price: "", labourCharge: "" }] },
  ]);
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

  // Handle title change for rate group
  const handleGroupTitleChange = (index, value) => {
    const updated = [...rateGroups];
    updated[index].title = value;
    setRateGroups(updated);
  };

  // Handle rate change inside a group
  const handleRateChange = (groupIndex, rateIndex, field, value) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates[rateIndex][field] = value;
    setRateGroups(updated);
  };

  // Handle serviceCharge fields
  const handleServiceChargeChange = (groupIndex, rateIndex, field, value) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates[rateIndex][field] = value;
    setRateGroups(updated);
  };

  // Add new rate inside group
  const addRateField = (groupIndex) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates.push({ description: "", price: "", labourCharge: "" });
    setRateGroups(updated);
  };

  // Remove rate inside group
  const removeRateField = (groupIndex, rateIndex) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates.splice(rateIndex, 1);
    setRateGroups(updated);
  };

  // Add new group
  const addGroupField = () => {
    setRateGroups([
      ...rateGroups,
      { title: "", rates: [{ description: "", price: "", labourCharge: "" }] },
    ]);
  };

  // Remove group
  const removeGroupField = (index) => {
    setRateGroups(rateGroups.filter((_, i) => i !== index));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices?.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    // Validate rateGroups
    const validGroups = rateGroups.filter(
      (g) => g.title.trim() !== "" && g.rates.some((r) => r.description.trim() !== "")
    );

    if (validGroups.length === 0) {
      toast.error("Please add at least one valid rate group and rate");
      return;
    }

    const payload = {
      services: selectedServices,
      category,
      subCategory,
      subSubCategory,
      subSubSubCategory,
      rateGroups: rateGroups.map((group) => ({
        title: group.title,
        rates: group.rates.map((rate) => ({
          description: rate.description,
          serviceCharge: {
            price: rate.price,
            labourCharge: rate.labourCharge,
          },
        })),
      })),
    };

    try {
      setLoading(true);
      const response = await axios.post(apis.rateCard.create, payload, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Rate Card created successfully!");
        navigate(-1);
        setSelectedServices([]);
        setRateGroups([{ title: "", rates: [{ description: "", price: "", labourCharge: "" }] }]);
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
            <h5 className="mb-0">Create Rate Card</h5>
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
                  Select Services <span className="text-danger">*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Rate Groups */}
              <div className="mb-3">
                <label className="form-label">Rate Groups <span style={{ color: "red" }}>*</span></label>
                {rateGroups.map((group, gIndex) => (
                  <div key={gIndex} className="border rounded p-3 mb-3 bg-light">
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Group Title"
                        value={group.title}
                        required
                        onChange={(e) => handleGroupTitleChange(gIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeGroupField(gIndex)}
                        disabled={rateGroups.length === 1}
                      >
                        -
                      </button>
                      {gIndex === rateGroups.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success ms-2"
                          onClick={addGroupField}
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Rates */}
                    {group.rates.map((rate, rIndex) => (
                      <div key={rIndex} className="row g-2 align-items-end mb-2">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={rate.description}
                            required
                            onChange={(e) =>
                              handleRateChange(gIndex, rIndex, "description", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            value={rate.price}
                            required
                            onChange={(e) =>
                              handleServiceChargeChange(gIndex, rIndex, "price", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Labour Charge"
                            value={rate.labourCharge}
                            required
                            onChange={(e) =>
                              handleServiceChargeChange(gIndex, rIndex, "labourCharge", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-2 d-flex">
                          <button
                            type="button"
                            className="btn btn-danger me-1"
                            onClick={() => removeRateField(gIndex, rIndex)}
                            disabled={group.rates.length === 1}
                          >
                            -
                          </button>
                          {rIndex === group.rates.length - 1 && (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => addRateField(gIndex)}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
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

export default AddRateCardPage;
