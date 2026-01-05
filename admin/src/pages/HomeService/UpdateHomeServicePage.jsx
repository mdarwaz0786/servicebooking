/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import MultiSelect from "../../components/Form/MultiSelect";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateHomeServicePage = () => {
  const { id } = useParams();
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
    const fetchSingle = async () => {
      try {
        const res = await axios.get(`${apis.homeService.get}/${id}`, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          const d = res?.data?.data;
          setTitle(d?.title);
          setCategoryIds(d?.category?.map((c) => c?._id) || []);
          setSubCategoryIds(d?.subCategory?.map((c) => c?._id) || []);
          setSubSubCategoryIds(d?.subSubCategory?.map((c) => c?._id) || []);
          setSubSubSubCategoryIds(d?.subSubSubCategory?.map((c) => c?._id) || []);
          setSelectedServices(d?.services?.map((s) => s?._id) || []);
        }
      } catch {
        toast.error("Failed to load data");
      };
    };
    if (id) fetchSingle();
  }, [id, validToken]);

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
    if (!selectedServices.length) return toast.error("Select services");
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
      const res = await axios.patch(
        `${apis.homeService.update}/${id}`,
        payload,
        { headers: { Authorization: validToken } }
      );

      if (res?.data?.success) {
        toast.success("Updated successfully");
        navigate(-1);
      };
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    };
  };

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="d-flex justify-content-between align-items-center">
          <h5>Update Product Service</h5>
          <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row">
            <div className="col-md-6">
              <label>Title <span className="text-danger">*</span></label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Product <span className="text-danger">*</span></label>
              <MultiSelect
                optionsList={categories}
                value={categoryIds}
                onChange={setCategoryIds}
                isClearable={false}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label>Variant</label>
              <MultiSelect
                optionsList={subCategories}
                value={subCategoryIds}
                onChange={setSubCategoryIds}
                disabled={categoryIds.length === 0}
                isClearable={false}
              />
            </div>
            <div className="col-md-6">
              <label>Service Process</label>
              <MultiSelect
                optionsList={subSubCategories}
                value={subSubCategoryIds}
                onChange={setSubSubCategoryIds}
                disabled={subCategoryIds.length === 0}
                isClearable={false}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <label>Nested Service Process</label>
              <MultiSelect
                optionsList={subSubSubCategories}
                value={subSubSubCategoryIds}
                onChange={setSubSubSubCategoryIds}
                disabled={subSubCategoryIds.length === 0}
                isClearable={false}
              />
            </div>
            <div className="col-md-6">
              <label>Services <span className="text-danger">*</span></label>
              <SelectMultipleService
                optionsList={services}
                value={selectedServices}
                onChange={setSelectedServices}
                isClearable={false}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-3">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateHomeServicePage;
