import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header header-new">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            {/* Mobile button can stay as anchor if it’s only for toggling */}
            <a id="mobile_btn" href="javascript:void(0);">
              <span className="bar-icon">
                <span />
                <span />
                <span />
              </span>
            </a>

            {/* Brand logos */}
            <Link to="/" className="navbar-brand logo">
              <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
            <Link to="/" className="navbar-brand logo-small">
              <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
          </div>

          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
              </Link>
              <a id="menu_close" className="menu-close" href="javascript:void(0);">
                <i className="fas fa-times" />
              </a>
            </div>

            <ul className="main-nav align-items-lg-center">
              <li className="has-submenu megamenu active">
                <Link to="/">Home </Link>
              </li>
              <li className="has-submenu">
                <Link to="/services">Services </Link>
              </li>
              <li className="has-submenu">
                <Link to="/user-dashboard">Customers</Link>
              </li>
              <li className="has-submenu">
                <Link to="/providers">Providers <i className="fas fa-chevron-down" /></Link>
              </li>
              <li className="nav-item">
                <Link to="/become-provider" className="nav-link">Become a Provider</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">Admin</Link>
              </li>
              <li className="nav-item d-sm-none">
                <Link to="/login" className="nav-link">Sign In</Link>
              </li>
              <li className="nav-item d-sm-none">
                <Link to="/register" className="nav-link">Join Us</Link>
              </li>
            </ul>
          </div>

          <ul className="nav header-navbar-rht">
            <li className="nav-item pe-1">
              <Link to="/login" className="nav-link btn btn-light">
                <i className="ti ti-lock me-2" />Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link btn btn-linear-primary">
                <i className="ti ti-user-filled me-2" />Join Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
