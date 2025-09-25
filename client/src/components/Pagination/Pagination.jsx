import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Pagination = ({ handlePagination }) => {
  const { pagination } = useContext(AppContext);
  
  return (

    <nav aria-label="Page navigation">
      <ul className="paginations d-flex justify-content-center align-items-center">
        <li className={`page-item me-3 ${pagination.currentPage === 1 ? "disabled" : ""}`}>
          <Link className="page-link" 
          onClick={()=> handlePagination(pagination.currentPage-1)}
          >
            <i className="ti ti-arrow-left me-2" /> Prev
          </Link>
        </li>
        {pagination.pages && pagination?.pages?.length > 0 ? (
          pagination.pages.map((item, index) => (
            <li className="page-item me-2" key={index}>
              <Link
                className={`page-link-1 d-flex justify-content-center align-items-center ${
                  pagination.currentPage === item ? "active" : ""
                }`}
                onClick={()=> handlePagination(item)}
              >
                {item}
              </Link>
            </li>
          ))
        ) : (
          null
        )}
        
        <li className={`page-item ${pagination.currentPage === pagination?.pages?.length ? "disabled" : ""}`}>
          <Link className="page-link" onClick={()=> handlePagination(pagination.currentPage+1)}>
            Next <i className="ti ti-arrow-right ms-2" />
          </Link>
        </li>
      </ul>
    </nav>

  );
};

export default Pagination;





