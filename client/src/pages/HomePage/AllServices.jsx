import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const AllServices = ({ value = [] }) => {
  const { imageCheck, handleServiceDetail } = useContext(AppContext);

  // ✅ Create refs for custom buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className={`section popular-section m-0 p-0`}>
      <div className="container position-relative">
        <div className="row justify-content-center">
          <div
            className="col-lg-12 text-center wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div className="section-header text-center mb-2 d-flex justify-content-between align-items-center">
              <h2 className="mb-3 text-start">{value.title}</h2>

              {/* ✅ Custom Navigation Buttons */}
              <div className="d-flex gap-0">
                <button
                  ref={prevRef}
                  className="custom-prev btn btn-light rounded-circle shadow-sm"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  ref={nextRef}
                  className="custom-next btn btn-light rounded-circle shadow-sm"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Swiper Slider */}
        <div className="service-slider-wrapper all-service">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
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
              0: { slidesPerView: 3 },      // Extra small screens
              640: { slidesPerView: 2 },    // Mobile / small tablets
              768: { slidesPerView: 2 },    // Tablets
              1024: { slidesPerView: 5 },   // Desktop
            }}
          >
            {value.services &&
              value.services.length > 0 &&
              value.services.map((item, index2) => (
                <SwiperSlide key={index2}>
                  <div
                    className="service-item text-center"
                    onClick={() => handleServiceDetail(item._id)}
                  >
                    <div className="service-img mb-2">
                      <Link>
                        <img
                          src={imageCheck(item.image)}
                          className="img-fluid rounded"
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <h6 className="mb-1 text-truncate">
                      <Link>{item.name}</Link>
                    </h6>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AllServices;
