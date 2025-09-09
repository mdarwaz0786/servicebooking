import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-4 text-danger">403</h1>
      <h3>Unauthorized</h3>
      <p>You do not have permission to access this page.</p>
      <Link to="/login" className="btn btn-primary">
        Go to Login
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
