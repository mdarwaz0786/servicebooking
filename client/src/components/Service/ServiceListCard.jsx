import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";


const ServiceListCard = () => {
    const { serviceListData, PriceFormat, handleCartAddRemove, imageCheck } = useContext(AppContext);

    
    
  return ( 
      <>  
      {serviceListData.map((value, index)=>(

      
        <div className="service-list" key={index}>
            <div className="service-cont row">
                <div className="service-cont-img col-4">
                <a href="service-details.html">
                    <img
                    className="img-fluid serv-img"
                    alt="Service Image"
                    src={imageCheck(value.image)}
                    />
                </a>
                
                </div>
                <div className="service-cont-info col-8">
                {/* <span className="badge bg-light fs-14 mb-2">Car Wash</span> */}
                <h3 className="title">
                    <a href="service-details.html">{value.name}</a>
                </h3>
                <div className="service-pro-img">                    
                    <span>
                    <i className="fas fa-star filled" />
                    4.9 (100k reviews)
                    </span>
                </div>
                <p><i className="fa fa-clock" />3 hrs</p>
                <p><i className="fa fa-tag" />499 per AC</p>
                <Link>View Detail</Link>
                </div>
            </div>
            <div className="service-action col-12">
                <h6>
                {PriceFormat(value.salePrice)}<span className="old-price">{PriceFormat(value.mrpPrice)}</span>
                </h6>

                <div className="d-flex align-items-center service-item-add-btn-section m-3 mb-0 mt-0">
                    <button className="btn btn-light border cart-item-btn" onClick={()=> handleCartAddRemove(value,2)} >-</button>
                    <span className="mx-3 item-qty">{value?.quantity?value?.quantity:0}</span>
                    <button className="btn btn-light border cart-item-btn" onClick={()=> handleCartAddRemove(value,1)}>+</button>
                </div>

                
            </div>
        </div>
        ))}
    </>

  );
};

export default ServiceListCard;





