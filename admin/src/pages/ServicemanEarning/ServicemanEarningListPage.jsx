/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";
import Select from "react-select";

const ServicemanEarningListPage = () => {
  const { validToken } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [servicemen, setServicemen] = useState([]);

  const serviceman = searchParams.get("serviceman") || "";
  const payoutStatus = searchParams.get("payoutStatus") || "";
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
    };
  };

  useEffect(() => {
    fetchServicemen();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.servicemanEarning.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          serviceman: serviceman || undefined,
          payoutStatus: payoutStatus || undefined,
        },
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
      payoutStatus,
      ...newParams,
    });
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.servicemanEarning.update}/${id}`,
        { payoutStatus: !currentStatus },
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

  useEffect(() => {
    fetchData();
  }, [page, limit, sort, search, serviceman, payoutStatus]);

  const servicemanOptions = [
    { value: "", label: "All Provider" },
    ...servicemen.map((s) => ({
      value: s?.userId,
      label: s?.name,
    })),
  ];

  const payoutOptions = [
    { value: "", label: "All Payoutn Staus" },
    { value: "true", label: "Paid" },
    { value: "false", label: "Unpaid" },
  ];

  const selectedServiceman = servicemanOptions.find((o) => o?.value === serviceman);
  const selectedPayout = payoutOptions.find((o) => o?.value === payoutStatus);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Provider Earning {data?.length}</h5>
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

        <div className="d-flex mt-4 mb-0">
          <Select
            className="w-auto me-3"
            classNamePrefix="react-select"
            options={servicemanOptions}
            value={selectedServiceman}
            onChange={(option) =>
              updateParams({
                serviceman: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Select Provider"
          />

          <Select
            className="w-auto"
            classNamePrefix="react-select"
            options={payoutOptions}
            value={selectedPayout}
            onChange={(option) =>
              updateParams({
                payoutStatus: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Payout Status"
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
                    <th>Provider</th>
                    <th>Payable Amount</th>
                    <th>Earning Percent</th>
                    <th>Earning Amout</th>
                    <th>Payout Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 ? (
                    data?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.payableAmount}</td>
                        <td>{d?.serviceman?.name}</td>
                        <td>{d?.earningAmount}</td>
                        <td>{d?.earningPercent}</td>
                        <td>
                          <div className="active-switch">
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={d?.payoutStatus}
                                onChange={() => toggleStatus(d?._id, d?.payoutStatus)}
                              />
                              <span className="sliders round" />
                            </label>
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

export default ServicemanEarningListPage;
