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
  const [services, setServices] = useState([]);

  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategoryIds, setSubCategoryIds] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(apis.category.get, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        setCategories(res?.data?.data || []);
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
      };
    };
    fetchSubCategories();
  }, [categoryIds, validToken]);

  const fetchServices = async () => {
    const res = await axios.get(apis.homeService.service, {
      params: {
        categoryId: categoryIds.join(","),
        subCategoryId: subCategoryIds.join(","),
      },
      headers: { Authorization: validToken },
    });

    if (res?.data?.success) setServices(res?.data?.data || []);
  };

  useEffect(() => {
    fetchServices();
  }, [categoryIds, subCategoryIds])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) return toast.error("Title is required");

    const payload = {
      title,
      category: categoryIds,
      subCategory: subCategoryIds,
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
                <label>Product</label>
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
                  isClearable={false}
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Services */}
              <div className="mb-3">
                <label>Services</label>
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
