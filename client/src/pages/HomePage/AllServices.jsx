import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const AllServices = ({ value=[] }) => {
  const { PriceFormat, imageCheck, handleServiceDetail } = useContext(AppContext);
  return (
    <section className="section popular-section m-0 pb-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-center mb-4">
              <h2 className="mb-1 text-start">{value.title}</h2>
            </div>
          </div>
        </div>
        
        <div className=" row">
              
          {value.services && value.services.length > 0 ? (
            value.services.map((item, index2) => (
            
                <div className="col-md-2 w-20" key={index2} onClick={() => handleServiceDetail(item._id)} >
                  <div className="service-item">
                    <div className="service-img">
                      <div className=" nav-center">
                        <div className="">
                          <Link >
                            <img src={imageCheck(item.image)} className="img-fluid" alt="img" />
                          </Link>
                        </div>                      
                      </div>
                    </div>
                    <div className="service-content">
                      <h6 className="mb-1 text-truncate"><Link >{item.name}</Link></h6>
                      
                    </div>
                  </div>
                </div>
            
            ))
          ) : (
            null
          )}
            



          
          
        </div>
        
      </div>
    </section>
  );
};

export default AllServices;