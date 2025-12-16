import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


const PopularServices = () => {
  const { categoryListData, handleHome, toggleModal, homePageData, imageCheck, handleServiceDetail } = useContext(AppContext);
  const prevRef = useRef(null);
    const nextRef = useRef(null); 
  return (
    <section className="section popular-section popular-section2 pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12  wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header text-start mb-4">
              <h2 className="mb-1">Our Popular <span className="text-linear-primary">Services</span></h2>
            </div>
          </div>
        </div>
        
       
          
            <div className=" row">

              <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
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
              0: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
          >
              {homePageData.mostBookedServices.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="col-md-12" key={index} onClick={() => handleServiceDetail(item._id, item)}>
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
                </SwiperSlide>
              ))}
          </Swiper>
              
              
            </div>
      </div>
    </section>
  );
};

export default PopularServices;