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
              <label>Product</label>
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
              <label>Services</label>
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
