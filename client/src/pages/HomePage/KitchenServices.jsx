import { Link } from "react-router-dom";

const KitchenServices = () => {
  return (
    <section className="section popular-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center mb-4">
              <h2 className="mb-1">Kitchen Appliances  <span className="text-linear-primary">Repair & Services</span></h2>
            </div>
          </div>
        </div>
        
        <div className=" row">
              
              
              <div className="col-md-3">
                <div className="service-item">
                  <div className="service-img">
                    <div className=" nav-center">
                      <div className="">
                        <Link to="/service-details">
                          <img src="/assets/img/home/ac.jpg" className="img-fluid" alt="img" />
                        </Link>
                      </div>                      
                    </div>
                  </div>
                  <div className="service-content">
                    <h6 className="mb-1 text-truncate"><Link to="/service-details">AC Service</Link></h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <small>From Rs. 350.00</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-item">
                  <div className="service-img">
                    <div className=" nav-center">
                      <div className="">
                        <Link to="/service-details">
                          <img src="/assets/img/home/ac.jpg" className="img-fluid" alt="img" />
                        </Link>
                      </div>                      
                    </div>
                  </div>
                  <div className="service-content">
                    <h6 className="mb-1 text-truncate"><Link to="/service-details">AC Service</Link></h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <small>From Rs. 350.00</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-item">
                  <div className="service-img">
                    <div className=" nav-center">
                      <div className="">
                        <Link to="/service-details">
                          <img src="/assets/img/home/ac.jpg" className="img-fluid" alt="img" />
                        </Link>
                      </div>                      
                    </div>
                  </div>
                  <div className="service-content">
                    <h6 className="mb-1 text-truncate"><Link to="/service-details">AC Service</Link></h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <small>From Rs. 350.00</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="service-item">
                  <div className="service-img">
                    <div className=" nav-center">
                      <div className="">
                        <Link to="/service-details">
                          <img src="/assets/img/home/ac.jpg" className="img-fluid" alt="img" />
                        </Link>
                      </div>                      
                    </div>
                  </div>
                  <div className="service-content">
                    <h6 className="mb-1 text-truncate"><Link to="/service-details">AC Service</Link></h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <small>From Rs. 350.00</small>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
        
      </div>
    </section>
  );
};

export default KitchenServices;