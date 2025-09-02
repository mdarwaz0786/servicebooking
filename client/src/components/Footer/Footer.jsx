import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            {/* Product */}
            <div className="col-md-6 col-xl-2">
              <div className="footer-widget">
                <h5 className="mb-4">Product</h5>
                <ul className="footer-menu">
                  <li><Link to="/features">Features</Link></li>
                  <li><Link to="/pricing">Pricing</Link></li>
                  <li><Link to="/case-studies">Case studies</Link></li>
                  <li><Link to="/reviews">Reviews</Link></li>
                  <li><Link to="/updates">Updates</Link></li>
                </ul>
              </div>
            </div>

            {/* Support */}
            <div className="col-md-6 col-xl-2">
              <div className="footer-widget">
                <h5 className="mb-4">Support</h5>
                <ul className="footer-menu">
                  <li><Link to="/getting-started">Getting started</Link></li>
                  <li><Link to="/help">Help center</Link></li>
                  <li><Link to="/status">Server status</Link></li>
                  <li><Link to="/report-bug">Report a bug</Link></li>
                  <li><Link to="/chat-support">Chat support</Link></li>
                </ul>
              </div>
            </div>

            {/* For Provider */}
            <div className="col-md-6 col-xl-2">
              <div className="footer-widget">
                <h5 className="mb-4">For Provider</h5>
                <ul className="footer-menu">
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/contact">Contact us</Link></li>
                  <li><Link to="/careers">Careers</Link></li>
                  <li><Link to="/faq">Faq’s</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                </ul>
              </div>
            </div>

            {/* Support 2 */}
            <div className="col-md-6 col-xl-2">
              <div className="footer-widget">
                <h5 className="mb-4">Support</h5>
                <ul className="footer-menu">
                  <li><Link to="/getting-started">Getting started</Link></li>
                  <li><Link to="/help">Help center</Link></li>
                  <li><Link to="/other-products">Other Products</Link></li>
                  <li><Link to="/report-bug">Report a bug</Link></li>
                  <li><Link to="/chat-support">Chat support</Link></li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-md-12 col-xl-4">
              <div className="footer-widget">
                <div className="card bg-light-200 border-0 mb-3">
                  <div className="card-body">
                    <h5 className="mb-3">SignUp For Subscription</h5>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Enter Email Address" />
                    </div>
                    <button type="submit" className="btn btn-lg btn-linear-primary w-100">Subscribe</button>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <h6 className="fs-14 fw-normal me-2">Download Our App</h6>
                  <img src="assets/img/icons/app-store.svg" className="me-2" alt="app-store" />
                  <img src="assets/img/icons/goolge-play.svg" className="me-2" alt="google-play" />
                </div>
              </div>
            </div>
          </div>

          {/* Socials + Language/Currency */}
          <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
            <ul className="social-icon mb-3">
              <li><Link to="#"><img src="assets/img/icons/fb.svg" alt="facebook" /></Link></li>
              <li><Link to="#"><img src="assets/img/icons/instagram.svg" alt="instagram" /></Link></li>
              <li><Link to="#"><img src="assets/img/icons/twitter.svg" alt="twitter" /></Link></li>
              <li><Link to="#"><img src="assets/img/icons/whatsapp.svg" alt="whatsapp" /></Link></li>
              <li><Link to="#"><img src="assets/img/icons/youtube.svg" alt="youtube" /></Link></li>
              <li><Link to="#"><img src="assets/img/icons/linkedin.svg" alt="linkedin" /></Link></li>
            </ul>

            <div className="d-flex align-items-center">
              {/* Language */}
              <div className="dropdown me-3 mb-3">
                <Link to="#" className="dropdown-toggle fw-medium" data-bs-toggle="dropdown">
                  <img src="assets/img/flags/us.png" className="flag me-2" alt="flag" />English
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#"><img src="assets/img/flags/us.png" className="flag me-2" alt="us" />English</Link></li>
                  <li><Link className="dropdown-item" to="#"><img src="assets/img/flags/jp.png" className="flag me-2" alt="jp" />Japanese</Link></li>
                  <li><Link className="dropdown-item" to="#"><img src="assets/img/flags/cn.png" className="flag me-2" alt="cn" />Chinese</Link></li>
                </ul>
              </div>

              {/* Currency */}
              <div className="dropdown mb-3">
                <Link to="#" className="dropdown-toggle fw-medium" data-bs-toggle="dropdown">
                  USD
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#">USD</Link></li>
                  <li><Link className="dropdown-item" to="#">EURO</Link></li>
                  <li><Link className="dropdown-item" to="#">YEN</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <p className="mb-2">Copyright © 2024 - All Rights Reserved Truelysell</p>
                <ul className="menu-links mb-2">
                  <li><Link to="/terms-condition"> Terms and Conditions</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
