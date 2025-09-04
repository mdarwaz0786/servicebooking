import { Link } from "react-router-dom";

const Pagination = ({ value = [] }) => {
  console.log(value)
  return (

    <nav aria-label="Page navigation">
      <ul className="paginations d-flex justify-content-center align-items-center">
        <li className="page-item me-3">
          <Link className="page-link" to="#">
            <i className="ti ti-arrow-left me-2" /> Prev
          </Link>
        </li>
        <li className="page-item me-2">
          <Link
            className="page-link-1 active d-flex justify-content-center align-items-center"
            to="#"
          >
            1
          </Link>
        </li>
        <li className="page-item me-2">
          <Link
            className="page-link-1 d-flex justify-content-center align-items-center"
            to="#"
          >
            2
          </Link>
        </li>
        <li className="page-item me-3">
          <Link
            className="page-link-1 d-flex justify-content-center align-items-center"
            to="#"
          >
            3
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to="#">
            Next <i className="ti ti-arrow-right ms-2" />
          </Link>
        </li>
      </ul>
    </nav>

  );
};

export default Pagination;





