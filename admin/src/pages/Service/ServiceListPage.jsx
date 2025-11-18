/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";

const ServiceListPage = () => {
  const { validToken } = useAuth();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [subSubSubCategories, setSubSubSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const categoryId = searchParams.get("categoryId") || "";
  const subCategoryId = searchParams.get("subCategoryId") || "";
  const subSubCategoryId = searchParams.get("subSubCategoryId") || "";
  const subSubSubCategoryId = searchParams.get("subSubSubCategoryId") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apis.category.get, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        setCategories(response?.data?.data || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch categories");
    };
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(apis.subCategory.get, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        setSubCategories(response?.data?.data || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch sub categories");
    };
  };

  const fetchSubSubCategories = async () => {
    try {
      const response = await axios.get(apis.subSubCategory.get, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        setSubSubCategories(response?.data?.data || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch sub sub categories");
    };
  };

  const fetchSubSubSubCategories = async () => {
    try {
      const response = await axios.get(apis.subSubSubCategory.get, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        setSubSubSubCategories(response?.data?.data || []);
      };
    } catch (error) {
      console.log(error.message);
      toast.error("Failed to fetch sub sub sub categories");
    };
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.service.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          categoryId,
          subCategoryId,
          subSubCategoryId,
          subSubSubCategoryId,
          sort,
        },
      });

      if (response?.data?.success) {
        setServices(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    };
  };

  const updateParams = (newParams) => {
    const params = {
      page,
      limit,
      search: debouncedSearch,
      sort,
      categoryId,
      subCategoryId,
      subSubCategoryId,
      subSubSubCategoryId,
      ...newParams,
    };
    setSearchParams(params);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.service.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchServices();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteservice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await axios.delete(`${apis.service.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("service deleted successfully");
        fetchServices();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete service");
    };
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchSubSubCategories();
    fetchSubSubSubCategories();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [page, limit, debouncedSearch, sort, categoryId, subCategoryId, subSubCategoryId, subSubSubCategoryId]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Services {services?.length}</h5>

          <div className="d-flex gap-2 align-items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm toolbar-input"
              style={{ width: "200px" }}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                updateParams({ page: 1, search: e.target.value });
              }}
            />

            {/* Sort */}
            <select
              className="form-select form-select-sm"
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
            >
              <option value="desc">DESC</option>
              <option value="asc">ASC</option>
            </select>

            {/* Limit */}
            <select
              className="form-select form-select-sm"
              value={limit}
              onChange={(e) => updateParams({ limit: Number(e.target.value), page: 1 })}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value={total}>All</option>
            </select>
            <div>
              <Link to="/add-service">
                <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                  <i className="fa fa-plus me-2"></i>
                  <span>Add</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center gap-2 mt-4">
          {/* Category */}
          <div style={{ minWidth: "200px" }}>
            <Select
              isClearable
              placeholder="All Products"
              value={
                categoryId
                  ? { value: categoryId, label: categories.find((c) => c?._id === categoryId)?.name }
                  : null
              }
              onChange={(selected) =>
                updateParams({
                  categoryId: selected ? selected.value : "",
                  page: 1,
                  subCategoryId,
                  subSubCategoryId,
                  subSubSubCategoryId,
                })
              }
              options={categories.map((cat) => ({
                value: cat?._id,
                label: cat?.name,
              }))}
            />
          </div>

          {/* Sub Category */}
          <div style={{ minWidth: "200px" }}>
            <Select
              isClearable
              placeholder="All Variants"
              value={
                subCategoryId
                  ? { value: subCategoryId, label: subCategories.find((c) => c?._id === subCategoryId)?.name }
                  : null
              }
              onChange={(selected) =>
                updateParams({
                  subCategoryId: selected ? selected.value : "",
                  page: 1,
                  categoryId,
                  subSubCategoryId,
                  subSubSubCategoryId,
                })
              }
              options={subCategories.map((cat) => ({
                value: cat?._id,
                label: cat?.name,
              }))}
            />
          </div>

          {/* Sub Sub Category */}
          <div style={{ minWidth: "200px" }}>
            <Select
              isClearable
              placeholder="All Service Process"
              value={
                subSubCategoryId
                  ? { value: subSubCategoryId, label: subSubCategories.find((c) => c?._id === subSubCategoryId)?.name }
                  : null
              }
              onChange={(selected) =>
                updateParams({
                  subSubCategoryId: selected ? selected.value : "",
                  page: 1,
                  categoryId,
                  subCategoryId,
                  subSubSubCategoryId,
                })
              }
              options={subSubCategories.map((cat) => ({
                value: cat?._id,
                label: cat?.name,
              }))}
            />
          </div>

          {/* Sub Sub Sub Category */}
          <div style={{ minWidth: "200px" }}>
            <Select
              isClearable
              placeholder="All Nested Service Process"
              value={
                subSubSubCategoryId
                  ? { value: subSubSubCategoryId, label: subSubSubCategories.find((c) => c?._id === subSubSubCategoryId)?.name }
                  : null
              }
              onChange={(selected) =>
                updateParams({
                  subSubSubCategoryId: selected ? selected.value : "",
                  page: 1,
                  categoryId,
                  subCategoryId,
                  subSubCategoryId,
                })
              }
              options={subSubSubCategories.map((cat) => ({
                value: cat?._id,
                label: cat?.name,
              }))}
            />
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Service Process</th>
                    <th>Nested Service Process</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services?.length > 0 ? (
                    services?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>
                          <img
                            src={d?.image ? `${BASE_URL}/${d.image}` : "https://via.placeholder.com/50"}
                            className="me-2"
                            alt="image"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{d?.name}</td>
                        <td>{d?.salePrice}</td>
                        <td>{d?.category?.name || "None"}</td>
                        <td>{d?.subCategory?.name || "None"}</td>
                        <td>{d?.subSubCategory?.name || "None"}</td>
                        <td>{d?.subSubSubCategory?.name || "None"}</td>
                        <td>
                          <div className="active-switch">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={d?.status}
                                onChange={() => toggleStatus(d?._id, d?.status)}
                              />
                              <span className="sliders round" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/update-service/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteservice(d?._id)}
                            >
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : !loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No services found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center align-items-center">
                {/* Prev */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => updateParams({ page: page - 1 })}
                    disabled={!hasPrevPage}
                  >
                    <i className="fa fa-chevron-left"></i>
                  </button>
                </li>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item mx-1 ${page === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className={`page-link rounded-circle shadow-sm ${page === i + 1 ? "bg-primary text-white border-primary" : ""}`}
                      onClick={() => updateParams({ page: i + 1 })}
                      style={{ width: "40px", height: "40px" }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next */}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => updateParams({ page: page + 1 })}
                    disabled={!hasNextPage}
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListPage;
