/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const ServicemanProfileListPage = () => {
  const { validToken } = useAuth();
  const [servicemanProfile, setServicemanProfile] = useState([]);
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

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchServicemanProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.servicemanProfile.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
        },
      });

      if (response?.data?.success) {
        setServicemanProfile(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch serviceman profile");
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
      ...newParams,
    };
    setSearchParams(params);
  };

  const deleteServicemanProfile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this serviceman profile?")) return;

    try {
      const response = await axios.delete(`${apis.servicemanProfile.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Serviceman profile deleted successfully");
        fetchServicemanProfile();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete serviceman profile");
    };
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.servicemanProfile.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );
      if (response?.data?.success) {
        toast.success("Updated successfully");
        fetchServicemanProfile();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchServicemanProfile();
  }, [page, limit, debouncedSearch, sort]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Service Man Profile {servicemanProfile?.length}</h5>

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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {servicemanProfile?.length > 0 ? (
                    servicemanProfile?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.name}</td>
                        <td>{d?.email}</td>
                        <td>{d?.user?.mobile}</td>
                        <td>
                          <div className="active-switch">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={d.status}
                                onChange={() => toggleStatus(d._id, d.status)}
                              />
                              <span className="sliders round" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to="/service-man-profile-detail" state={{ record: d }}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-eye" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteServicemanProfile(d?._id)}
                              disabled={true}
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
                        No serviceman profile found
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

export default ServicemanProfileListPage;
