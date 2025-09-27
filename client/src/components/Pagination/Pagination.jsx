import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Pagination = ({ handlePagination }) => {
  const { pagination } = useContext(AppContext);
  
  return (

    <>
      
      {(pagination.totalPages)?(

        <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
          <div className="value d-flex align-items-center">
            <span>Show</span>
            <select onChange={(e) => handlePagination(1, Number(e.target.value))}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <span className="me-2 text-gray-9">{pagination.currentPage==1?pagination.currentPage:pagination.currentPage*pagination.limit} - {pagination.currentPage*pagination.limit} of {pagination.totalPages}</span>
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
          </div>
        </div>
        ):(null)}


    

    </>

  );
};

export default Pagination;





