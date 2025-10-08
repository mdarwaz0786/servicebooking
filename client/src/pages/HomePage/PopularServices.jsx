import { Link } from "react-router-dom";

const PopularServices = () => {
  return (
    <section className="section popular-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12  wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-start mb-4">
              <h2 className="mb-1">Our Popular <span className="text-linear-primary">Services</span></h2>
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
                    <h6 className="mb-1 text-truncate text-center"><Link to="/service-details">AC Service</Link></h6>
                  </div>
                </div>
              </div>
              
              
            </div>
          
          
        
        
      </div>
    </section>
  );
};

export default PopularServices;