/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const SubSubCategoryListPage = () => {
  const { validToken } = useAuth();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
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

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`${apis.subCategory.get}?categoryId=${categoryId}`, {
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
    fetchSubCategories();
  }, [categoryId, validToken]);

  const fetchSubSubCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.subSubCategory.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          categoryId,
          subCategoryId,
          sort,
        },
      });

      if (response?.data?.success) {
        setSubSubCategories(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch categories");
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
      ...newParams,
    };
    setSearchParams(params);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.subSubCategory.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchSubSubCategories();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`${apis.subSubCategory.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Category deleted successfully");
        fetchSubSubCategories();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubSubCategories();
  }, [page, limit, debouncedSearch, sort, categoryId, subCategoryId]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Service Process {subSubCategories?.length}</h5>

          <div className="d-flex gap-2 align-items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm toolbar-input w-auto"
              style={{ width: "200px" }}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                updateParams({ page: 1, search: e.target.value });
              }}
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
            <Link to="/add-sub-sub-category">
              <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                <i className="fa fa-plus me-2"></i>
                <span>Add</span>
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
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subSubCategories?.length > 0 ? (
                    subSubCategories?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>
                          <img
                            src={d?.icon ? `${BASE_URL}/${d?.icon}` : "https://via.placeholder.com/50"}
                            className="me-2"
                            alt="image"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{d?.name}</td>
                        <td>{d?.category?.name}</td>
                        <td>{d?.subCategory?.name}</td>
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
                            <Link to={`/update-sub-sub-category/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteCategory(d?._id)}
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
                        No sub sub categories found
                      </td>
                    </tr>
                  ) : null}
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

export default SubSubCategoryListPage;
