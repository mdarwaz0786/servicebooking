import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Sidebar = () => {
  const { toggleModal, handleLogout, user } = useContext(AppContext);
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <Link to={'serviceman/dashboard'}>
                  <i className="ti ti-layout-grid" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="active">
                <Link to={'serviceman/booking'}>
                  <i className="ti ti-calendar-month" />
                  <span>Bookings </span>
                </Link>
              </li>
             
              
              <li>
                <Link href="provider-payout.html">
                  <i className="ti ti-wallet" />
                  <span>Payout</span>
                </Link>
              </li>
              
             
              
              <li>
                <Link href="provider-reviews.html">
                  <i className="ti ti-star" />
                  <span>Reviews</span>
                </Link>
              </li>

              <li>
                <Link to={'serviceman/profile'}>
                  <i className="ti ti-user" />
                  <span>Profile</span>
                </Link>
              </li>

              <li>
                <Link to={'./serviceman/kyc'}>
                  <i className="ti ti-info-circle" />
                  <span>Profile Verification</span>
                </Link>
              </li>
              
              <li>
                <Link onClick={handleLogout}>
                  <i className="ti ti-logout-2" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /Sidebar */}
    </>

  );
};

export default Sidebar;