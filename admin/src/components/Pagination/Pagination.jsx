const Pagination = ({
  pagination,
  page,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}) => {
  if (!pagination) return null;
  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-center align-items-center">
        {/* Prev */}
        <li className={`page-item ${!hasPrevPage ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
            style={{ width: "40px", height: "40px" }}
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
        </li>
        {/* Pages */}
        {pagination?.pages?.map((p, index) => {
          if (p === "...") {
            return (
              <li key={`dots-${index}`} className="page-item disabled mx-1">
                <span
                  className="page-link rounded-circle shadow-sm"
                  style={{ width: "40px", height: "40px" }}
                >
                  ...
                </span>
              </li>
            );
          }
          return (
            <li
              key={p}
              className={`page-item mx-1 ${page === p ? "active" : ""}`}
            >
              <button
                className={`page-link rounded-circle shadow-sm ${page === p ? "bg-primary text-white border-primary" : ""}`}
                style={{ width: "40px", height: "40px" }}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          );
        })}
        {/* Next */}
        <li className={`page-item ${!hasNextPage ? "disabled" : ""}`}>
          <button
            className="page-link d-flex align-items-center justify-content-center rounded shadow-sm"
            style={{ width: "40px", height: "40px" }}
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
