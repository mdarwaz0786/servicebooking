import { Link } from "react-router-dom";
import { scrollToService, scrollToTop } from "../../helper/scrollToTop";

const Footer = () => {
  const handleLinkClick = () => {
    scrollToTop("instant");
  };

  const handleLinkClickService = () => {
    scrollToService("instant");
  };

  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-3 col-sm-6">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Company</h5>
                <ul className="footer-menu">
                  <li><Link to="/about-us" onClick={handleLinkClick}>About us</Link></li>
                  <li><Link to="/term-condition" onClick={handleLinkClick}>Terms & conditions</Link></li>
                  <li><Link to="/privacy-policy" onClick={handleLinkClick}>Privacy policy</Link></li>
                  <li><Link to="/refund-policy" onClick={handleLinkClick}>Refund Policy</Link></li>
                  <li><Link to="/green-india-team-impact" onClick={handleLinkClick}>GI Team impact</Link></li>
                  <li><Link to="/career" onClick={handleLinkClick}>Career</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-3 col-sm-6">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Customers</h5>
                <ul className="footer-menu">
                  <li><Link to="/green-india-team-review" onClick={handleLinkClick}>GI Team reviews</Link></li>
                  <li><Link to="/" onClick={handleLinkClickService}>Services near you</Link></li>
                  <li><Link to="/blog" onClick={handleLinkClick}>Blog</Link></li>
                  <li><Link to="/contact-us" onClick={handleLinkClick}>Contact us</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-md-6 col-xl-3 col-sm-8">
              <div className="footer-widget">
                <h5 className="mb-1 fs-17">Partners</h5>
                <ul className="footer-menu">
                  <li><Link to="/" onClick={handleLinkClick}>Sign up as a professional</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-xl-3 col-sm-4"></div>

            {/* Newsletter */}
            <div className="col-md-12 col-xl-3 footer-sm footer-sm-mt">
              <div className="footer-widget">
                <h5 className="mb-3 fs-17">Keep In Touch</h5>
                <ul className="social-icon mb-3 footer-sm">
                  <li><Link to="https://www.facebook.com/greenindiateams/" target="_blank"><img src="/assets/img/icons/fb.svg" alt="facebook" /></Link></li>
                  <li><Link to="https://www.instagram.com/greenindiateams/#" target="_blank"><img src="/assets/img/icons/instagram.svg" alt="instagram" /></Link></li>
                  <li><Link to="https://x.com/greenindiateam_" target="_blank"><img src="/assets/img/icons/twitter.svg" alt="twitter" /></Link></li>
                  <li><Link to="https://web.whatsapp.com/" target="_blank"><img src="/assets/img/icons/whatsapp.svg" alt="whatsapp" /></Link></li>
                  <li><Link to="https://www.youtube.com/@GREENINDIATEAM" target="_blank"><img src="/assets/img/icons/youtube.svg" alt="youtube" /></Link></li>
                  <li><Link to="https://www.linkedin.com/company/green-india-team/?viewAsMember=true" target="_blank"><img src="/assets/img/icons/linkedin.svg" alt="linkedin" /></Link></li>
                </ul>
                <h5 className="mb-1 fs-14 mb-3 footer-sm footer-sm-mt">Experience GI Team app on mobile</h5>
                <div className="d-flex align-items-center flex-wrap footer-sm">
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
              <div className="d-flex align-items-center justify-content-center flex-wrap footer-sm-center">
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
