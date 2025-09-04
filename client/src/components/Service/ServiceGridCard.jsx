import { Link } from "react-router-dom";

const ServiceGridCard = ({ value = [] }) => {
  return (
    
    <>    
        <div className="col-xl-4 col-md-6">
            <div className="card p-0">
            <div className="card-body p-0">
                <div className="img-sec w-100">
                <Link to="/service-details"><img src="assets/img/providers/provider-24.jpg" className="img-fluid rounded-top w-100" alt="img" /></Link>
                <div className="image-tag d-flex justify-content-end align-items-center">
                    <span className="trend-tag">Carpentry</span>
                    <Link to="/javascript:void(0);" className="fav-icon like-icon"><i className="ti ti-heart" /></Link>
                </div>
                <span className="image-logo avatar avatar-md border rounded-circle">
                    <img src="assets/img/providers/provider-01.jpg" className="img-fluid rounded-circle " alt="logo" />
                </span>
                </div>
                <div className="p-3">
                <h5 className="mb-2">
                    <Link to="/service-details">Wooden Carpentry Work</Link>
                </h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="fs-14 mb-0"><i className="ti ti-map-pin me-2" />Alabama, USA</p>
                    <span className="rating text-gray fs-14"><i className="fa fa-star filled me-1" />4.1</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>$25.00 <span className="fs-13 text-gray"><del>$30.00/hr</del></span></h5>
                    <Link to="/booking" className="btn bg-primary-transparent">Book Now</Link>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>

  );
};

export default ServiceGridCard;





