import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Header = () => {

    const { toggleModal, handleLogout, user, imageCheck } = useContext(AppContext);

  return (
    <>
        {/* Header */}
        <div className="header provider-header">
            {/* Logo */}
            <div className="header-left active">
            <Link to="index.html" className="logo logo-normal">
                <img src="/assets/img/logo.png" alt="Logo" />
            </Link>
            <Link to="index.html" className="logo-small">
                <img src="/assets/img/logo-small.png" alt="Logo" />
            </Link>
            <Link id="toggle_btn">
                <i className="ti ti-menu-deep" />
            </Link>
            </div>
            {/* /Logo */}
            <Link id="mobile_btn" className="mobile_btn" to="#sidebar">
            <span className="bar-icon">
                <span />
                <span />
                <span />
            </span>
            </Link>
            <div className="header-user">
            <div className="nav user-menu">
                
                <div className="d-flex align-items-center">
                
                
                
                <div className="dropdown">
                    <Link data-bs-toggle="dropdown">
                    <div className="booking-user d-flex align-items-center">
                        <span className="user-img">
                        <img src={imageCheck(user.image, 'user.png')} alt="user" />
                        </span>
                    </div>
                    </Link>
                    <ul className="dropdown-menu p-2">
                    <li>
                        <Link
                        className="dropdown-item d-flex align-items-center"
                        to="login.html"
                        >
                        <i className="ti ti-logout me-1" />
                        Logout
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            {/* Mobile Menu */}
            <div className="dropdown mobile-user-menu">
            <Link
                                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="fa fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="profile.html">
                My Profile
                </Link>
                <Link className="dropdown-item" to="profile-settings.html">
                Settings
                </Link>
                <Link className="dropdown-item" to="login.html">
                Logout
                </Link>
            </div>
            </div>
            {/* /Mobile Menu */}
        </div>
        {/* /Header */}
        </>

  );
};

export default Header;