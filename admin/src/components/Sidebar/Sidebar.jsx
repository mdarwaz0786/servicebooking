import { Link } from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { hasPermission } from "../../helpers/hasPermission";
import { useAuth } from "../../context/auth.context";

const Sidebar = () => {
  const { user } = useAuth();
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

            {hasPermission(user, "notification", "add") && (
              <li>
                <Link to="/send-notification" className={currentPath === "/send-notification" ? "active" : ""}>
                  <i className="fe fe-bell" /> <span>Send Notification</span>
                </Link>
              </li>
            )}

            <li>
              {
                (
                  hasPermission(user, "product", "view") ||
                  hasPermission(user, "variant", "view") ||
                  hasPermission(user, "serviceProcess", "view") ||
                  hasPermission(user, "nestedServiceProcess", "view") ||
                  hasPermission(user, "service", "view") ||
                  hasPermission(user, "productStore", "view") ||
                  hasPermission(user, "timeSlot", "view") ||
                  hasPermission(user, "brand", "view") ||
                  hasPermission(user, "city", "view") ||
                  hasPermission(user, "zone", "view") ||
                  hasPermission(user, "providerAppSupport", "view") ||
                  hasPermission(user, "mobileAppInfo", "view") ||
                  hasPermission(user, "role", "view") ||
                  hasPermission(user, "earning", "view")
                ) && (
                  <Link to="#"><i className="fe fe-briefcase"></i>
                    <span>Master</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "product", "view") && (
                  <li>
                    <Link
                      to="/categories"
                      className={currentPath === "/categories" ? "active" : ""}
                    >
                      <span>Products</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "variant", "view") && (
                  <li>
                    <Link
                      to="/sub-categories"
                      className={currentPath === "/sub-categories" ? "active" : ""}
                    >
                      <span>Variants</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "serviceProcess", "view") && (
                  <li>
                    <Link
                      to="/sub-sub-categories"
                      className={currentPath === "/sub-sub-categories" ? "active" : ""}
                    >
                      <span>Service Process</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "nestedServiceProcess", "view") && (
                  <li>
                    <Link
                      to="/sub-sub-sub-categories"
                      className={currentPath === "/sub-sub-sub-categories" ? "active" : ""}
                    >
                      <span>Nested Service Process</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "service", "view") && (
                  <li>
                    <Link
                      to="/services"
                      className={currentPath === "/services" ? "active" : ""}
                    >
                      <span>Services</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "productStore", "view") && (
                  <li>
                    <Link
                      to="/product-store"
                      className={currentPath === "/product-store" ? "active" : ""}
                    >
                      <span>Product Store</span>
                    </Link>
                  </li>
                )}


                {hasPermission(user, "timeSlot", "view") && (
                  <li>
                    <Link
                      to="/time-slots"
                      className={currentPath === "/time-slots" ? "active" : ""}
                    >
                      <span>Time Slots</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "brand", "view") && (
                  <li>
                    <Link
                      to="/brand"
                      className={currentPath === "/brand" ? "active" : ""}
                    >
                      <span>Brand</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "city", "view") && (
                  <li>
                    <Link
                      to="/city"
                      className={currentPath === "/city" ? "active" : ""}
                    >
                      <span>City</span>
                    </Link>
                  </li>
                )}


                {hasPermission(user, "zone", "view") && (
                  <li>
                    <Link
                      to="/zone"
                      className={currentPath === "/zone" ? "active" : ""}
                    >
                      <span>Zone</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "pincode", "view") && (
                  <li>
                    <Link
                      to="/pincode"
                      className={currentPath === "/pincode" ? "active" : ""}
                    >
                      <span>Pincode</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerAppSupport", "view") && (
                  <li>
                    <Link
                      to="/support-content"
                      className={currentPath === "/support-content" ? "active" : ""}
                    >
                      <span>Provider App Support</span>
                    </Link>
                  </li>
                )}


                {hasPermission(user, "mobileAppInfo", "view") && (
                  <li>
                    <Link
                      to="/app-info"
                      className={currentPath === "/app-info" ? "active" : ""}
                    >
                      <span>Mobile App Info</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "role", "view") && (
                  <li>
                    <Link
                      to="/roles"
                      className={currentPath === "/roles" ? "active" : ""}
                    >
                      <span>Role & Permission</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "earning", "view") && (
                  <li>
                    <Link
                      to="/earning"
                      className={currentPath === "/earning" ? "active" : ""}
                    >
                      <span>Earning</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "serviceIncluded", "view") ||
                  hasPermission(user, "requirementFromCustomer", "view") ||
                  hasPermission(user, "serviceProcess", "view") ||
                  hasPermission(user, "whyChooseUs", "view") ||
                  hasPermission(user, "expertTechnician", "view") ||
                  hasPermission(user, "brandLogo", "view") ||
                  hasPermission(user, "giPromise", "view") ||
                  hasPermission(user, "faq", "view") ||
                  hasPermission(user, "rateCard", "view")
                ) && (
                  <Link to="#"><i className="fe fe-package"></i>
                    <span>Service Master</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "serviceIncluded", "view") && (
                  <li>
                    <Link
                      to="/service-included"
                      className={currentPath === "/service-included" ? "active" : ""}
                    >
                      <span>Service Included</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "requirementFromCustomer", "view") && (
                  <li>
                    <Link
                      to="/requirement-from-customer"
                      className={currentPath === "/requirement-from-customer" ? "active" : ""}
                    >
                      <span>Requirement Customer</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "whyChooseUs", "view") && (
                  <li>
                    <Link
                      to="/why-choose-us"
                      className={currentPath === "/why-choose-us" ? "active" : ""}
                    >
                      <span>Why Choose Us</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "expertTechnician", "view") && (
                  <li>
                    <Link
                      to="/expert-technician"
                      className={currentPath === "/expert-technician" ? "active" : ""}
                    >
                      <span>Expert Technician</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "brandLogo", "view") && (
                  <li>
                    <Link
                      to="/brand-logo"
                      className={currentPath === "/brand-logo" ? "active" : ""}
                    >
                      <span>Brand Logo</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "giPromise", "view") && (
                  <li>
                    <Link
                      to="/gi-promise"
                      className={currentPath === "/gi-promise" ? "active" : ""}
                    >
                      <span>GI Promise</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "faq", "view") && (
                  <li>
                    <Link
                      to="/service-faq"
                      className={currentPath === "/service-fad" ? "active" : ""}
                    >
                      <span>FAQ</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "rateCard", "view") && (
                  <li>
                    <Link
                      to="/rate-card"
                      className={currentPath === "/rate-card" ? "active" : ""}
                    >
                      <span>Rate Card</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>
              {hasPermission(user, "user", "view") && (
                <Link to="#"><i className="fe fe-user" />
                  <span> Users</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                </Link>
              )}
              <ul>
                {hasPermission(user, "user", "view") && (
                  <li>
                    <Link
                      to="/admins"
                      className={currentPath === "/admins" ? "active" : ""}
                    >
                      <span>Users</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>
              {hasPermission(user, "customer", "view") && (
                <Link to="#"><i className="fe fe-user" />
                  <span> Customers</span>
                  <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                </Link>
              )}
              <ul>
                {hasPermission(user, "customer", "view") && (
                  <li>
                    <Link
                      to="/users"
                      className={currentPath === "/customers" ? "active" : ""}
                    >
                      <span>Customer List</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "provider", "view") ||
                  hasPermission(user, "providerEarning", "view") ||
                  hasPermission(user, "providerKyc", "view") ||
                  hasPermission(user, "providerProfile", "view") ||
                  hasPermission(user, "providerTraining", "view") ||
                  hasPermission(user, "providerWallet", "view") ||
                  hasPermission(user, "providerCashcollected", "view") ||
                  hasPermission(user, "providerInsurance", "view") ||
                  hasPermission(user, "providerCertificate", "view") ||
                  hasPermission(user, "providerNotification", "view")
                ) && (
                  <Link to="#"><i className="fe fe-award" />
                    <span>Providers</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "provider", "view") && (
                  <li>
                    <Link
                      to="/providers"
                      className={currentPath === "/providers" ? "active" : ""}
                    >
                      <span>Provider List</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerEarning", "view") && (
                  <li>
                    <Link
                      to="/serviceman-earning"
                      className={currentPath === "/serviceman-earning" ? "active" : ""}
                    >
                      <span>Provider Earning</span>
                    </Link>
                  </li>
                )}
                {hasPermission(user, "providerProfile", "view") && (
                  <li>
                    <Link
                      to="/service-man-profile"
                      className={currentPath === "/service-man-profile" ? "active" : ""}
                    >
                      <span>Profile</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerKyc", "view") && (
                  <li>
                    <Link
                      to="/kyc"
                      className={currentPath === "/kyc" ? "active" : ""}
                    >
                      <span>KYC</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerTraining", "view") && (
                  <li>
                    <Link
                      to="/training"
                      className={currentPath === "/training" ? "active" : ""}
                    >
                      <span>Training</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerTraining", "view") && (
                  <li>
                    <Link
                      to="/training-schedule-submit"
                      className={currentPath === "/training-schedule-submit" ? "active" : ""}
                    >
                      <span>Training Schedule Submit</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerWallet", "view") && (
                  <li>
                    <Link
                      to="/wallet"
                      className={currentPath === "/wallet" ? "active" : ""}
                    >
                      <span>Wallet</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerCashcollected", "view") && (
                  <li>
                    <Link
                      to="/cash-collected"
                      className={currentPath === "/cash-collected" ? "active" : ""}
                    >
                      <span>Cash Collected</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerCashSubmit", "view") && (
                  <li>
                    <Link
                      to="/cash-submit"
                      className={currentPath === "/cash-submit" ? "active" : ""}
                    >
                      <span>Cash Submit</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerInsurance", "view") && (
                  <li>
                    <Link
                      to="/insurance"
                      className={currentPath === "/insurance" ? "active" : ""}
                    >
                      <span>Insurance</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerCertificate", "view") && (
                  <li>
                    <Link
                      to="/certificate"
                      className={currentPath === "/certificate" ? "active" : ""}
                    >
                      <span>Certificate</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "activeBooking", "view") ||
                  hasPermission(user, "completeBooking", "view") ||
                  hasPermission(user, "cancelBooking", "view")
                ) && (
                  <Link to="#"><i className="fe fe-shopping-cart" />
                    <span>Bookings</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "activeBooking", "view") && (
                  <li>
                    <Link
                      to="/bookings/active"
                      className={currentPath === "/bookings/active" ? "active" : ""}
                    >
                      <span>Active</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "completeBooking", "view") && (
                  <li>
                    <Link
                      to="/completed-bookings/completed"
                      className={currentPath === "completed-bookings/completed" ? "active" : ""}
                    >
                      <span>Completed</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "cancelBooking", "view") && (
                  <li>
                    <Link
                      to="/cancelled-bookings/cancelled"
                      className={currentPath === "/cancelled-bookings/cancelled" ? "active" : ""}
                    >
                      <span>Cancelled</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "customerPayment", "view") ||
                  hasPermission(user, "providerPayment", "view")
                ) && (
                  <Link to="#"> <i className="fe fe-credit-card" />
                    <span>Payments</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "customerPayment", "view") && (
                  <li>
                    <Link
                      to="/transactions-user/user"
                      className={currentPath === "/transactions-user/user" ? "active" : ""}
                    >
                      <span>Customer</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerPayment", "view") && (
                  <li>
                    <Link
                      to="/transactions-serviceman/serviceman"
                      className={currentPath === "/transactions-serviceman/serviceman" ? "active" : ""}
                    >
                      <span>Provider</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            {hasPermission(user, "invoice", "view") && (
              <li>
                <Link to="/invoice" className={currentPath === "/invoice" ? "active" : ""}>
                  <i className="fe fe-tag" /> <span>Invoice</span>
                </Link>
              </li>
            )}

            <li>
              {
                (
                  hasPermission(user, "wideBanner", "view") ||
                  hasPermission(user, "productService", "view") ||
                  hasPermission(user, "frontBanner", "view")
                ) && (
                  <Link to="#"><i className="fe fe-layers" />
                    <span> Home Service</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "wideBanner", "view") && (
                  <li>
                    <Link
                      to="/home-banner"
                      className={currentPath === "/home-banner" ? "active" : ""}
                    >
                      <span>Wide Banner</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "productService", "view") && (
                  <li>
                    <Link
                      to="/home-service"
                      className={currentPath === "/home-service" ? "active" : ""}>
                      <span>Product Services</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "frontBanner", "view") && (
                  <li>
                    <Link
                      to="/home-slider"
                      className={currentPath === "/home-slider" ? "active" : ""}
                    >
                      <span>Front Banner</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "blog", "view") ||
                  hasPermission(user, "blogCategory", "view")
                ) && (
                  <Link to="#"><i className="fe fe-file-text" />
                    <span> Blog</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "blogCategory", "view") && (
                  <li>
                    <Link
                      to="/list-blog-category"
                      className={currentPath === "/list-blog-category" ? "active" : ""}
                    >
                      <span>Blog Category</span>
                    </Link>
                  </li>
                )}
                {hasPermission(user, "blog", "view") && (
                  <li>
                    <Link
                      to="/blog-list"
                      className={currentPath === "/blog-list" ? "active" : ""}
                    >
                      <span>Blog</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "termsAndCondition", "view") ||
                  hasPermission(user, "privacyPolicy", "view") ||
                  hasPermission(user, "refundPolicy", "view") ||
                  hasPermission(user, "disclaimer", "view") ||
                  hasPermission(user, " giImpact", "view") ||
                  hasPermission(user, "contactEnquiry", "view") ||
                  hasPermission(user, "job", "view") ||
                  hasPermission(user, "resume", "view")
                ) && (
                  <Link to="#"><i className="fe fe-briefcase"></i>
                    <span>Footer Pages</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "termsAndCondition", "view") && (
                  <li>
                    <Link
                      to="/add-terms-conditions"
                      className={currentPath === "/add-terms-conditions" ? "active" : ""}
                    >
                      <span>Terms & Conditions</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "privacyPolicy", "view") && (
                  <li>
                    <Link
                      to="/add-privacy-policy"
                      className={currentPath === "/add-privacy-policy" ? "active" : ""}
                    >
                      <span>Privacy & Policy</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "refundPolicy", "view") && (
                  <li>
                    <Link
                      to="/add-refund-policy"
                      className={currentPath === "/add-refund-policy" ? "active" : ""}
                    >
                      <span>Refund Policy</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "disclaimer", "view") && (
                  <li>
                    <Link
                      to="/add-disclaimer"
                      className={currentPath === "/add-disclaimer" ? "active" : ""}
                    >
                      <span>Disclaimer</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, " giImpact", "view") && (
                  <li>
                    <Link
                      to="/add-impact"
                      className={currentPath === "/add-impact" ? "active" : ""}
                    >
                      <span>GI Impact</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "contactEnquiry", "view") && (
                  <li>
                    <Link
                      to="/contact-enquiry"
                      className={currentPath === "/contact-enquiry" ? "active" : ""}
                    >
                      <span>Contact Enquiry</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "job", "view") && (
                  <li>
                    <Link
                      to="/job-list"
                      className={currentPath === "/job-list" ? "active" : ""}
                    >
                      <span>Jobs</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "resume", "view") && (
                  <li>
                    <Link to="/resume" className={currentPath === "/resume" ? "active" : ""}>
                      <span>Resume</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            <li>

              {
                (
                  hasPermission(user, "customerSupport", "view") ||
                  hasPermission(user, "providerSupport", "view")
                ) && (
                  <Link to="#"><i className="fe fe-help-circle" />
                    <span>Support</span>
                    <span className="menu-arrow"><i className="fe fe-chevron-right"></i></span>
                  </Link>
                )
              }
              <ul>
                {hasPermission(user, "customerSupport", "view") && (
                  <li>
                    <Link
                      to="/customer-support"
                      className={currentPath === "/customer-support" ? "active" : ""}
                    >
                      <span>Customer</span>
                    </Link>
                  </li>
                )}

                {hasPermission(user, "providerSupport", "view") && (
                  <li>
                    <Link
                      to="/provider-support"
                      className={currentPath === "/provider-support" ? "active" : ""}
                    >
                      <span>Provider</span>
                    </Link>
                  </li>
                )}
              </ul>
            </li>

            {hasPermission(user, "metaTag", "view") && (
              <li style={{ marginBottom: "5rem" }}>
                <Link to="/meta-tag" className={currentPath === "/meta-tag" ? "active" : ""}>
                  <i className="fe fe-tag" /> <span>Meta Tag</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

