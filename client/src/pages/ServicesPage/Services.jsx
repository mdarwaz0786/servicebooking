import ServiceListCard from "../../components/Service/ServiceListCard";
// import Pagination from "../../components/Pagination/Pagination";
import CartSidebar from "../../components/Cart/CartSidebar";
import CategoryMiniCard2 from "../../components/Category/CategoryMiniCard2";
import CategoryMiniCard2Mobile from "../../components/Category/CategoryMiniCard2Mobile";
import { useSearchParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useRef, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CategoryMiniCard3 from "../../components/Category/CategoryMiniCard3";
import CategoryModal from "../../components/Modal/CategoryModal";

const Services = ({ search, slug, handleSubCategory }) => {

  const [searchParams] = useSearchParams();
  const detail = searchParams?.get("detail");

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  const { postData, categoryListData, generateUniqueId, Urls, setserviceDetailData, setserviceDetailDataItem, serviceDetailDataItem, toggleModal, servicePageCategoryData, serviceListData, pageLoading, servicePageName, cartAmount, cartItems, servicePageCartShow, PriceFormat, setCartOpen } = useContext(AppContext);

  const handleServiceDetail2 = async (id) => {
    try {
      const response = await postData({ userId: generateUniqueId() }, Urls.serviceDetail + '/' + id, "GET", 0, 1);
      if (response.success) {
        setserviceDetailData(response.data);
        if (!serviceDetailDataItem) setserviceDetailDataItem(response.data);
        toggleModal("ServiceDetailModal", true);
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  useEffect(() => {

    if (detail) {
      handleServiceDetail2(detail)
    }

    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  return (

    <>

      <div className="page-wrapper m-0">
        <div className="content">
          <div className="container-fluid">
            <div className="row">

              {serviceListData.length ?
                <>
                  {/* 1st box */}
                  {slug ?

                    <>
                      {width > 767 ?
                        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
                          <div className="side-category shadow p-3 rounded-2">
                            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                              <h4><span className="text-primary">{servicePageName}</span></h4>
                            </div>
                            <div className="row m-0">
                              {servicePageCategoryData.map((item, index) => (
                                <CategoryMiniCard2 value={item} key={item._id} />
                              ))}
                            </div>

                          </div>
                        </div>
                        :
                        <div className="col-xl-12">
                          <div className="">
                            <div className="">
                              <h4><span className="text-primary">{servicePageName}</span></h4>
                            </div>
                            <div className="row m-0">
                              <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={5}
                                slidesPerView={5}
                                loop={false}
                                // autoplay={{
                                //   delay: 2500,
                                //   disableOnInteraction: false,
                                // }}
                                onInit={(swiper) => {
                                  // ✅ Assign the navigation buttons AFTER Swiper is initialized
                                  swiper.params.navigation.prevEl = prevRef.current;
                                  swiper.params.navigation.nextEl = nextRef.current;
                                  swiper.navigation.init();
                                  swiper.navigation.update();
                                }}
                                speed={800}
                                centeredSlides={false}
                                grabCursor={true}
                                breakpoints={{
                                  0: { slidesPerView: 2.5 },      // Extra small screens
                                  640: { slidesPerView: 2 },    // Mobile / small tablets
                                  768: { slidesPerView: 2 },    // Tablets
                                  1024: { slidesPerView: 5 },   // Desktop
                                }}
                              >
                                {servicePageCategoryData.map((item, index) => (
                                  <SwiperSlide key={index}>
                                    <CategoryMiniCard2Mobile value={item} key={item._id} />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>

                          </div>
                        </div>
                      }
                    </>


                    : null}

                  {/* -- 2nd  box- */}
                  <div className={`${cartItems.length > 0 ? slug ? 'col-xl-6 col-lg-6' : 'col-xl-9 col-lg-12' : 'col-xl-8'} ${!slug ? 'm-auto' : ''}`}>

                    <div className="row justify-content-center align-items-center">

                      <ServiceListCard id={slug} />

                    </div>
                    {/* <Pagination /> */}
                  </div>

                  {/* 3rd box */}
                  {(cartItems.length > 0) ? (
                    <div className="col-xl-3 col-lg-2">
                      <>
                        <CartSidebar />
                        {width < 767 ?
                          <div className="mobile-cart-fixed-btn">
                            <button className="btn btn-primary w-100" onClick={() => setCartOpen(true)}>
                              {PriceFormat(cartAmount.payableAmount)}
                              <span className="ms-2">View Cart</span>
                            </button>
                          </div> : null}
                      </>
                    </div>
                  ) : (null)}

                </>
                :
                <>
                  <div className="col-md-4 m-auto">
                    <img className="img-fluid" alt="Logo" src="/assets/img/service404.jpg" />
                  </div>
                  <div className="col-md-8 m-auto">
                    <div className="card card-body mt-3 shadow-none bg-transparent" style={{ paddingBottom: '7px' }}>
                      <h3 className="text-start hero-category-title">Explore our services</h3>
                      <div className="row hero-category">
                        <>
                          <CategoryMiniCard3 data={categoryListData} handleSubCategory={handleSubCategory} className={'col-md-2 hero-category hero-category-item'} />
                        </>
                      </div>
                    </div>
                  </div>
                </>
              }

            </div>
          </div>
        </div>
      </div>
      <CategoryModal />
    </>
  );
};

export default Services;