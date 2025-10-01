import { Link } from "react-router-dom";
import CategoryMiniCard3 from "../../components/Category/CategoryMiniCard3";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const HeroSection = ({categoryData, handleSubCategory}) => {

  const { homePageData, imageCheck } = useContext(AppContext);

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
                          <h6>{homePageData?.customer} +</h6>
                          <p>Customers </p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center me-4 mt-0">
                        <img src="assets/img/icons/success-02.svg" alt="icon" />
                        <div className="ms-2">
                          <h6>{homePageData?.serviceCompleted}+</h6>
                          <p>Services Completed</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center me-4 mt-0">
                        <img src="assets/img/icons/success-03.svg" alt="icon" />
                        <div className="ms-2">
                          <h6>{homePageData?.review} </h6>
                          <p>Reviews Globally</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  
                <div className="banner-slider">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]} 
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  effect="slide"
                >
                  {homePageData.sliders && homePageData.sliders.length > 0 ? (
                    homePageData.sliders.map((value, index) => (
                      <SwiperSlide key={index}>
                        <Link to={value.link ?? "#"}> 
                          <img src={imageCheck(value.image)} alt={`Slide ${index}`} />
                        </Link>
                      </SwiperSlide>
                    ))
                  ) : (
                    null
                  )}
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
