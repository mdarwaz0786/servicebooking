import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            
            <div className="col-md-6 col-xl-3">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Company</h5>
                <ul className="footer-menu">
                  <li><Link to="/about">About us</Link></li>
                  <li><Link to="/contact">Terms & conditions</Link></li>
                  <li><Link to="/careers">Privacy policy</Link></li>
                  <li><Link to="/faq">Refund Policy</Link></li>
                  <li><Link to="/blog">GI Team impact</Link></li>
                  <li><Link to="/blog">Career</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Customers</h5>
                <ul className="footer-menu">
                  <li><Link to="/getting-started">GI Team reviews</Link></li>
                  <li><Link to="/help">Services near you</Link></li>
                  <li><Link to="/status">Blog</Link></li>
                  <li><Link to="/report-bug">Contact us</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Partners</h5>
                <ul className="footer-menu">
                  <li><Link to="/features">Sign Up as a professional</Link></li>
                </ul>
              </div>
            </div>
           
            {/* Newsletter */}
            <div className="col-md-12 col-xl-3">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Keep In Touch</h5>
                
                    <ul className="social-icon mb-3">
                      <li><Link to="#"><img src="/assets/img/icons/fb.svg" alt="facebook" /></Link></li>
                      <li><Link to="#"><img src="/assets/img/icons/instagram.svg" alt="instagram" /></Link></li>
                      <li><Link to="#"><img src="/assets/img/icons/twitter.svg" alt="twitter" /></Link></li>
                      <li><Link to="#"><img src="/assets/img/icons/whatsapp.svg" alt="whatsapp" /></Link></li>
                      <li><Link to="#"><img src="/assets/img/icons/youtube.svg" alt="youtube" /></Link></li>
                      <li><Link to="#"><img src="/assets/img/icons/linkedin.svg" alt="linkedin" /></Link></li>
                    </ul>
                <div className="d-flex align-items-center flex-wrap">
                  <img src="/assets/img/icons/app-store.svg" className="me-2" alt="app-store" />
                  <img src="/assets/img/icons/goolge-play.svg" className="me-2" alt="google-play" />
                </div>                
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
              <div className="d-flex align-items-center justify-content-center flex-wrap">
                <p className="mb-2"> Copyright 2025 Sarv Laxmi Green India Pvt. Ltd. All Rights Reserved. CIN: U51909DL2022PTC406952</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
