import ServiceListCard from "../../components/Service/ServiceListCard";
import Pagination from "../../components/Pagination/Pagination";
import CartSidebar from "../../components/Cart/CartSidebar";
import CategoryMiniCard2 from "../../components/Category/CategoryMiniCard2";

const Services = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="container-fluid">
          <div className="row">

            {/* 1st box */}
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <h4><span className="text-primary">AC Service & Repair</span></h4>
              </div>
              <div className="row m-0">

                <CategoryMiniCard2 />
                <CategoryMiniCard2 />
                <CategoryMiniCard2 />
                <CategoryMiniCard2 />

              </div>
            </div>

            {/* -- 2nd  box- */}
            <div className="col-xl-6 col-lg-6">

              <div className="row justify-content-center align-items-center">

                <ServiceListCard />





              </div>
              <Pagination />
            </div>

            {/* 3rd box */}
            <div className="col-xl-3 col-lg-2">
              <CartSidebar />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;