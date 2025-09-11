import ServiceListCard from "../../components/Service/ServiceListCard";
import Pagination from "../../components/Pagination/Pagination";
import CartSidebar from "../../components/Cart/CartSidebar";
import CategoryMiniCard2 from "../../components/Category/CategoryMiniCard2";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const Services = () => {

  const { servicePageCategoryData, servicePageName, cartAmount, servicePageCartShow } = useContext(AppContext);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">

            {/* 1st box */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <h4><span className="text-primary">{servicePageName}</span></h4>
              </div>
              <div className="row m-0">
              {servicePageCategoryData.map((item, index)=>(
                <CategoryMiniCard2 value={item} key={item._id} />
              ))}

              </div>
            </div>

            {/* -- 2nd  box- */}
            <div className={`${servicePageCartShow?'col-xl-6 col-lg-6':'col-xl-8'}`}>

              <div className="row justify-content-center align-items-center">

                <ServiceListCard />

              </div>
              {/* <Pagination /> */}
            </div>

            {/* 3rd box */}
            {(servicePageCartShow)?(
              <div className="col-xl-3 col-lg-2">
                <CartSidebar />
              </div>
              ):(null)}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;