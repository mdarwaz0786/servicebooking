/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const HomeServiceListPage = () => {
  const { validToken } = useAuth();
  const [serviceBlocks, setServiceBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [service, setService] = useState([]);
  const categoryId = searchParams.get("categoryId") || "";
  const subCategoryId = searchParams.get("subCategoryId") || "";
  const services = searchParams.get("services") || "";

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const updateParams = (newParams) => {
    setSearchParams({ page, limit, search: debouncedSearch, sort, ...newParams });
  };

  useEffect(() => {
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
      };
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(apis.subCategory.get, {
          headers: { Authorization: validToken },
          params: {
            categoryId,
          },
        });
        if (response?.data?.success) {
          setSubCategories(response?.data?.data || []);
        };
      } catch (error) {
        console.log(error.message);
      };
    };
    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apis.service.get, {
          headers: { Authorization: validToken },
          params: {
            categoryId,
            subCategoryId,
          },
        });

        if (response?.data?.success) {
          setService(response?.data?.data || []);
        };
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch services");
      };
    };
    fetchService();
  }, [categoryId, subCategoryId, validToken]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.homeService.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          category: categoryId,
          subCategory: subCategoryId,
          services,
        },
      });

      if (response?.data?.success) {
        setServiceBlocks(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 0);
        setHasPrevPage(response?.data?.hasPrevPage);
        setHasNextPage(response?.data?.hasNextPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    };
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      setServiceBlocks((prev) => prev.map((s) => s?._id === id ? { ...s, status: !currentStatus } : s));
      const response = await axios.patch(
        `${apis.homeService.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        toast.success("Status updated successfully");
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteServiceBlock = async (id) => {
    if (!window.confirm("Are you sure you want to delete this block?")) return;

    try {
      const response = await axios.delete(`${apis.homeService.delete}/${id}`, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        toast.success("Service block deleted successfully");
        fetchServices();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete service block");
    };
  };

  useEffect(() => {
    fetchServices();
  }, [page, limit, debouncedSearch, sort, services, categoryId, subCategoryId]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Product Services {serviceBlocks?.length}</h5>

          <div className="d-flex gap-2 align-items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm toolbar-input w-auto"
              style={{ width: "200px" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            {/* Sort */}
            <select
              className="form-select form-select-sm w-auto"
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
            >
              <option value="desc">DESC</option>
              <option value="asc">ASC</option>
            </select>

            {/* Limit */}
            <select
              className="form-select form-select-sm w-auto"
              value={limit}
              onChange={(e) => updateParams({ limit: Number(e.target.value), page: 1 })}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value={total}>All</option>
            </select>

            <Link to="/add-home-service">
              <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                <i className="fa fa-plus me-2"></i>Add
              </button>
            </Link>
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
                })
              }
              options={subCategories.map((cat) => ({
                value: cat?._id,
                label: cat?.name,
              }))}
            />
          </div>

          {/* Services */}
          <div style={{ minWidth: "200px" }}>
            <Select
              isClearable
              placeholder="All Services"
              value={
                service
                  .map((s) => ({ value: s?._id, label: s?.name }))
                  .find((s) => s?.value === services) || null
              }
              onChange={(selected) =>
                updateParams({
                  services: selected ? selected.value : "",
                  page: 1,
                  categoryId,
                  subCategoryId,
                })
              }
              options={service.map((s) => ({
                value: s?._id,
                label: s?.name,
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
                    <th>Title</th>
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Services</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">Loading...</td>
                    </tr>
                  ) : serviceBlocks?.length > 0 ? (
                    serviceBlocks?.map((s, index) => (
                      <tr key={s?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{s?.title}</td>
                        <td>{s?.category?.map((c) => <p className="mb-0">{c?.name}</p>)}</td>
                        <td>{s?.subCategory?.map((s) => <p className="mb-0">{s?.name}</p>)}</td>
                        <td>
                          {s?.services?.map((item) => (
                            <p className="mb-0">{item?.name}</p>
                          ))}
                        </td>
                        <td>
                          <div className="active-switch">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={s?.status}
                                onChange={() => toggleStatus(s?._id, s?.status)}
                              />
                              <span className="sliders round" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/update-home-service/${s?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteServiceBlock(s?._id)}
                            >
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No home service blocks found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              pagination={pagination}
              page={page}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={(p) => updateParams({ page: p })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeServiceListPage;
