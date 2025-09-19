import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li>
                <a href="provider-dashboard.html">
                  <i className="ti ti-layout-grid" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li className="active">
                <a href="provider-booking.html">
                  <i className="ti ti-calendar-month" />
                  <span>Bookings </span>
                </a>
              </li>
             
              
              <li>
                <a href="provider-payout.html">
                  <i className="ti ti-wallet" />
                  <span>Payout</span>
                </a>
              </li>
              
             
              
              <li>
                <a href="provider-reviews.html">
                  <i className="ti ti-star" />
                  <span>Reviews</span>
                </a>
              </li>
              
              <li className="submenu">
                <a href="javascript:void(0);">
                  <i className="ti ti-settings" />
                  <span>Settings</span>
                  <span className="menu-arrow" />
                </a>
                <ul>
                  
                  <li>
                    <a href="provider-accounts-settings.html">
                      <i className="ti ti-chevrons-right me-2" />
                      Account
                    </a>
                  </li>
                 
                  <li>
                    <a href="verification.html">
                      <i className="ti ti-chevrons-right me-2" />
                      Profile Verification
                    </a>
                  </li>
                  
                </ul>
              </li>
              <li>
                <a href="login.html">
                  <i className="ti ti-logout-2" />
                  <span>Logout</span>
                </a>
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