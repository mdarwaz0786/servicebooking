/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const ResumeListPage = () => {
  const { validToken } = useAuth();
  const [data, setData] = useState([]);
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

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.jobApplication.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
        },
      });

      if (response?.data?.success) {
        setData(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
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

  const toggleStatus = async (id, currentStatus) => {

    try {
      const response = await axios.patch(
        `${apis.jobApplication.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchData();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteData = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const response = await axios.delete(`${apis.jobApplication.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Deleted successfully");
        fetchData();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    };
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, debouncedSearch, sort]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Resume {data?.length}</h5>

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
                    <th>Resume</th>
                    <th>Candidate Detail</th>
                    <th>Applied For</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data?.map((d, index) => {
                      const isPdf = d?.resume?.toLowerCase().endsWith(".pdf");
                      const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(d?.resume);

                      return (
                        <tr key={d?._id}>
                          <td>{(page - 1) * limit + index + 1}</td>
                          <td>
                            {isImage && (
                              <img
                                src={`${BASE_URL}/${d?.resume}`}
                                alt="resume"
                                style={{ width: "80px", height: "100px", objectFit: "cover" }}
                              />
                            )}
                            {isPdf && (
                              <a
                                href={`${BASE_URL}/${d?.resume}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", fontWeight: "500" }}
                              >
                                📄 View Resume (PDF)
                              </a>
                            )}
                          </td>
                          <td>
                            <p className="mb-1">Name: {d?.name || "-"}</p>
                            <p className="mb-1">Email: {d?.email || "-"}</p>
                            <p className="mb-1">Mobile: {d?.mobile || "-"}</p>
                            <p className="mb-1">Highest Qualification: {d?.highestQualification || "-"}</p>
                            <p className="mb-1">Experience: {d?.totalExprienceYear || 0} Year {d?.totalExprienceMonth || 0} Month</p>
                            <p className="mb-1">Last Company: {d?.lastCompanyName || "-"}</p>
                          </td>
                          <td>
                            <p className="mb-1">Role: {d?.jobId?.title || "-"}</p>
                            <p className="mb-1">Location: {d?.jobId?.location || "-"}</p>
                            <p className="mb-1">Job Type: {d?.jobId?.employmentType || "-"}</p>
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
                              <button
                                className="btn delete-table"
                                type="button"
                                onClick={() => deleteData(d?._id)}
                              >
                                <i className="fe fe-trash-2" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : !loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No  Data
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

export default ResumeListPage;
