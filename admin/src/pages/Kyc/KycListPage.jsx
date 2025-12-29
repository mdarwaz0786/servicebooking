/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const KycListPage = () => {
  const { validToken } = useAuth();
  const [kyc, setKyc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusMap, setStatusMap] = useState({});
  const [servicemen, setServicemen] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const serviceman = searchParams.get("serviceman") || "";
  const status = searchParams.get("status") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchServicemen = async () => {
    try {
      const res = await axios.get(apis.servicemanProfile.get, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        setServicemen(res.data.data || []);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchServicemen();
  }, []);

  const fetchKyc = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.kyc.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          status,
          serviceman,
          sort,
        },
      });

      if (response?.data?.success) {
        setKyc(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch kyc");
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
      status,
      serviceman,
      ...newParams,
    };
    setSearchParams(params);
  };

  const deleteKyc = async (id) => {
    if (!window.confirm("Are you sure you want to delete this kyc?")) return;

    try {
      const response = await axios.delete(`${apis.kyc.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Kyc deleted successfully");
        fetchKyc();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete kyc");
    };
  };

  useEffect(() => {
    fetchKyc();
  }, [page, limit, debouncedSearch, sort, status, serviceman]);

  const STATUSES = [
    "pending",
    "approved",
    "rejected"
  ];

  const updateStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${apis.kyc.update}/${id}`,
        { status: statusMap[id] },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Status updated successfully");
        fetchKyc();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  // Serviceman options
  const servicemanOptions = [
    { value: "", label: "All Provider" },
    ...servicemen.map((s) => ({
      value: s?.userId,
      label: s?.name,
    })),
  ];

  // Status options
  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>KYC {kyc?.length}</h5>

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

        <div className="d-flex gap-3 mt-4 mb-0 flex-wrap">
          {/* Serviceman Filter */}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="All Provider"
            isClearable
            value={servicemanOptions?.find((o) => o?.value === serviceman) || null}
            options={servicemanOptions}
            onChange={(selected) =>
              updateParams({
                serviceman: selected?.value || "",
                page: 1,
              })
            }
          />

          {/* Status Filter */}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="All Status"
            isClearable
            value={statusOptions.find((o) => o?.value === status) || null}
            options={statusOptions}
            onChange={(selected) =>
              updateParams({
                status: selected?.value || "",
                page: 1,
              })
            }
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>KYC Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {kyc?.length > 0 ? (
                    kyc?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.profile?.name}</td>
                        <td>{d?.profile?.email}</td>
                        <td>{d?.user?.mobile}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              className="form-select form-select-sm"
                              value={statusMap[d?._id] || d?.status}
                              onChange={(e) =>
                                setStatusMap({
                                  ...statusMap,
                                  [d?._id]: e.target.value,
                                })
                              }
                            >
                              {STATUSES?.map((status) => (
                                <option key={status} value={status}>
                                  {status?.toUpperCase()}
                                </option>
                              ))}
                            </select>

                            <button
                              className="btn btn-sm btn-success"
                              type="button"
                              onClick={() => updateStatus(d?._id)}
                              disabled={statusMap[d?._id] === d?.status}
                            >
                              Update
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link to={`/kyc-detail`} state={{ record: d }}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-eye" />
                              </button>
                            </Link>
                            <div className="d-flex">
                              <button
                                className="btn delete-table"
                                type="button"
                                onClick={() => deleteKyc(d?._id)}
                              >
                                <i className="fe fe-trash-2" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : !loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No kyc found
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

export default KycListPage;
