import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Navbar = () => {
  const { toggleModal, handleLogout, user } = useContext(AppContext);
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
              <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
            <Link to="/" className="navbar-brand logo-small">
              <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
            </Link>
          </div>

          <div className="main-menu-wrapper">
            <div className="menu-header">
              <Link to="/" className="menu-logo">
                <img src="/assets/img/logo.png" className="img-fluid" alt="Logo" />
              </Link>
              <a id="menu_close" className="menu-close" href="javascript:void(0);">
                <i className="fas fa-times" />
              </a>
            </div>

            <ul className="main-nav align-items-lg-center">
              <li className="has-submenu megamenu">
                <Link to="/">Home </Link>
              </li>
              <li className="has-submenu">
                <Link to="/services">About Us </Link>
              </li>
              <li className="has-submenu">
                <Link to="/services">Services </Link>
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
              <>
                {(localStorage.getItem("user")) ? (
                  <>
                  {(user?.role=='user')?(                  
                      <Link to={'/user'} className="btn btn-linear-primary " >
                        <i className="ti ti-user me-2" />Account
                      </Link>
                  ):(
                    <Link to={'/serviceman/dashboard'} className="btn btn-linear-primary " >
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
                    <Link className="btn btn-linear-primary" onClick={() => toggleModal("serviceManJoinModal", true)}><i className="ti ti-user-filled me-2"></i>Join As Partner</Link>
                    
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
