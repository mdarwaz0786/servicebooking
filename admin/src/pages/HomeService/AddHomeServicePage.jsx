/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import MultiSelect from "../../components/Form/MultiSelect";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const AddHomeServicePage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);
  const [services, setServices] = useState([]);

  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [subSubCategoryIds, setSubSubCategoryIds] = useState([]);
  const [subSubSubCategoryIds, setSubSubSubCategoryIds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(apis.category.get, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        setCategories(res?.data?.data || []);
        if (res?.data?.data?.length < 1) {
          fetchServices();
        };
      };
    };
    fetchCategories();
  }, [validToken]);

  useEffect(() => {
    if (!categoryIds.length) return;

    const fetchSubCategories = async () => {
      const res = await axios.get(apis.homeService.subCategory, {
        params: { categoryId: categoryIds.join(",") },
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setSubCategories(res?.data?.data || []);
        if (res?.data?.data?.length < 1) {
          fetchServices();
        };
        setSubCategoryIds([]);
        setSubSubCategoryIds([]);
        setSubSubSubCategoryIds([]);
        setSelectedServices([]);
      };
    };
    fetchSubCategories();
  }, [categoryIds, validToken]);

  useEffect(() => {
    if (!subCategoryIds.length) return;

    const fetchSubSubCategories = async () => {
      const res = await axios.get(apis.homeService.subSubCategory, {
        params: { subCategoryId: subCategoryIds.join(",") },
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setSubSubCategories(res?.data?.data || []);
        if (res?.data?.data?.length < 1) {
          fetchServices();
        };
        setSubSubCategoryIds([]);
        setSubSubSubCategoryIds([]);
        setSelectedServices([]);
      };
    };
    fetchSubSubCategories();
  }, [subCategoryIds, validToken]);

  useEffect(() => {
    if (!subSubCategoryIds.length) return;

    const fetchSubSubSubCategories = async () => {
      const res = await axios.get(apis.homeService.subSubSubCategory, {
        params: { subSubCategoryId: subSubCategoryIds.join(",") },
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setSubSubSubCategories(res?.data?.data || []);
        if (res?.data?.data?.length < 1) {
          fetchServices();
        };
        setSubSubSubCategoryIds([]);
        setSelectedServices([]);
      };
    };
    fetchSubSubSubCategories();
  }, [subSubCategoryIds, validToken]);

  const fetchServices = async () => {
    const res = await axios.get(apis.homeService.service, {
      params: {
        categoryId: categoryIds.join(","),
        subCategoryId: subCategoryIds.join(","),
        subSubCategoryId: subSubCategoryIds.join(","),
        subSubSubCategoryId: subSubSubCategoryIds.join(","),
      },
      headers: { Authorization: validToken },
    });

    if (res?.data?.success) setServices(res?.data?.data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return toast.error("Title is required");
    if (!selectedServices.length) return toast.error("Please select at least one service");
    if (!categoryIds.length) return toast.error("Please select at least one category");

    const payload = {
      title,
      category: categoryIds,
      subCategory: subCategoryIds,
      subSubCategory: subSubCategoryIds,
      subSubSubCategory: subSubSubCategoryIds,
      services: selectedServices,
    };

    try {
      const res = await axios.post(apis.homeService.create, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("Created successfully");
        navigate(-1);
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create");
    };
  };

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Create Product Service</h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row">
            <div className="col-md-6">
              {/* Title */}
              <div className="mb-3">
                <label>Title <span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Category */}
              <div className="mb-3">
                <label>Product <span className="text-danger">*</span></label>
                <MultiSelect
                  optionsList={categories}
                  value={categoryIds}
                  onChange={setCategoryIds}
                  placeholder="Select Product"
                  isClearable={false}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* Sub Category */}
              <div className="mb-3">
                <label>Variant</label>
                <MultiSelect
                  optionsList={subCategories}
                  value={subCategoryIds}
                  onChange={setSubCategoryIds}
                  placeholder="Select Variant"
                  disabled={categoryIds.length === 0}
                  isClearable={false}
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Sub Sub Category */}
              <div className="mb-3">
                <label>Service Process</label>
                <MultiSelect
                  optionsList={subSubCategories}
                  value={subSubCategoryIds}
                  onChange={setSubSubCategoryIds}
                  placeholder="Select Service Process"
                  disabled={subCategoryIds.length === 0}
                  isClearable={false}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* Sub Sub Sub Category */}
              <div className="mb-3">
                <label>Nested Service Process</label>
                <MultiSelect
                  optionsList={subSubSubCategories}
                  value={subSubSubCategoryIds}
                  onChange={setSubSubSubCategoryIds}
                  placeholder="Select Nested Process"
                  disabled={subSubCategoryIds.length === 0}
                  isClearable={false}
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Services */}
              <div className="mb-3">
                <label>Services <span className="text-danger">*</span></label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                  isClearable={false}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddHomeServicePage;
