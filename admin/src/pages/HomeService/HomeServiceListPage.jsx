/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";

const HomeServiceListPage = () => {
  const { validToken } = useAuth();
  const [serviceBlocks, setServiceBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
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

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const updateParams = (newParams) => {
    setSearchParams({ page, limit, search: debouncedSearch, sort, ...newParams });
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.homeService.get, {
        headers: { Authorization: validToken },
        params: { page, limit, search: debouncedSearch, sort },
      });

      if (response?.data?.success) {
        setServiceBlocks(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
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
      setServiceBlocks(prev =>
        prev.map(s => s?._id === id ? { ...s, status: !currentStatus } : s)
      );
      const response = await axios.patch(
        `${apis.homeService.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (!response?.data?.success) {
        toast.error("Failed to update status");
        fetchServices();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
      fetchServices();
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
  }, [page, limit, debouncedSearch, sort]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Services {serviceBlocks?.length}</h5>

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

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
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
                        <td>
                          {s?.services?.map((item) => (
                            <p>{item?.name}</p>
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

            {/* Pagination */}
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center align-items-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => updateParams({ page: page - 1 })} disabled={!hasPrevPage}>
                    <i className="fa fa-chevron-left"></i>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item mx-1 ${page === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => updateParams({ page: i + 1 })}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => updateParams({ page: page + 1 })} disabled={!hasNextPage}>
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

export default HomeServiceListPage;
