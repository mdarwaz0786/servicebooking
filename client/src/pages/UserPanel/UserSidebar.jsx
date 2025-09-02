import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="col-xl-3 col-lg-4 theiaStickySidebar">
      <div className="card user-sidebar mb-4 mb-lg-0">
        <div className="card-header user-sidebar-header mb-4">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <span className="user rounded-circle avatar avatar-xxl mb-2">
              <img src="assets/img/profiles/avatar-21.jpg" className="img-fluid rounded-circle" alt="Img" />
            </span>
            <h6 className="mb-2">John Smith</h6>
            <p className="fs-14">Member Since Sep 2021</p>
          </div>
        </div>
        <div className="card-body user-sidebar-body p-0">
          <ul>
            <li className="mb-4">
              <Link to="user-dashboard" className="d-flex align-items-center active">
                <i className="ti ti-layout-grid me-2" />
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/user-booking" className="d-flex align-items-center">
                <i className="ti ti-device-mobile me-2" />
                Bookings
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/user-favourites" className="d-flex align-items-center">
                <i className="ti ti-heart me-2" />
                Favorites
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/user-wallet" className="d-flex align-items-center">
                <i className="ti ti-wallet me-2" />
                Wallet
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/user-reviews" className="d-flex align-items-center">
                <i className="ti ti-star me-2" />
                Reviews
              </Link>
            </li>
            <li className="submenu">
              <Link to="#" className="d-block mb-3"><i className="ti ti-settings me-2" /><span>Settings</span><span className="menu-arrow" /></Link>
              <ul className="ms-4">
                <li className="mb-3">
                  <Link to="/account-settings" className="fs-14 d-inline-flex align-items-center"><i className="ti ti-chevrons-right me-2" />Account Settings</Link>
                </li>
                <li className="mb-3">
                  <Link to="/security-settings" className="fs-14 d-inline-flex align-items-center"><i className="ti ti-chevrons-right me-2" />Security Settings</Link>
                </li>
                <li className="mb-3">
                  <Link to="/notification-settings" className="fs-14 d-inline-flex align-items-center"><i className="ti ti-chevrons-right me-2" />Notifications</Link>
                </li>
                <li className="mb-3">
                  <Link to="/connected-apps" className="fs-14 d-inline-flex align-items-center"><i className="ti ti-chevrons-right me-2" />Connected Apps</Link>
                </li>
                <li className="mb-3">
                  <Link to="/javascript:void(0);" data-bs-toggle="modal" data-bs-target="#del-account" className="fs-14"><i className="ti ti-chevrons-right me-2" />Delete Account</Link>
                </li>
              </ul>
            </li>
            <li className="mb-0">
              <Link to="/login" className="d-flex align-items-center">
                <i className="ti ti-logout me-2" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;