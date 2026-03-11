/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import Pagination from "../../components/Pagination/Pagination";

const ServicemanProfileListPage = () => {
  const { validToken } = useAuth();
  const [servicemanProfile, setServicemanProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [hasPrevPage, setHasPrevPage] = useState();
  const [hasNextPage, setHasNexrPage] = useState();
  const [total, setTotal] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  // const [statusMap, setStatusMap] = useState({});

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "desc";
  const category = searchParams.get("category") || "";
  const experienceLevel = searchParams.get("experienceLevel") || "";
  const profileStatus = searchParams.get("profileStatus") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(apis.category.get, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        setCategories(res?.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchServicemanProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.servicemanProfile.get, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
          category: category || undefined,
          experienceLevel: experienceLevel || undefined,
          profileStatus: profileStatus || undefined,
        },
      });

      if (response?.data?.success) {
        setServicemanProfile(response?.data?.data || []);
        setPagination(response?.data?.pagination || null);
        setTotal(response?.data?.total || 1);
        setHasNexrPage(response?.data?.hasNextPage);
        setHasPrevPage(response?.data?.hasPrevPage);
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch serviceman profile");
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
      category,
      experienceLevel,
      profileStatus,
      ...newParams,
    };
    setSearchParams(params);
  };

  const deleteServicemanProfile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this serviceman profile?")) return;

    try {
      const response = await axios.delete(`${apis.servicemanProfile.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Serviceman profile deleted successfully");
        fetchServicemanProfile();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete serviceman profile");
    };
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.servicemanProfile.updateStatus}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );
      if (response?.data?.success) {
        toast.success("Updated successfully");
        fetchServicemanProfile();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchServicemanProfile();
  }, [page, limit, debouncedSearch, sort, category, experienceLevel, profileStatus]);

  const categoryOptions = categories?.map((c) => ({
    value: c?._id,
    label: c?.name,
  }));

  const STATUSES = [
    "Pending",
    "Approved",
    "Rejected"
  ];

  // const updateStatus = async (id) => {
  //   try {
  //     const response = await axios.patch(
  //       `${apis.servicemanProfile.update}/${id}`,
  //       { profileStatus: statusMap[id] },
  //       {
  //         headers: { Authorization: validToken },
  //       }
  //     );

  //     if (response?.data?.success) {
  //       toast.success("Status updated successfully");
  //       fetchServicemanProfile();
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || "Failed to update status");
  //   }
  // };

  const experienceOptions = [
    { value: "Fresher", label: "Fresher" },
    { value: "Experience", label: "Experience" },
  ];

  const profileStatusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const selectedCategory = categoryOptions?.find((o) => o?.value === category);
  const selectedExperience = experienceOptions?.find((o) => o?.value === experienceLevel);
  const selectedProfileStatus = profileStatusOptions?.find((o) => o?.value === profileStatus);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Service Man Profile {servicemanProfile?.length}</h5>

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
          {/* Category */}
          <Select
            className="w-auto"
            classNamePrefix="react-select"
            options={categoryOptions}
            value={selectedCategory || null}
            onChange={(option) =>
              updateParams({
                category: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Product"
          />

          {/* Experience */}
          <Select
            className="w-auto"
            classNamePrefix="react-select"
            options={experienceOptions}
            value={selectedExperience || null}
            onChange={(option) =>
              updateParams({
                experienceLevel: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Experience Level"
          />

          {/* Profile Status */}
          <Select
            className="w-auto"
            classNamePrefix="react-select"
            options={profileStatusOptions}
            value={selectedProfileStatus || null}
            onChange={(option) =>
              updateParams({
                profileStatus: option?.value || "",
                page: 1,
              })
            }
            isClearable
            placeholder="Profile Status"
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
                    <th>Product</th>
                    <th>Variant</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Experience</th>
                    <th>Zone</th>
                    {/* <th>Profile Status</th> */}
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {servicemanProfile?.length > 0 ? (
                    servicemanProfile?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>{d?.categories?.map((value) => <p className="mb-1" key={value?._id}>{value?.name}</p>)}</td>
                        <td>{d?.subCategories?.map((value) => <p className="mb-1" key={value?._id}>{value?.name || "-"}</p>)}</td>
                        <td>{d?.name || "-"}</td>
                        <td>{d?.user?.mobile || "-"}</td>
                        <td>{d?.experienceLevel || "-"}</td>
                        <td>{d?.zones?.map((z) => <p className="mb-1" key={z?._id}>{z?.name || "-"}</p>)}</td>
                        {/* <td>
                          <div className="d-flex align-items-center gap-2">
                            <select
                              className="form-select form-select-sm"
                              style={{ width: "120px" }}
                              value={statusMap[d?._id] || d?.profileStatus}
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
                              disabled={statusMap[d?._id] === d?.profileStatus}
                            >
                              Update
                            </button>
                          </div>
                        </td> */}
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
                            <Link to={`/service-man-profile-update/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            {/* <Link to="/service-man-profile-detail" state={{ record: d }}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-eye" />
                              </button>
                            </Link> */}
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteServicemanProfile(d?._id)}
                              disabled={true}
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
                        No serviceman profile found
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

export default ServicemanProfileListPage;
