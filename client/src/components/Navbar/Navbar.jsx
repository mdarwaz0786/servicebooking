import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { scrollToService, scrollToTop } from "../../helper/scrollToTop";

const Navbar = () => {
  const { toggleModal, handleLogout, user } = useContext(AppContext);

  const handleLinkClick = () => {
    scrollToTop("instant");
  };

  const handleLinkClickService = () => {
    scrollToService("instant");
  };

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
            <Link to="/" className="navbar-brand logo" onClick={handleLinkClick}>
              <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
            <Link to="/" className="navbar-brand logo-small" onClick={handleLinkClick}>
              <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
          </div>

          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo" onClick={handleLinkClick}>
                <img src="" className="img-fluid" alt="Logo" />
              </Link>
              <a id="menu_close" className="menu-close" href="javascript:void(0);">
                <i className="fas fa-times" />
              </a>
            </div>

            <ul className="main-nav align-items-lg-center">
              <li className="has-submenu megamenu">
                <Link to="/" onClick={handleLinkClick}>Home </Link>
              </li>
              <li className="has-submenu">
                <Link to="/about-us" onClick={handleLinkClick}>About Us </Link>
              </li>
              <li className="has-submenu">
                <Link to="/" onClick={handleLinkClickService}>Services </Link>
              </li>
              <li className="nav-item d-sm-none">
                <Link to="/login" className="nav-link" onClick={handleLinkClick}>Sign In</Link>
              </li>
              <li className="nav-item d-sm-none">
                <Link to="/register" className="nav-link" onClick={handleLinkClick}>Join Us</Link>
              </li>
            </ul>
          </div>

          <ul className="nav header-navbar-rht">
            <li className="nav-item pe-1">
              <>
                {(localStorage.getItem("user")) ? (
                  <>
                    {(user?.role == 'user') ? (
                      <Link to={'/user'} className="btn btn-linear-primary" onClick={handleLinkClick} >
                        <i className="ti ti-user me-2" />Account
                      </Link>
                    ) : (
                      <Link to={'/serviceman/dashboard'} className="btn btn-linear-primary" onClick={handleLinkClick} >
                        <i className="ti ti-user me-2" />Account
                      </Link>
                    )}
                    <Link className="btn btn-linear-primary  m-2" onClick={handleLogout}>
                      <i className="ti ti-lock me-2" />Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-linear-primary me-1 " onClick={() => toggleModal("loginModal", true)}>
                      <i className="ti ti-lock me-2" />Login
                    </Link>
                    <Link className="btn btn-linear-primary" onClick={() => toggleModal("serviceManJoinModal", true)}><i className="ti ti-user-filled me-2"></i>Join As Team</Link>

                  </>
                )}
              </>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
