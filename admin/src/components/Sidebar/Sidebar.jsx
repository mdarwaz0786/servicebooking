import { Link } from "react-router-dom";
import $ from "jquery";
import { useEffect } from "react";

const Sidebar = () => {

  useEffect(() => {
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }, []);

  // useEffect(() => {
  //   // initialize slimScroll after render
  //   const $slimScrolls = $(".slimscroll");

  //   if ($slimScrolls.length > 0) {
  //     $slimScrolls.slimScroll({
  //       height: "auto",
  //       width: "100%",
  //       position: "right",
  //       size: "7px",
  //       color: "#ccc",
  //       allowPageScroll: false,
  //       wheelStep: 10,
  //       touchScrollStep: 100,
  //     });

  //     const resizeHandler = () => {
  //       const newHeight = $(window).height() - 60;
  //       $slimScrolls.height(newHeight);
  //       $(".sidebar .slimScrollDiv").height(newHeight);
  //     };

  //     // set initial height
  //     resizeHandler();
  //     // update on resize
  //     $(window).on("resize", resizeHandler);

  //     // cleanup on unmount
  //     return () => {
  //       $(window).off("resize", resizeHandler);
  //     };
  //   }
  // }, []);

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
        <div className="siderbar-toggle">
          <label className="switch" id="toggle_btn">
            <input type="checkbox" />
            <span className="slider round" />
          </label>
        </div>
      </div>
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title m-0">
              <h6>Home</h6>
            </li>
            <li>
              <Link to="/" className="active"><i className="fe fe-grid" /> <span>Dashboard</span></Link>
            </li>
            <li className="menu-title">
              <h6>Services</h6>
            </li>
            <li>
              <Link ><i className="fe fe-briefcase" />
                <span>Services</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/add-service">Add Service</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/service-settings">Service Settings</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/categories"><i className="fe fe-file-text" />
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/sub-categories"><i className="fe fe-clipboard" /> <span>Sub Categories</span></Link>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-star" />
                <span>Review</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/review-type">Review Type</Link>
                </li>
                <li>
                  <Link to="/review">Review</Link>
                </li>
              </ul>
            </li>
            <li className="menu-title">
              <h6>Booking</h6>
            </li>
            <li>
              <Link to="/booking"><i className="fe fe-smartphone" /> <span> Bookings</span></Link>
            </li>
            <li className="menu-title">
              <h6>Finance &amp; Accounts</h6>
            </li>
            <li>
              <Link to="/banktransferlist"><i className="fe fe-file" />
                <span>Bank Transfer</span>
              </Link>
            </li>
            <li>
              <Link to="/wallet"><i className="fe fe-credit-card" />
                <span>Wallet</span>
              </Link>
            </li>
            <li>
              <Link to="/refund-request"><i className="fe fe-git-pull-request" /> <span>Refund Request</span></Link>
            </li>
            <li>
              <Link to="/cash-on-delivery"><i className="fe fe-dollar-sign" /> <span>Cash on Delivery</span></Link>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-credit-card" />
                <span>Payouts</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/payout-request">Payout Requests</Link>
                </li>
                <li>
                  <Link to="/payout-settings">Payout Settings</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/sales-transactions"><i className="fe fe-bar-chart" /> <span>Sales Transactions</span></Link>
            </li>
            <li className="menu-title">
              <h6>Others</h6>
            </li>
            <li>
              <Link to="/chat"><i className="fe fe-message-square" /> <span>Chat</span></Link>
            </li>
            <li className="menu-title">
              <h6>Content</h6>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-file" />
                <span>Pages</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/add-page">Add Page</Link>
                </li>
                <li>
                  <Link to="/pages-list">Pages</Link>
                </li>
                <li>
                  <Link to="/page-list">Pages List</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-file-text" />
                <span>Blog</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/all-blog">All Blog</Link>
                </li>
                <li>
                  <Link to="/add-blog">Add Blog</Link>
                </li>
                <li>
                  <Link to="/blogs-categories">Categories</Link>
                </li>
                <li>
                  <Link to="/blogs-comments">Blog Comments</Link>
                </li>
              </ul>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-map-pin" />
                <span>Location</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/countries">Countries</Link>
                </li>
                <li>
                  <Link to="/states">States</Link>
                </li>
                <li>
                  <Link to="/cities">Cities</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/testimonials"><i className="fe fe-star" /> <span>Testimonials</span></Link>
            </li>
            <li>
              <Link to="/faq"><i className="fe fe-help-circle" /> <span>FAQ</span></Link>
            </li>
            <li className="menu-title">
              <h6>Membership</h6>
            </li>
            <li>
              <Link to="/membership"><i className="fe fe-user" /> <span>Membership</span></Link>
            </li>
            <li>
              <Link to="/membership-addons"><i className="fe fe-user-plus" /> <span>Membership Addons</span></Link>
            </li>
            <li className="menu-title">
              <h6>Reports</h6>
            </li>
            <li>
              <Link to="/admin-earnings"><i className="fe fe-user" />
                <span>Admin Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="/provider-earnings"><i className="fe fe-dollar-sign" />
                <span>Provider Earnings</span>
              </Link>
            </li>
            <li>
              <Link to="/provider-sales"><i className="fe fe-dollar-sign" />
                <span>Provider Sales</span>
              </Link>
            </li>
            <li>
              <Link to="/provider-wallet"><i className="fe fe-credit-card" />
                <span>Provider Wallet</span>
              </Link>
            </li>
            <li>
              <Link to="/customer-wallet"><i className="fe fe-user" />
                <span>Customer Wallet</span>
              </Link>
            </li>
            <li>
              <Link to="/membership-transaction"><i className="fe fe-tv" />
                <span>Membership Transaction</span>
              </Link>
            </li>
            <li>
              <Link to="/refund-report"><i className="fe fe-file-text" />
                <span>Refund Report</span>
              </Link>
            </li>
            <li>
              <Link to="/register-report"><i className="fe fe-git-pull-request" />
                <span>Register Report</span>
              </Link>
            </li>
            <li>
              <Link to="/service-sales"><i className="fe fe-bar-chart" />
                <span>Sales Report</span>
              </Link>
            </li>
            <li className="menu-title">
              <h6>User Management</h6>
            </li>
            <li className="submenu">
              <Link ><i className="fe fe-user" />
                <span> Users</span>
                <span className="menu-arrow"><i className="fe fe-chevron-right" /></span>
              </Link>
              <ul>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/customers">Customers</Link>
                </li>
                <li>
                  <Link to="/providers">Providers </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/roles"><i className="fe fe-file" /> <span>Roles &amp; Permissions</span></Link>
            </li>
            <li>
              <Link to="/delete-account-requests"><i className="fe fe-trash-2" /> <span>Delete Account Requests</span></Link>
            </li>
            <li>
              <Link to="/verification-request"><i className="fe fe-dollar-sign" /><span>Verification Requests</span></Link>
            </li>
            <li className="menu-title">
              <h6>Marketing</h6>
            </li>
            <li>
              <Link to="/coupons"><i className="fe fe-bookmark" /> <span>Coupons</span></Link>
            </li>
            <li>
              <Link to="/offers"><i className="fe fe-briefcase" /> <span>Service Offers</span></Link>
            </li>
            <li>
              <Link to="/featured-services"><i className="fe fe-briefcase" /> <span>Featured Services</span></Link>
            </li>
            <li>
              <Link to="/email-newsletter"><i className="fe fe-mail" /> <span>Email Newsletter</span></Link>
            </li>
            <li className="menu-title">
              <h6>Management</h6>
            </li>
            <li>
              <Link to="/cachesystem"><i className="fe fe-user" />
                <span>Cache System</span>
              </Link>
            </li>
            <li>
              <Link to="/email-templates"><i className="fe fe-mail" /> <span>Email Templates</span></Link>
            </li>
            <li>
              <Link to="/sms-templates"><i className="fe fe-message-square" /> <span>SMS Templates</span></Link>
            </li>
            <li>
              <Link to="/menu-management"><i className="fe fe-file-text" /> <span>Menu Management</span></Link>
            </li>
            <li>
              <Link to="/website-settings"><i className="fe fe-credit-card" /> <span>Widgets</span></Link>
            </li>
            <li>
              <Link to="/create-menu"><i className="fe fe-list" /> <span>Create Menu</span></Link>
            </li>
            <li>
              <Link to="/plugins-manager"><i className="fe fe-tv" /><span>Plugin Managers</span> </Link>
            </li>
            <li className="menu-title">
              <h6>Support</h6>
            </li>
            <li>
              <Link to="/contact-messages"><i className="fe fe-message-square" /> <span>Contact Messages</span></Link>
            </li>
            <li>
              <Link to="/abuse-reports"><i className="fe fe-file-text" /> <span>Abuse Reports</span></Link>
            </li>
            <li>
              <Link to="/announcements"><i className="fe fe-volume-2" /> <span>Announcements</span></Link>
            </li>
            <li className="menu-title">
              <h6>Settings</h6>
            </li>
            <li>
              <Link to="/localization"><i className="fe fe-settings" /> <span>Settings</span></Link>
            </li>
            <li>
              <Link to="/signin"><i className="fe fe-log-out" /> <span>Logout</span></Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;