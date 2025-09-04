import { Link } from "react-router-dom";

const ServiceListCard = ({ value = [] }) => {
  return (
    
    <>    
        <div className="service-list">
            <div className="service-cont row">
                <div className="service-cont-img col-4">
                <a href="service-details.html">
                    <img
                    className="img-fluid serv-img"
                    alt="Service Image"
                    src="assets/img/services/service-04.jpg"
                    />
                </a>
                <div className="fav-item">
                    <a href="javascript:void(0)" className="fav-icon">
                    <i className="feather-heart" />
                    </a>
                </div>
                </div>
                <div className="service-cont-info col-8">
                {/* <span className="badge bg-light fs-14 mb-2">Car Wash</span> */}
                <h3 className="title">
                    <a href="service-details.html">Car Repair Services</a>
                </h3>
                <p>
                    <i className="feather-map-pin" />
                    Maryland City, MD, USA
                </p>
                <div className="service-pro-img">
                    <img src="assets/img/profiles/avatar-01.jpg" alt="user" />
                    <span>
                    <i className="fas fa-star filled" />
                    4.9
                    </span>
                </div>
                </div>
            </div>
            <div className="service-action col-12">
                <h6>
                $25.00<span className="old-price">$35.00</span>
                </h6>
                <a href="booking.html" className="btn btn-light">
                Book Now
                </a>
            </div>
            </div>

    </>

  );
};

export default ServiceListCard;





