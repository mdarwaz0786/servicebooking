/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const EarningListPage = () => {
  const { validToken } = useAuth();
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const category = searchParams.get("category") || "";

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
      const res = await axios.get(apis.category.get, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setCategories(res?.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.earning.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          category,
        },
      });

      if (response?.data?.success) {
        setEarnings(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch earnings");
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
      category,
      ...newParams,
    };
    setSearchParams(params);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.earning.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchEarnings();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteEarning = async (id) => {
    if (!window.confirm("Are you sure you want to delete this earning?")) return;

    try {
      const response = await axios.delete(`${apis.earning.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Earning deleted successfully");
        fetchEarnings();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete earning");
    };
  };

  useEffect(() => {
    fetchEarnings();
  }, [page, limit, debouncedSearch, sort, category]);

  const categoryOptions = categories?.map((c) => ({
    value: c?._id,
    label: c?.name,
  }));

  const selectedCategory = categoryOptions?.find((o) => o?.value === category);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Earnings {earnings?.length}</h5>

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
            <div>
              <Link to="/add-earning">
                <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                  <i className="fa fa-plus me-2"></i>
                  <span>Add</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4 mb-0 flex-wrap">
          {/* Category */}
          <Select
            className="w-auto"
            classNamePrefix="react-select"
            options={categoryOptions}
            value={selectedCategory || null}
            onChange={(option) =>
              updateParams({
                category: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Product"
          />
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Earning Detail</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings?.length > 0 ? (
                    earnings?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.category?.name}</td>
                        <td>
                          <p className="mb-0">Earning Hour1: {d?.earningHour1}</p>
                          <p className="mb-2">Earning Price1: {d?.earningPrice1}</p>

                          <p className="mb-0">Earning Hour2: {d?.earningHour2}</p>
                          <p className="mb-2">Earning Price2: {d?.earningPrice2}</p>

                          <p className="mb-0">Earning Hour3: {d?.earningHour3}</p>
                          <p className="mb-2">Earning Price3: {d?.earningPrice3}</p>

                          <p className="mb-0">Earning Hour4: {d?.earningHour4}</p>
                          <p className="mb-0">Earning Price4: {d?.earningPrice4}</p>
                        </td>
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
                            <Link to={`/update-earning/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteEarning(d?._id)}
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
                        No earnings found
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

export default EarningListPage;
