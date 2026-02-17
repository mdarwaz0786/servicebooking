import ServiceListCard from "../../components/Service/ServiceListCard";
// import Pagination from "../../components/Pagination/Pagination";
import CartSidebar from "../../components/Cart/CartSidebar";
import CategoryMiniCard2 from "../../components/Category/CategoryMiniCard2";
import CategoryMiniCard2Mobile from "../../components/Category/CategoryMiniCard2Mobile";
import { useSearchParams } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import CategoryMiniCard3 from "../../components/Category/CategoryMiniCard3";
import CategoryModal from "../../components/Modal/CategoryModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Services = ({ search, slug, handleSubCategory }) => {
  const [searchParams] = useSearchParams();
  const detail = searchParams?.get("detail");

  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [initialCartCheck, setInitialCartCheck] = useState(false); // New state to track initial cart check
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { 
    postData, 
    categoryListData, 
    generateUniqueId, 
    Urls, 
    setserviceDetailData, 
    setserviceDetailDataItem, 
    serviceDetailDataItem, 
    toggleModal, 
    servicePageCategoryData, 
    serviceListData, 
    pageLoading, 
    servicePageName, 
    cartAmount, 
    cartItems, 
    servicePageCartShow, 
    PriceFormat, 
    setCartOpen 
  } = useContext(AppContext);

  // Track loading state
  useEffect(() => {
    // Check if all required data is loaded
    const requiredDataLoaded = 
      serviceListData !== undefined && 
      servicePageCategoryData !== undefined &&
      categoryListData !== undefined;

    if (requiredDataLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [serviceListData, servicePageCategoryData, categoryListData]);

  // Determine if cart should be shown based on matching subcategories
  const shouldShowCart = useMemo(() => {
    // Don't show cart if data isn't ready yet
    if (!cartItems?.length || !serviceListData?.length) {
      return false;
    }
    
    const firstServiceSubCategory = serviceListData[0]?.subCategoryId;
    const firstCartSubCategory = cartItems[0]?.subCategoryId;
    
    // Only show cart if both values exist and match
    return !!(firstServiceSubCategory && firstCartSubCategory && firstServiceSubCategory === firstCartSubCategory);
  }, [serviceListData, cartItems]);

  // Track when cart check is complete
  useEffect(() => {
    if (serviceListData?.length > 0 && cartItems !== undefined) {
      // Small delay to ensure cart doesn't flicker
      const timer = setTimeout(() => {
        setInitialCartCheck(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [serviceListData, cartItems]);

  const handleServiceDetail2 = useCallback(async (id) => {
    try {
      const response = await postData(
        { userId: generateUniqueId() }, 
        Urls.serviceDetail + '/' + id, 
        "GET", 
        0, 
        1
      );
      
      if (response?.success) {
        setserviceDetailData(response.data);
        if (!serviceDetailDataItem) {
          setserviceDetailDataItem(response.data);
        }
        toggleModal("ServiceDetailModal", true);
      }
    } catch (error) {
      console.error("Service Detail API Error:", error);
    }
  }, [postData, generateUniqueId, Urls.serviceDetail, setserviceDetailData, serviceDetailDataItem, setserviceDetailDataItem, toggleModal]);

  // Handle detail param from URL
  useEffect(() => {
    if (detail) {
      handleServiceDetail2(detail);
    }
  }, [detail]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render cart until initial check is complete
  const shouldRenderCart = useMemo(() => {
    return initialCartCheck && shouldShowCart;
  }, [initialCartCheck, shouldShowCart]);

  // Loading Skeleton Components
  const CategorySkeleton = () => (
    <div className="col-xl-3 col-lg-4">
      <div className="side-category shadow p-3 rounded-2">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <Skeleton width={150} height={30} />
        </div>
        <div className="row m-0">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-12 mb-2">
              <Skeleton height={60} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ServiceListSkeleton = ({ hasCart, hasCategory }) => {
    let colClass = "col-xl-8";
    if (hasCart && hasCategory) colClass = "col-xl-6 col-lg-6";
    else if (hasCart) colClass = "col-xl-9 col-lg-12";
    
    return (
      <div className={`${colClass} ${!hasCategory ? 'm-auto' : ''}`}>
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="col-md-6 mb-4">
              <Skeleton height={250} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CartSkeleton = () => (
    <div className="col-xl-3 col-lg-2">
      <div className="cart-sidebar">
        <Skeleton height={400} />
      </div>
    </div>
  );

  const MobileCategorySkeleton = () => (
    <div className="col-xl-12">
      <div className="mb-3">
        <Skeleton width={200} height={30} />
      </div>
      <div className="row m-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={5}
          slidesPerView={5}
          breakpoints={{
            0: { slidesPerView: 2.5 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <SwiperSlide key={i}>
              <Skeleton height={80} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

  const EmptyStateSkeleton = () => (
    <>
      <div className="col-md-4 m-auto">
        <Skeleton height={300} />
      </div>
      <div className="col-md-8 m-auto">
        <div className="card card-body mt-3">
          <Skeleton height={40} width={200} className="mb-3" />
          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="col-md-2">
                <Skeleton height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  // Show loading skeleton if still loading
  if (isLoading || pageLoading) {
    return (
      <>
        <div className="page-wrapper m-0">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                {slug && width > 767 && <CategorySkeleton />}
                {slug && width <= 767 && <MobileCategorySkeleton />}
                
                <ServiceListSkeleton 
                  hasCart={cartItems?.length > 0} 
                  hasCategory={!!slug} 
                />
                
                {/* Only show cart skeleton if we have cart items and initial check is not done */}
                {cartItems?.length > 0 && !initialCartCheck && <CartSkeleton />}
                
                {!serviceListData?.length && <EmptyStateSkeleton />}
              </div>
            </div>
          </div>
        </div>
        <CategoryModal />
      </>
    );
  }

  // Render category section based on screen size
  const renderCategorySection = () => {
    if (!slug) return null;

    if (width > 767) {
      return (
        <div className="col-xl-3 col-lg-4 theiaStickySidebar">
          <div className="side-category shadow p-3 rounded-2">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
              <h4><span className="text-primary">{servicePageName}</span></h4>
            </div>
            <div className="row m-0">
              {servicePageCategoryData?.map((item) => (
                <CategoryMiniCard2 value={item} key={item._id} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
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
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              speed={800}
              centeredSlides={false}
              grabCursor={true}
              breakpoints={{
                0: { slidesPerView: 2.5 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 5 },
              }}
            >
              {servicePageCategoryData?.map((item) => (
                <SwiperSlide key={item._id}>
                  <CategoryMiniCard2Mobile value={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    );
  };

  // Render service list section
  const renderServiceList = () => {
    // Calculate column class based on cart visibility
    const colClass = shouldRenderCart 
      ? slug ? 'col-xl-6 col-lg-6' : 'col-xl-9 col-lg-12'
      : 'col-xl-8';

    return (
      <div className={`${colClass} ${!slug ? 'm-auto' : ''}`}>
        <div className="row justify-content-center align-items-center">
          <ServiceListCard id={slug} />
        </div>
        {/* <Pagination /> */}
      </div>
    );
  };

  // Render cart section
  const renderCartSection = () => {
    if (!shouldRenderCart) return null;

    return (
      <div className="col-xl-3 col-lg-2">
        <CartSidebar />
        {width < 767 && (
          <div className="mobile-cart-fixed-btn">
            <button 
              className="btn btn-primary w-100" 
              onClick={() => setCartOpen(true)}
            >
              {PriceFormat(cartAmount?.payableAmount)}
              <span className="ms-2">View Cart</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <>
      <div className="col-md-4 m-auto">
        <img 
          className="img-fluid" 
          alt="No services found" 
          src="/assets/img/service404.jpg" 
        />
      </div>
      <div className="col-md-8 m-auto">
        <div className="card card-body mt-3 shadow-none bg-transparent" style={{ paddingBottom: '7px' }}>
          <h3 className="text-start hero-category-title">Explore our services</h3>
          <div className="row hero-category">
            <CategoryMiniCard3 
              data={categoryListData} 
              handleSubCategory={handleSubCategory} 
              className={'col-md-2 hero-category hero-category-item'} 
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="page-wrapper m-0">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              {serviceListData?.length ? (
                <>
                  {renderCategorySection()}
                  {renderServiceList()}
                  {renderCartSection()}
                </>
              ) : (
                renderEmptyState()
              )}
            </div>
          </div>
        </div>
      </div>
      <CategoryModal />
    </>
  );
};

export default Services;