import { Link } from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      };
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      };
    });
  }, []);

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/">
            <img src="assets/img/logo.png" className="img-fluid logo" alt="Logo" />
          </Link>
          <Link to="/">
            <img src="assets/img/logo.png" className="img-fluid logo-small" alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title m-0">
              <h6>Home</h6>
            </li>
            <li>
              <Link to="/" className={currentPath === "/" ? "active" : ""}>
                <i className="fe fe-grid" /> <span>Dashboard</span>
              </Link>
            </li>

            <li className="menu-title">
              <h6>Services</h6>
            </li>

            <li>
              <Link to="#"><i class="fe fe-briefcase"></i>
                <span>Master</span>
                <span class="menu-arrow"><i class="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/categories"
                    className={currentPath === "/categories" ? "active" : ""}
                  >
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sub-categories"
                    className={currentPath === "/sub-categories" ? "active" : ""}
                  >
                    <span>Variants</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sub-sub-categories"
                    className={currentPath === "/sub-sub-categories" ? "active" : ""}
                  >
                    <span>Service Process</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sub-sub-sub-categories"
                    className={currentPath === "/sub-sub-sub-categories" ? "active" : ""}
                  >
                    <span>Nested Service Process</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className={currentPath === "/services" ? "active" : ""}
                  >
                    <span>Services</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i class="fe fe-briefcase"></i>
                <span>Service Master</span>
                <span class="menu-arrow"><i class="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="#"
                    className={currentPath === "/service-included" ? "active" : ""}
                  >
                    <span>Service Included</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className={currentPath === "/requirement-from-customer" ? "active" : ""}
                  >
                    <span>Requirement From Customer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/why-choose-us"
                    className={currentPath === "/why-choose-us" ? "active" : ""}
                  >
                    <span>Why Choose Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/expert-technician"
                    className={currentPath === "/expert-technician" ? "active" : ""}
                  >
                    <span>Expert Technician</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brand-logo"
                    className={currentPath === "/brand-logo" ? "active" : ""}
                  >
                    <span>Brand Logo</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gi-promise"
                    className={currentPath === "/gi-promise" ? "active" : ""}
                  >
                    <span>GI Promise</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link
                to="/time-slots"
                className={currentPath === "/time-slots" ? "active" : ""}
              >
                <i className="fe fe-clock" /> <span>Time Slots</span>
              </Link>
            </li>
            <li>
              <Link
                to="/reviews"
                className={currentPath === "/reviews" ? "active" : ""}
              >
                <i className="fe fe-star" /> <span>Reviews</span>
              </Link>
            </li>

            <li className="menu-title">
              <h6>Booking</h6>
            </li>
            <li>
              <Link
                to="/bookings"
                className={currentPath === "/bookings" ? "active" : ""}
              >
                <i className="fe fe-shopping-cart" /> <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className={currentPath === "/transactions" ? "active" : ""}
              >
                <i className="fe fe-credit-card" /> <span>Transactions</span>
              </Link>
            </li>

            <li className="menu-title">
              <h6>User</h6>
            </li>
            <li>
              <Link
                to="/users"
                className={currentPath === "/users" ? "active" : ""}
              >
                <i className="fe fe-user" /> <span>Users</span>
              </Link>
            </li>

            <li className="menu-title">
              <h6>Service Man</h6>
            </li>
            <li>
              <Link
                to="/service-man-profile"
                className={currentPath === "/service-man-profile" ? "active" : ""}
              >
                <i className="fe fe-user" /> <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/kyc"
                className={currentPath === "/kyc" ? "active" : ""}
              >
                <i className="fe fe-shield" /> <span>KYC</span>
              </Link>
            </li>
            <li>
              <Link
                to="/training-schedule"
                className={currentPath === "/training-schedule" ? "active" : ""}
              >
                <i className="fe fe-calendar" /> <span>Training Schedule</span>
              </Link>
            </li>
            <li>
              <Link
                to="/earning"
                className={currentPath === "/earning" ? "active" : ""}
              >
                <i className="fe fe-dollar-sign" /> <span>Earning</span>
              </Link>
            </li>

            <li className="menu-title">
              <h6>Website</h6>
            </li>
            <li>
              <Link
                to="/home-banner"
                className={currentPath === "/home-banner" ? "active" : ""}
              >
                <i className="fe fe-image" /> <span>Wide Banner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/home-service"
                className={currentPath === "/home-service" ? "active" : ""}
              >
                <i className="fe fe-briefcase" /> <span>Service</span>
              </Link>
            </li>
            <li style={{ marginBottom: "5rem" }}>
              <Link
                to="/home-slider"
                className={currentPath === "/home-slider" ? "active" : ""}
              >
                <i className="fe fe-sliders" /> <span>Front Banner</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

