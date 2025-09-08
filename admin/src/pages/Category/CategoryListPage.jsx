/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis, { BASE_URL } from "../../apis/apis";

const CategoryListPage = () => {
  const { validToken } = useAuth();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination, search, sorting
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc"); // asc | desc
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // delay 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apis.category.getAll, {
        headers: { Authorization: validToken },
        params: {
          page,
          limit,
          search: debouncedSearch,
          sort,
        },
      });

      if (response?.data?.success) {
        setCategories(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle Status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${apis.category.update}/${id}`,
        { status: !currentStatus },
        { headers: { Authorization: validToken } }
      );

      if (response?.data?.success) {
        fetchCategories();
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    };
  };

  // ✅ Delete Category
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`${apis.category.delete}/${id}`, {
        headers: { Authorization: validToken },
      });

      if (response?.data?.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, limit, debouncedSearch, sort]);

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit mb-0 d-flex align-items-center justify-content-between">
          <h5>Categories {categories?.length}</h5>

          <div className="d-flex gap-2 align-items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="form-control form-control-sm toolbar-input"
              style={{ width: "200px" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            {/* Sort */}
            <select
              className="form-select form-select-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="desc">DESC</option>
              <option value="asc">ASC</option>
            </select>

            {/* Limit */}
            <select
              className="form-select form-select-sm"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </select>

            <div>
              <Link to="/add-category">
                <button className="btn btn-sm btn-primary d-flex align-items-center" type="button">
                  <i className="fa fa-plus me-2"></i>
                  <span>Add</span>
                </button>
              </Link>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-12">
            <div className="table-responsive table-div">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : categories?.length > 0 ? (
                    categories?.map((d, index) => (
                      <tr key={d?._id}>
                        <td>{(page - 1) * limit + index + 1}</td>
                        <td>
                          <img
                            src={d?.image ? `${BASE_URL}/${d.image}` : "https://via.placeholder.com/50"}
                            className="me-2"
                            alt="image"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>{d?.name}</td>
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
                            <Link to={`/update-category/${d?._id}`}>
                              <button className="btn delete-table me-2" type="button">
                                <i className="fe fe-edit" />
                              </button>
                            </Link>
                            <button
                              className="btn delete-table"
                              type="button"
                              onClick={() => deleteCategory(d?._id)}
                            >
                              <i className="fe fe-trash-2" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ✅ Modern Pagination Controls */}
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center align-items-center">

                {/* Previous Button */}
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => setPage(page - 1)}
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
                      className={`page-link rounded-circle shadow-sm ${page === i + 1 ? "bg-primary text-white border-primary" : ""
                        }`}
                      onClick={() => setPage(i + 1)}
                      style={{ width: "40px", height: "40px" }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => setPage(page + 1)}
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

export default CategoryListPage;
