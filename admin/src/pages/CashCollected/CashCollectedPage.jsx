/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const CashCollectedPage = () => {
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
      const response = await axios.get(apis.cashCollected.get, {
        headers: { Authorization: validToken },
        params: { page, limit, search: debouncedSearch, sort, serviceman },
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
      ...newParams,
    });
  };

  useEffect(() => {
    fetchData();
  }, [page, limit, sort, search, serviceman]);

  const servicemanOptions = [
    { value: "", label: "All Provider" },
    ...servicemen.map((s) => ({
      value: s?.userId,
      label: `${s?.name} - ${s?.servicemanId}`,
    })),
  ];

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Cash Collected {data?.length}</h5>
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
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Booking Id</th>
                    <th>Provider</th>
                    <th>Collected Amount</th>
                    <th>Total Collected Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.booking?.bookingId || "-"}</td>
                        <td>{d?.profile?.name || "-"}</td>
                        <td>₹{d?.amount?.toFixed(2) || "-"}</td>
                        <td>₹{d?.totalCashCollected?.toFixed(2) || "-"}</td>
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

export default CashCollectedPage;
