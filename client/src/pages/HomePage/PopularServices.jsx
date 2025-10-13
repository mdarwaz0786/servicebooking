import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const PopularServices = () => {
  const { categoryListData, handleHome, toggleModal, homePageData, imageCheck, handleServiceDetail } = useContext(AppContext);
  return (
    <section className="section popular-section pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12  wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-start mb-4">
              <h2 className="mb-1">Our Popular <span className="text-linear-primary">Services</span></h2>
            </div>
          </div>
        </div>
        
       
          
            <div className=" row">


              {homePageData.mostBookedServices.map((item, index) => (
                <div className="col-md-3" key={index} onClick={() => handleServiceDetail(item._id)}>
                  <div className="service-item">
                    <div className="service-img">
                      <div className=" nav-center">
                        <div className="">
                          <Link>
                            <img src={imageCheck(item.image)} className="img-fluid" alt="img" />
                          </Link>
                        </div>                      
                      </div>
                    </div>
                    <div className="service-content">
                      <h6 className="mb-1 text-truncate text-center"><Link>{item.name}</Link></h6>
                    </div>
                  </div>
                </div>
              ))}
              
              
            </div>
      </div>
    </section>
  );
};

export default PopularServices;