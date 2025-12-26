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
            <img src="/admin/assets/img/logo.png" className="img-fluid logo" alt="Logo" />
          </Link>
          <Link to="/">
            <img src="/admin/assets/img/logo.png" className="img-fluid logo-small" alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li>
              <Link to="/" className={currentPath === "/" ? "active" : ""}>
                <i className="fe fe-grid" /> <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="/resume" className={currentPath === "/resume" ? "active" : ""}>
                <i className="fe fe-file" /> <span>Resume</span>
              </Link>
            </li>

            <li>
              <Link to="#"><i className="fe fe-briefcase"></i>
                <span>Master</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
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
                <li>
                  <Link
                    to="/product-store"
                    className={currentPath === "/product-store" ? "active" : ""}
                  >
                    <span>Product Store</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/time-slots"
                    className={currentPath === "/time-slots" ? "active" : ""}
                  >
                    <span>Time Slots</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/brand"
                    className={currentPath === "/brand" ? "active" : ""}
                  >
                    <span>Brand</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/city"
                    className={currentPath === "/city" ? "active" : ""}
                  >
                    <span>City</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/locality"
                    className={currentPath === "/locality" ? "active" : ""}
                  >
                    <span>Locality</span>
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/areazone"
                    className={currentPath === "/areazone" ? "active" : ""}
                  >
                    <span>Area Zone</span>
                  </Link>
                </li> */}

                <li>
                  <Link
                    to="/zone"
                    className={currentPath === "/zone" ? "active" : ""}
                  >
                    <span>Zone</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-package"></i>
                <span>Service Master</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/service-included"
                    className={currentPath === "/service-included" ? "active" : ""}
                  >
                    <span>Service Included</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requirement-from-customer"
                    className={currentPath === "/requirement-from-customer" ? "active" : ""}
                  >
                    <span>Requirement Customer</span>
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
                <li>
                  <Link
                    to="/service-faq"
                    className={currentPath === "/service-fad" ? "active" : ""}
                  >
                    <span>FAQ</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rate-card"
                    className={currentPath === "/rate-card" ? "active" : ""}
                  >
                    <span>Rate Card</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"> <i className="fe fe-credit-card" />
                <span> Payments</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/transactions"
                    className={currentPath === "/transactions" ? "active" : ""}
                  >
                    <span>Customer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/transactions"
                    className={currentPath === "/transactions" ? "active" : ""}
                  >
                    <span>Provider</span>
                  </Link>
                </li>
              </ul>
            </li>


            <li>
              <Link to="#"><i className="fe fe-shopping-cart" />
                <span>Bookings</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/bookings/active"
                    className={currentPath === "/bookings/active" ? "active" : ""}
                  >
                    <span>Active</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/completed-bookings/completed"
                    className={currentPath === "completed-bookings/completed" ? "active" : ""}
                  >
                    <span>Completed</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cancelled-bookings/cancelled"
                    className={currentPath === "/cancelled-bookings/cancelled" ? "active" : ""}
                  >
                    <span>Cancelled</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-user" />
                <span> Users</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/admins"
                    className={currentPath === "/admins" ? "active" : ""}
                  >
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-user" />
                <span> Customers</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/users"
                    className={currentPath === "/customers" ? "active" : ""}
                  >
                    <span>Customer List</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-award" />
                <span>Providers</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/providers"
                    className={currentPath === "/providers" ? "active" : ""}
                  >
                    <span>Provider List</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/serviceman-earning"
                    className={currentPath === "/serviceman-earning" ? "active" : ""}
                  >
                    <span>Provider Earning</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/service-man-profile"
                    className={currentPath === "/service-man-profile" ? "active" : ""}
                  >
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kyc"
                    className={currentPath === "/kyc" ? "active" : ""}
                  >
                    <span>KYC</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/training"
                    className={currentPath === "/training" ? "active" : ""}
                  >
                    <span>Training</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/training-schedule"
                    className={currentPath === "/training-schedule" ? "active" : ""}
                  >
                    <span>Training Schedule</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/training-schedule-submit"
                    className={currentPath === "/training-schedule-submit" ? "active" : ""}
                  >
                    <span>Training Schedule Submit</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/training-attendance"
                    className={currentPath === "/training-attendance" ? "active" : ""}
                  >
                    <span>Training Attendance</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/earning"
                    className={currentPath === "/earning" ? "active" : ""}
                  >
                    <span>Earning</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wallet"
                    className={currentPath === "/wallet" ? "active" : ""}
                  >
                    <span>Wallet</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/insurance"
                    className={currentPath === "/insurance" ? "active" : ""}
                  >
                    <span>Insurance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notification"
                    className={currentPath === "/notification" ? "active" : ""}
                  >
                    <span>Notification</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-layers" />
                <span> Home Service</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/home-banner"
                    className={currentPath === "/home-banner" ? "active" : ""}
                  >
                    <span>Wide Banner</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home-service"
                    className={currentPath === "/home-service" ? "active" : ""}>
                    <span>Product Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/home-slider"
                    className={currentPath === "/home-slider" ? "active" : ""}
                  >
                    <span>Front Banner</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-file-text" />
                <span> Blog</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/list-blog-category"
                    className={currentPath === "/list-blog-category" ? "active" : ""}
                  >
                    <span>Blog Category</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog-list"
                    className={currentPath === "/blog-list" ? "active" : ""}
                  >
                    <span>Blog</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-briefcase"></i>
                <span>Footer Pages</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/add-terms-conditions"
                    className={currentPath === "/add-terms-conditions" ? "active" : ""}
                  >
                    <span>Terms & Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-privacy-policy"
                    className={currentPath === "/add-privacy-policy" ? "active" : ""}
                  >
                    <span>Privacy & Policy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-refund-policy"
                    className={currentPath === "/add-refund-policy" ? "active" : ""}
                  >
                    <span>Refund Policy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-disclaimer"
                    className={currentPath === "/add-disclaimer" ? "active" : ""}
                  >
                    <span>Disclaimer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-impact"
                    className={currentPath === "/add-impact" ? "active" : ""}
                  >
                    <span>GI Impact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-enquiry"
                    className={currentPath === "/contact-enquiry" ? "active" : ""}
                  >
                    <span>Contact Enquiry</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/job-list"
                    className={currentPath === "/job-list" ? "active" : ""}
                  >
                    <span>Jobs</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="#"><i className="fe fe-help-circle" />
                <span> Support</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
              </Link>
              <ul>
                <li>
                  <Link
                    to="/customer-support"
                    className={currentPath === "/customer-support" ? "active" : ""}
                  >
                    <span>Customer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/provider-support"
                    className={currentPath === "/provider-support" ? "active" : ""}
                  >
                    <span>Provider</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li style={{ marginBottom: "5rem" }}>
              <Link to="/meta-tag" className={currentPath === "/meta-tag" ? "active" : ""}>
                <i className="fe fe-tag" /> <span>Meta Tag</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

