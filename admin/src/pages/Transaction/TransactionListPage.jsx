/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import { formatDate } from "../../helpers/formatDate";
import Pagination from "../../components/Pagination/Pagination";

const TransactionListPage = () => {
  const { from } = useParams();
  const { validToken } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [summary, setSummary] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.transaction.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          month,
          year,
          from: from,
        },
      });

      if (response?.data?.success) {
        setTransactions(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
        setSummary(response?.data?.summary || null);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    };
  };

  const months = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const updateParams = (newParams) => {
    const params = {
      page,
      limit,
      search: debouncedSearch,
      sort,
      year,
      month,
      ...newParams,
    };
    setSearchParams(params);
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, limit, debouncedSearch, sort, from, year, month]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Payments {transactions?.length}</h5>

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

            {/* Month Filter */}
            <select
              className="form-select form-select-sm w-auto"
              value={month}
              onChange={(e) =>
                updateParams({ month: e.target.value, page: 1 })
              }
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* Year Filter */}
            <select
              className="form-select form-select-sm w-auto"
              value={year}
              onChange={(e) =>
                updateParams({ year: e.target.value, page: 1 })
              }
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>


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

        {summary && (
          <div className="row mb-0 mt-4">
            <div className="col-md-2">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">This Week</h6>
                  <h5 className="mb-1">₹{summary?.thisWeek?.amount?.toFixed(2)}</h5>
                  <small>{summary?.thisWeek?.count} Transactions</small>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">This Month</h6>
                  <h5 className="mb-1">₹{summary?.thisMonth?.amount?.toFixed(2)}</h5>
                  <small>{summary?.thisMonth?.count} Transactions</small>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Last Three Month</h6>
                  <h5 className="mb-1">₹{summary?.lastThreeMonths?.amount?.toFixed(2)}</h5>
                  <small>{summary?.lastThreeMonths?.count} Transactions</small>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">This Year</h6>
                  <h5 className="mb-1">₹{summary?.thisYear?.amount?.toFixed(2)}</h5>
                  <small>{summary?.thisYear?.count} Transactions</small>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="text-muted">Total</h6>
                  <h5 className="mb-1">₹{summary?.overall?.amount?.toFixed(2)}</h5>
                  <small>{summary?.overall?.count} Transactions</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div" style={{ paddingTop: 0 }}>
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transaction Id</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Amount</th>
                    {/* <th>Mode</th> */}
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 ? (
                    transactions?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.transactionId || "-"}</td>
                        <td>{d?.user?.name || "-"}</td>
                        <td>{d?.user?.mobile || "-"}</td>
                        <td>{d?.finalAmount?.toFixed(2)}</td>
                        {/* <td>{d?.PID?.paymentMode || "-"}</td> */}
                        <td>Debit</td>
                        <td>{formatDate(d?.createdAt)}</td>
                        <td>{d?.status}</td>
                        <td>
                          <div className="d-flex">
                            {/* View Button */}
                            <Link to={`/transaction-detail/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-eye" />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : !loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No transactions found
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

export default TransactionListPage;
