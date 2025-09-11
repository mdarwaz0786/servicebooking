/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";

const SubCategoryListPage = () => {
  const { validToken } = useAuth();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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
      setLoading(true);
      const response = await axios.get(apis.subCategory.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          categoryId,
          sort,
        },
      });

      if (response?.data?.success) {
        setSubCategories(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
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
      ...newParams,
    };
    setSearchParams(params);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.subCategory.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchSubCategories();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`${apis.subCategory.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Category deleted successfully");
        fetchSubCategories();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    };
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, [page, limit, debouncedSearch, sort, categoryId]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Sub Categories {subCategories?.length}</h5>

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

            {/* Category */}
            <Select
              isClearable
              isSearchable
              placeholder="All Categories"
              value={
                categoryId
                  ? { value: categoryId, label: categories.find((c) => c._id === categoryId)?.name }
                  : null
              }
              onChange={(selected) =>
                updateParams({
                  categoryId: selected ? selected.value : "",
                  page: 1,
                })
              }
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
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
            <Link to="/add-sub-category">
              <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                <i className="fa fa-plus me-2"></i>
                <span>Add</span>
              </button>
            </Link>
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
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategories?.length > 0 ? (
                    subCategories?.map((d, index) => (
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
                            <Link to={`/update-sub-category/${d?._id}`}>
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
                        No sub categories found.
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

export default SubCategoryListPage;
