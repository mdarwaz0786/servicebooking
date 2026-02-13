import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      };
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src="assets/img/logo.png" alt="Logo" width={30} height={30} />
        </Link>
        <Link to="/" className="logo-small">
          <img src="assets/img/logo.png" alt="Logo" width={30} height={30} />
        </Link>
      </div>

      <Link className="mobile_btn" id="mobile_btn" to="#">
        <i className="fas fa-align-left" />
      </Link>

      <div className="header-split">
        <div className="page-headers">
          <div className="search-bar">
            {/* <span><i className="fe fe-search" /></span> */}
            {/* <input type="text" placeholder="Search" className="form-control" /> */}
          </div>
        </div>
        <ul className="nav user-menu">
          {/* <li className="nav-item">
            <Link to="/" className="viewsite">
              <i className="fe fe-globe me-2" />View Site
            </Link>
          </li> */}

          {/* User Menu */}
          <li
            className={`nav-item dropdown ${open ? "show" : ""}`}
            ref={dropdownRef}
          >
            <button
              className="user-link nav-link btn btn-link"
              onClick={() => setOpen(!open)}
            >
              <span className="user-img">
                <img
                  className="rounded-circle"
                  src="/assets/img/avatar.png"
                  width={60}
                  alt="avatar"
                />
              </span>
              <span className="user-content">
                <span className="user-name">{user?.name}</span>
                <span className="user-details">{user?.role}</span>
              </span>
            </button>

            <div className={`dropdown-menu menu-drop-user ${open ? "show" : ""}`}>
              <div className="profilemenu">
                <div className="subscription-menu">
                  {/* <ul>
                    <li>
                      <Link to="/account-settings">Profile</Link>
                    </li>
                    <li>
                      <Link to="/localization">Settings</Link>
                    </li>
                  </ul> */}
                </div>
                <div className="subscription-logout">
                  <button
                    className="btn btn-link w-100 text-start"
                    onClick={() => {
                      logOutUser();
                      setOpen(false);
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </li>
          {/* /User Menu */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
