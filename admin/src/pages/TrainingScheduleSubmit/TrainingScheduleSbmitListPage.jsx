/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import { formatDate } from "../../helpers/formatDate";
import Pagination from "../../components/Pagination/Pagination";

const TrainingScheduleSubmitListPage = () => {
  const { validToken } = useAuth();
  const [trainingScheduleSubmit, setTrainingScheduleSubmit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [statusMap, setStatusMap] = useState({});
  const [attendanceMap, setAttendanceMap] = useState({});
  const [servicemen, setServicemen] = useState([]);
  const [training, setTraining] = useState([]);
  const [remarksMap, setRemarksMap] = useState({});

  const trainer = searchParams.get("trainer") || "";
  const serviceman = searchParams.get("serviceman") || "";
  const status = searchParams.get("status") || "";
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

  const fetchTrainer = async () => {
    try {
      const res = await axios.get(apis.training.get, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setTraining(res?.data?.data || []);
      }
    } catch (err) {
      console.log(err)
    };
  };

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
    fetchTrainer()
  }, []);

  const fetchTrainingScheduleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.trainingScheduleSubmit.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          serviceman,
          trainer,
          sort,
          status,
        },
      });

      if (response?.data?.success) {
        setTrainingScheduleSubmit(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch training schedule");
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
      serviceman,
      trainer,
      status,
      ...newParams,
    };
    setSearchParams(params);
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.trainingScheduleSubmit.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchTrainingScheduleSubmit();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  const deleteTrainingScheduleSubmit = async (id) => {
    if (!window.confirm("Are you sure you want to delete this training schedule submit?")) return;

    try {
      const response = await axios.delete(`${apis.trainingScheduleSubmit.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Training schedule submit deleted successfully");
        fetchTrainingScheduleSubmit();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete training schedule submit");
    };
  };

  useEffect(() => {
    fetchTrainingScheduleSubmit();
  }, [page, limit, debouncedSearch, sort, serviceman, trainer, status]);

  const STATUSES = ["New", "Reject", "Fail", "Complete", "Reschedule"];
  const ATTENDANCESTATUS = ["Pending", "Present", "Absent"];

  const updateStatus = async (id, remarks) => {
    try {
      const response = await axios.patch(
        `${apis.trainingScheduleSubmit.update}/${id}`,
        { trainingScheduleStatus: statusMap[id], remarks: remarks },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Status updated successfully");
        fetchTrainingScheduleSubmit();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const updateAttendanceStatus = async (id) => {
    try {
      const response = await axios.patch(
        `${apis.trainingScheduleSubmit.update}/${id}`,
        { attendanceStatus: attendanceMap[id] },
        {
          headers: { Authorization: validToken },
        }
      );

      if (response?.data?.success) {
        toast.success("Status updated successfully");
        fetchTrainingScheduleSubmit();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const servicemanOptions = [
    { value: "", label: "All Provider" },
    ...servicemen.map((s) => ({
      value: s?.userId,
      label: s?.name,
    })),
  ];

  const trainerOptions = [
    { value: "", label: "All Trainer" },
    ...training.map((s) => ({
      value: s?._id,
      label: s?.fullName,
    })),
  ];

  const statusOptions = [
    { value: "", label: "All Training Status" },
    { value: "New", label: "New" },
    { value: "Reject", label: "Reject" },
    { value: "Fail", label: "Fail" },
    { value: "Complete", label: "Complete" },
    { value: "Reschedule", label: "Reschedule" },
  ];

  const selectedServiceman = servicemanOptions.find((o) => o?.value === serviceman);
  const selectedTrainer = trainerOptions.find((o) => o?.value === trainer);
  const selectedStatus = statusOptions.find((o) => o?.value === status);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Training Schedule Submit {trainingScheduleSubmit?.length}</h5>

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

        <div className="d-flex mt-4 mb-0">
          <Select
            className="w-auto me-3"
            classNamePrefix="react-select"
            options={trainerOptions}
            value={selectedTrainer}
            onChange={(option) =>
              updateParams({
                trainer: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Select Trainer"
          />

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

          {/* Status Filter */}
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="All Status"
            isClearable
            value={selectedStatus}
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
                    <th>Trainer</th>
                    <th>Provider</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Training Status</th>
                    <th>Attendance Status</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {trainingScheduleSubmit?.length > 0 ? (
                    trainingScheduleSubmit?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.training?.fullName}</td>
                        <td>{d?.profile?.name}</td>
                        <td>{formatDate(d?.scheduleDate)}</td>
                        <td>{d?.scheduleTime}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              style={{ width: "110px", display: "block" }}
                              className="form-select form-select-sm"
                              value={statusMap[d?._id] || d?.trainingScheduleStatus}
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
                              onClick={() => updateStatus(d?._id, remarksMap[d?._id])}
                              disabled={statusMap[d?._id] === d?.trainingScheduleStatus}
                            >
                              Update
                            </button>
                          </div>
                          {
                            statusMap[d?._id] !== "New" && (
                              <input
                                className="form-control mt-2"
                                placeholder="Enter Remarks"
                                type="text"
                                name={d?._id}
                                id={d?._id}
                                onChange={(e) =>
                                  setRemarksMap({
                                    ...remarksMap,
                                    [d?._id]: e.target.value,
                                  })
                                }
                                value={remarksMap[d?._id] ?? d?.remarks ?? ""}
                              />
                            )
                          }
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              style={{ width: "110px" }}
                              className="form-select form-select-sm"
                              value={attendanceMap[d?._id] || d?.attendanceStatus}
                              onChange={(e) =>
                                setAttendanceMap({
                                  ...attendanceMap,
                                  [d?._id]: e.target.value,
                                })
                              }
                            >
                              {ATTENDANCESTATUS?.map((status) => (
                                <option key={status} value={status}>
                                  {status?.toUpperCase()}
                                </option>
                              ))}
                            </select>

                            <button
                              className="btn btn-sm btn-success"
                              type="button"
                              onClick={() => updateAttendanceStatus(d?._id)}
                              disabled={attendanceMap[d?._id] === d?.status}
                            >
                              Update
                            </button>
                          </div>
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
                            <Link to={`/training-schedule-submit-detail`} state={{ record: d }}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteTrainingScheduleSubmit(d?._id)}
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
                        No training schedule submit found
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

export default TrainingScheduleSubmitListPage;
