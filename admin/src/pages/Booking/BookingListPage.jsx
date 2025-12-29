/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import ServicemanBookingModal from "./ServicemanBookingModal";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const BookingListPage = () => {
  const { status } = useParams();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { validToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusMap, setStatusMap] = useState({});

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const bookingStatus = searchParams.get("bookingStatus") || "all";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.booking.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          status: status || "active",
          bookingStatus: bookingStatus === "all" ? undefined : bookingStatus,
        },
      });

      if (response?.data?.success) {
        setBookings(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
        const data = response?.data?.data || [];
        const initialStatus = {};
        data.forEach((b) => {
          initialStatus[b?._id] = b?.status;
        });
        setStatusMap(initialStatus)
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch bookings");
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
      bookingStatus,
      ...newParams,
    };
    setSearchParams(params);
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const response = await axios.delete(`${apis.booking.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Booking deleted successfully");
        fetchBookings();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete booking");
    };
  };

  useEffect(() => {
    fetchBookings();
  }, [page, limit, debouncedSearch, sort, status, bookingStatus]);

  const BOOKING_STATUSES = [
    "new",
    "assign",
    "accept",
    "ongoing",
    "reject",
    "complete",
    "cancel",
    "partstatusnew",
    "partstatusconfirm",
    "partstatusapprove",
    "partstatusreject",
  ];

  const updateBookingStatus = async (bookingId) => {
    try {
      const response = await axios.patch(
        `${apis.booking.update}/${bookingId}`,
        { status: statusMap[bookingId] },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Status updated successfully");
        fetchBookings();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const BOOKING_STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "New", value: "new" },
    { label: "Assign", value: "assign" },
    { label: "Accept", value: "accept" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Reject", value: "reject" },
    { label: "Complete", value: "complete" },
    { label: "Cancel", value: "cancel" },
    { label: "Part New", value: "partstatusnew" },
    { label: "Part Confirm", value: "partstatusconfirm" },
    { label: "Part Approve", value: "partstatusapprove" },
    { label: "Part Reject", value: "partstatusreject" },
  ];

  return (
    <>
      <div className="page-wrapper page-settings">
        <div className="content">
          <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
            <h5>Bookings {bookings?.length}</h5>

            <div className="d-flex gap-2 align-items-center">
              {/* Search */}
              <input
                type="text"
                placeholder="Search..."
                className="form-control form-control-sm toolbar-input"
                style={{ width: "200px" }}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  updateParams({ page: 1, search: e.target.value });
                }}
              />

              {/* Sort */}
              <select
                className="form-select form-select-sm"
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
              >
                <option value="desc">DESC</option>
                <option value="asc">ASC</option>
              </select>

              {/* Limit */}
              <select
                className="form-select form-select-sm"
                value={limit}
                onChange={(e) => updateParams({ limit: Number(e.target.value), page: 1 })}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value={total}>All</option>
              </select>
              <div>
                <Link to="/add-booking">
                  <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                    <i className="fa fa-plus me-2"></i>
                    <span>Add</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Booking Status Filters */}
            <div className="d-flex flex-wrap gap-2 mb-0 mt-4">
              {BOOKING_STATUS_FILTERS?.map((s) => (
                <button
                  key={s?.value}
                  type="button"
                  className={`btn btn-sm ${bookingStatus === s?.value
                    ? "btn-secondary"
                    : "btn-outline-secondary"
                    }`}
                  onClick={() =>
                    updateParams({
                      bookingStatus: s?.value,
                      page: 1,
                    })
                  }
                >
                  {s?.label}
                </button>
              ))}
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
                      <th>Booking ID</th>
                      <th>Mode</th>
                      <th>Amount</th>
                      <th>Assign</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings?.length > 0 ? (
                      bookings?.map((d, index) => (
                        <tr key={d?._id}>
                          <td>{(page - 1) * limit + index + 1}</td>
                          <td>{d?.bookingId}</td>
                          <td>{d?.paymentMode}</td>
                          <td>₹{d?.payableAmount}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              type="button"
                              onClick={() => setSelectedBooking(d)}
                              data-bs-toggle="modal"
                              data-bs-target="#serviceManBookingModal"
                            >
                              {(d?.serviceman && Object.keys(d.serviceman).length > 0) ? "Re-assign" : "Assign"}
                            </button>
                          </td>
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
                                {BOOKING_STATUSES?.map((status) => (
                                  <option key={status} value={status}>
                                    {status?.toUpperCase()}
                                  </option>
                                ))}
                              </select>

                              <button
                                className="btn btn-sm btn-success"
                                type="button"
                                onClick={() => updateBookingStatus(d?._id)}
                                disabled={statusMap[d?._id] === d?.status}
                              >
                                Update
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              {/* View Button */}
                              <Link to={`/booking-detail/${d?._id}`}>
                                <button className="btn delete-table me-2" type="button">
                                  <i className="fe fe-eye" />
                                </button>
                              </Link>

                              {/* Delete Button */}
                              <button
                                className="btn delete-table"
                                type="button"
                                onClick={() => deleteBooking(d?._id)}
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
                          No bookings found
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
      <ServicemanBookingModal booking={selectedBooking} fetchBookings={fetchBookings} />
    </>
  );
};

export default BookingListPage;
