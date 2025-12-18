/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddGIPromisePage = () => {
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
  const [titles, setTitles] = useState([""]);
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

  const handleTitleChange = (index, value) => {
    const updated = [...titles];
    updated[index] = value;
    setTitles(updated);
  };

  const addTitleField = () => setTitles([...titles, ""]);
  const removeTitleField = (index) => setTitles(titles.filter((_, i) => i !== index));

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

      const payload = {
        mainTitle,
        titles: titles.filter((t) => t?.trim() !== ""),
        services: selectedServices,
        category,
        subCategory,
        subSubCategory,
        subSubSubCategory
      };

      const res = await axios.post(apis.giPromise.create, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("GI Promise created successfully");
        navigate(-1);
        setMainTitle("");
        setTitles([""]);
        setSelectedServices([]);
      }
    } catch (error) {
      console.error(error);
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
            <h5 className="mb-0">Add GI Promise</h5>
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

              {/* Multiple Titles */}
              <div className="mb-3">
                <label className="form-label">Titles <span style={{ color: "red" }}>*</span></label>
                {titles.map((title, index) => (
                  <div key={index} className="d-flex mb-4">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                    />
                    <button type="button" className="btn btn-danger me-1" onClick={() => removeTitleField(index)} disabled={titles.length === 1}>
                      -
                    </button>
                    {index === titles.length - 1 && (
                      <button type="button" className="btn btn-success" onClick={addTitleField}>
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

export default AddGIPromisePage;
