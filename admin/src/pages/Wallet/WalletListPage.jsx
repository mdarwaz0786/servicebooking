/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const WalletListPage = () => {
  const { validToken } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [servicemen, setServicemen] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const serviceman = searchParams.get("serviceman") || "";
  const transactionType = searchParams.get("transactionType") || "";
  const paymentMode = searchParams.get("paymentMode") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    updateParams({ page: 1, search: debouncedSearch });
  }, [debouncedSearch]);

  const fetchServicemen = async () => {
    try {
      const res = await axios.get(apis.servicemanProfile.get, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        setServicemen(res?.data?.data || []);
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    fetchServicemen();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.wallet.get, {
        headers: { Authorization: validToken },
        params: { page, limit, search: debouncedSearch, sort, serviceman, paymentMode, transactionType },
      });

      if (response?.data?.success) {
        setData(response.data.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response.data.total || 0);
        setHasNextPage(response.data.hasNextPage || false);
        setHasPrevPage(response.data.hasPrevPage || false);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const updateParams = (newParams) => {
    setSearchParams({
      page,
      limit,
      sort,
      search: debouncedSearch,
      serviceman,
      paymentMode,
      transactionType,
      ...newParams,
    });
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.wallet.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );
      if (response?.data?.success) {
        toast.success("Updated successfully");
        fetchData();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const deleteData = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const response = await axios.delete(`${apis.wallet.delete}/${id}`, {
        headers: { Authorization: validToken },
      });
      if (response?.data?.success) {
        toast.success("Deleted successfully");
        fetchData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, sort, search, serviceman, paymentMode, transactionType]);

  // Serviceman options
  const servicemanOptions = [
    { value: "", label: "All Provider" },
    ...servicemen.map((s) => ({
      value: s?.userId,
      label: s?.name,
    })),
  ];

  // Paymentmode options
  const paymentModeOptions = [
    { value: "", label: "All Payment Mode" },
    { value: "Online", label: "Online" },
    { value: "Cash", label: "Cash" },
    { value: "System", label: "System" },
  ];

  // transactionType options
  const transactionTypeOptions = [
    { value: "", label: "All Transaction Type" },
    { value: "Credit", label: "Credit" },
    { value: "Debit", label: "Debit" },
  ];

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Wallet {data?.length}</h5>
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
            <Link to="/add-wallet">
              <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                <i className="fa fa-plus me-2"></i>
                <span>Add</span>
              </button>
            </Link>
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

          {/* Payment Mode Filter */}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="All Payment Mode"
            isClearable
            value={paymentModeOptions.find((o) => o?.value === paymentMode) || null}
            options={paymentModeOptions}
            onChange={(selected) =>
              updateParams({
                paymentMode: selected?.value || "",
                page: 1,
              })
            }
          />

          {/* Transaction Type Filter */}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="All Transaction Type"
            isClearable
            value={transactionTypeOptions.find((o) => o?.value === transactionType) || null}
            options={transactionTypeOptions}
            onChange={(selected) =>
              updateParams({
                transactionType: selected?.value || "",
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
                    <th>Transaction Id</th>
                    <th>Provider</th>
                    <th>Credit Points</th>
                    <th>Transaction Type</th>
                    <th>Mode</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((d, index) => (
                      <tr key={d._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.transactionId || "-"}</td>
                        <td>{d?.provider?.name}</td>
                        <td>{d?.creditPoints}</td>
                        <td>{d?.transactionType}</td>
                        <td>{d?.paymentMode}</td>
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
                            <Link to={`/update-wallet/${d._id}`}>
                              <button className="btn delete-table me-2">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button className="btn delete-table" onClick={() => deleteData(d._id)}>
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : !loading ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No data found
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

export default WalletListPage;
