/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";

const HomeBannerListPage = () => {
  const { validToken } = useAuth();
  const [banners, setBanners] = useState([]);
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

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.banner.get, {
        headers: { Authorization: validToken },
        params: { page, limit, search: debouncedSearch, sort },
      });

      if (response?.data?.success) {
        setBanners(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        setTotal(response?.data?.total || 0);
        setHasPrevPage(response?.data?.hasPrevPage);
        setHasNextPage(response?.data?.hasNextPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    };
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      setBanners(prev => prev.map(b => b._id === id ? { ...b, status: !currentStatus } : b));
      const response = await axios.patch(
        `${apis.banner.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (!response?.data?.success) {
        toast.error("Failed to update status");
        fetchBanners();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
      fetchBanners();
    };
  };

  const deleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      const response = await axios.delete(`${apis.banner.delete}/${id}`, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        toast.success("Banner deleted successfully");
        fetchBanners();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete banner");
    };
  };

  useEffect(() => {
    fetchBanners();
  }, [page, limit, debouncedSearch, sort]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Banners {banners?.length}</h5>

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

            <Link to="/add-home-banner">
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
                    <th>Desktop Banner</th>
                    <th>Mobile Banner</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">Loading...</td>
                    </tr>
                  ) : banners?.length > 0 ? (
                    banners.map((b, index) => (
                      <tr key={b?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>
                          <img
                            src={b?.image ? `${BASE_URL}/${b?.image}` : "https://via.placeholder.com/50"}
                            alt="banner"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>
                          <img
                            src={b?.mobileBanner ? `${BASE_URL}/${b?.mobileBanner}` : "https://via.placeholder.com/50"}
                            alt="banner"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{b?.title}</td>
                        <td>
                          <div className="active-switch">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={b?.status}
                                onChange={() => toggleStatus(b?._id, b?.status)}
                              />
                              <span className="sliders round" />
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/update-home-banner/${b?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteBanner(b?._id)}
                            >
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No banners found</td>
                    </tr>
                  )}
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

export default HomeBannerListPage;
