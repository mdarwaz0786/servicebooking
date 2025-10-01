import { Link } from "react-router-dom";
import CategoryMiniCard3 from "../../components/Category/CategoryMiniCard3";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSection = ({categoryData, handleSubCategory}) => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content position-relative overflow-hidden">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 hero-category-div">
              <div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay=".25s">
                
                <h1 className="mb-2 text-center">Connect with Nearby Top-rated Professional <span className="typed" data-type-text="Carpenters" /></h1>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="banner-form bg-white w-100 border mb-3 col-md-6" style={{margin:'0 auto'}}>
                      <form action="#">
                        <div className="d-md-flex align-items-center">
                          <div className="input-group mb-2">
                            <span className="input-group-text px-1"><i className="ti ti-search" /></span>
                            <input type="text" className="form-control" placeholder="Search for Service" />
                          </div>
                          <div className="mb-2">
                            <Link to="/search" className="btn btn-linear-primary d-inline-flex align-items-center w-100">
                              <i className="feather-search me-2" />
                              Search
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-center flex-wrap banner-info m-0" style={{height: '100%',alignItems: 'center !important'}}>
                      <div className="d-flex align-items-center me-4 mt-0">
                        <img src="assets/img/icons/success-01.svg" alt="icon" />
                        <div className="ms-2">
                          <h6>215,292 +</h6>
                          <p>Customers </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center me-4 mt-0">
                        <img src="assets/img/icons/success-02.svg" alt="icon" />
                        <div className="ms-2">
                          <h6>90,000+</h6>
                          <p>Services Completed</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center me-4 mt-0">
                        <img src="assets/img/icons/success-03.svg" alt="icon" />
                        <div className="ms-2">
                          <h6>2,390,968 </h6>
                          <p>Reviews Globally</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  
                <div className="banner-slider">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]} // enable extra features
                    spaceBetween={20}       // gap between slides (px)
                    slidesPerView={1}       // number of slides visible
                    loop={true}             // infinite loop
                    autoplay={{             // autoplay settings
                      delay: 1500,
                      disableOnInteraction: false,
                    }}
                    // navigation              // show next/prev arrows
                    pagination={{ clickable: true }} // show pagination dots
                    // scrollbar={{ draggable: true }}  // scrollbar option
                    effect="slide"           // slide, fade, cube, coverflow, flip
                    // speed={800}             // transition speed (ms)
                    // centeredSlides={true}   // center active slide
                    // grabCursor={true}       // cursor turns into grab hand
                    // breakpoints={{          // responsive settings
                    //   320: { slidesPerView: 1 },
                    //   640: { slidesPerView: 2 },
                    //   1024: { slidesPerView: 3 },
                    // }}
                    // onSlideChange={() => console.log("Slide changed")}
                    // onSwiper={(swiper) => console.log(swiper)}
                  >
                    <SwiperSlide>
                      <Link>
                        <img src="/public/assets/img/home/hero/banner1.jpg" />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Link>
                        <img src="/public/assets/img/home/hero/banner1.jpg" />
                      </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Link>
                        <img src="/public/assets/img/home/hero/banner1.jpg" />
                      </Link>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div className="card card-body mt-3 shadow-none bg-transparent">
                  <div className="row hero-category">
                      <>
                        <CategoryMiniCard3 data={categoryData} handleSubCategory={handleSubCategory} className={'col-md-2 hero-category hero-category-item'} />
                      </>                    
                  </div>
                </div>
               
                
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
