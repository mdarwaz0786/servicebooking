import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BodyLoader from "../components/Loader/BodyLoader";
import LoginModal from "../components/Modal/LoginModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import ServiceManJoinModal from "../components/Modal/ServiceManJoinModal";
import ServiceDetailModal from "../components/Modal/ServiceDetailModal";



export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  // const Urls = apiUrl();

  const [bodyLoaderShow, setbodyLoaderShow] = useState(false);
  const [pagination, setpagination] = useState([]);
  
  const [categoryModalListData, setcategoryModalListData] = useState([]);
  const [categoryModalItemData, setcategoryModalItemData] = useState([]);
  
  const [categoryListData, setcategoryListData] = useState([]);
  const [categoryItemData, setcategoryItemData] = useState([]);
  
  const [subcategoryListData, setsubcategoryListData] = useState([]);
  const [subcategoryItemData, setsubcategoryItemData] = useState([]);
  
  const [subsubcategoryListData, setsubsubcategoryListData] = useState([]);
  const [subsubcategoryItemData, setsubsubcategoryItemData] = useState([]);
  
  const [subsubsubcategoryListData, setsubsubsubcategoryListData] = useState([]);
  const [subsubsubcategoryItemData, setsubsubsubcategoryItemData] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serviceListData, setserviceListData] = useState([]);
  const [serviceItemData, setserviceItemData] = useState([]);
  const [pageLoading, setpageLoading] = useState(true);
  
  const [serviceDetailData, setserviceDetailData] = useState([]);
  const [serviceDetailDataItem, setserviceDetailDataItem] = useState();

  const [rateCardDetailData, setrateCardDetailData] = useState([]);
  
  const [myserviceListData, setmyserviceListData] = useState([]);
  
  const [categoryModalImage, setcategoryModalImage] = useState([]);
  
  const [servicePageCategoryData, setservicePageCategoryData] = useState([]);
  const [servicePageName, setservicePageName] = useState([]);
  const [homePageData, sethomePageData] = useState([]);
  
  
  const [cartItems, setcartItems] = useState([]);
  const [cartAmount, setcartAmount] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [userSidebaOpen, setUserSidebaOpen] = useState(false);
  
  const [user, setuser] = useState();
  
  const [servicePageCartShow, setservicePageCartShow] = useState(false);
  
  
  // booking states
  const [bookingAddress, setbookingAddress] = useState(false);
  const [bookingDate, setbookingDate] = useState(false);
  const [bookingTime, setbookingTime] = useState(false);
  const [bookingData, setbookingData] = useState([]);
  const [bookingItems, setbookingItems] = useState([]);
  const [bookingAmount, setbookingAmount] = useState([]);
  
  
  
  
  
  
  const SERVER_BASE_URL = import.meta.env.VITE_API_SERVER_BASE_URL;
  const VITE_APP_NAME = import.meta.env.VITE_APP_NAME;
  const socketUrl = import.meta.env.VITE_socketUrl;
  
  // ✅ Base API URLs
  const apiUrl = () => {
    // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/';
    const apiUrl = SERVER_BASE_URL + 'api/v1/';
    const commurl = apiUrl + 'common/';
    const userUrl = apiUrl + 'user/';
    const servicemanUrl = apiUrl + 'serviceman/';
    
    return {
      login: `${userUrl}auth/login`,
      verifyOtp: `${userUrl}auth/verify-otp`,
      logout: `${userUrl}logout`,
      
      homeDetail: `${commurl}home`,
      metaDetail: `${commurl}meta-tag`,
      

      categoryList: `${commurl}category`,
      subCategoryList: `${commurl}sub-category`,
      subSubCategoryList: `${commurl}sub-sub-category`,
      subSubSubCategoryList: `${commurl}sub-sub-sub-category`,
      serviceList: `${commurl}service`,
      serviceDetail: `${commurl}service`,

      rateCardDetail: `${commurl}rate-card`,

      blog: `${commurl}blog`,
      blogDetail: `${commurl}blog/detail`,

      career: `${commurl}job-posting`,
      jobApply: `${commurl}job-application`,

      termCondition: `${commurl}terms-conditions/68f9c1b3d21c16a35f074cc1`, 
      privacyPolicy: `${commurl}privacy-policy/68f9c40128f9e5ad117c82a1`,
      refundPolicy: `${commurl}refund-policy/68f9c555819007e42b718e67`,
      GreenIndiaTeamImpact: `${commurl}impact/68f9c71c3cb87f459f74c3d7`,
      Disclaimer: `${commurl}disclaimer/68f9c71c3cb87f459f74c3d7`,
      AppUrl: `${commurl}app`,

      contactEnquiry: `${commurl}contact-enquiry`,

      addressList: `${userUrl}address`,
      addAddress: `${userUrl}address/create-address`,
      removeAddress: `${userUrl}address/delete-address`,

      timeSlot: `${commurl}time-slot/available/by-date`,

      addRemoveCart: `${commurl}cart/create-cart`,

      createTransaction: `${commurl}payment/create-order`,
      verifyTransaction: `${commurl}payment/verify-payment`,

      allReview: `${commurl}review`,

      createBooking: `${userUrl}booking/create-booking`,
      myBooking: `${userUrl}booking`,
      myBookingDetail: `${userUrl}booking`,

      approveAllAdditionalParts: `${userUrl}booking/update-status`,
      rejectAllAdditionalParts: `${userUrl}booking/update-status`,
      cancelAllAdditionalParts: `${userUrl}booking/update-status`,

      myReview: `${userUrl}review`,
      myReviewRemove: `${userUrl}review`,
      myReviewAdd: `${userUrl}review`,

      serviceManReview: `${userUrl}review`,

      myProfileDetail: `${userUrl}auth/loggedIn`,
      myProfileUpdate: `${userUrl}auth/update-profile`,

      // service man urls
      serviceManlogin: `${servicemanUrl}auth/login`,
      serviceManverifyOtp: `${servicemanUrl}auth/verify-otp`,
      serviceMankycDetail: `${servicemanUrl}kyc/detail`,
      serviceMankycUpdate: `${servicemanUrl}kyc`,

      serviceManProfileDetail: `${servicemanUrl}profile/detail`,
      serviceManProfileUpdate: `${servicemanUrl}profile`,


      serviceManBooking: `${servicemanUrl}booking`,
      serviceManBookingAccept: `${servicemanUrl}booking/accept`,
      serviceManBookingOtp: `${servicemanUrl}booking/booking-start-otp`,
      serviceManBookingOtpVerify: `${servicemanUrl}booking/booking-start-otp-verify`,

      // service man urls end





    };
  };


  // ✅ LocalStorage helpers
  const storage = {
    set: (key, value) => localStorage.setItem(key, value),
    get: (key) => localStorage.getItem(key),
    delete: (key) => localStorage.removeItem(key),
  };

  // ✅ Get browser device info
  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      vendor: navigator.vendor,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };
  };

  // ✅ API call function
  const postData = async (
    filedata,
    url,
    method,
    loaderShowHide = null,
    messageAlert = null,
    isFileUpload = false // new flag for file uploads
  ) => {
    const deviceInfo = "" // JSON.stringify(getDeviceInfo());
    let bodyData = null;

    if (isFileUpload) {
      // Use FormData for file uploads
      bodyData = new FormData();

      for (const key in filedata) {
        const value = filedata[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item instanceof File) {
              // Append each file with the same key
              bodyData.append(key, item);
            } else if (typeof item === 'object') {
              bodyData.append(`${key}[]`, JSON.stringify(item)); // objects in array
            } else {
              bodyData.append(`${key}[]`, item); // primitive array
            }
          });
        } else if (value instanceof File) {
          bodyData.append(key, value); // single file
        } else if (typeof value === 'object' && value !== null) {
          bodyData.append(key, JSON.stringify(value)); // nested object
        } else {
          bodyData.append(key, value); // primitive
        }
      }

      // Append device info
      bodyData.append('device_detail', deviceInfo);
    } else {
      if (method === 'POST') bodyData = JSON.stringify({ ...filedata, device_detail: deviceInfo });
      if (method === 'GET' && filedata) {
        const params = new URLSearchParams({ ...filedata, device_detail: deviceInfo }).toString();
        url += `?${params}`;
      }
      if (method === 'DELETE' && filedata) {
        const params = new URLSearchParams({ ...filedata, device_detail: deviceInfo }).toString();
        url += `?${params}`;
      }
    }

    if (!loaderShowHide) setbodyLoaderShow(true);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...(isFileUpload ? {} : { 'Content-Type': 'application/json' }),
          Authorization: 'Bearer ' + storage.get('token'),
        },
        body: method === 'POST' || method === 'PUT' ? bodyData : undefined,
      });

      return await responseCheck(response, messageAlert);
    } catch (error) {
      setbodyLoaderShow(false);
      console.error('Failed to make API request:', error); 
      return error;
    }
  };



  // ✅ Response Handler
  const responseCheck = async (response, messageAlert) => {
    try {
      let result = [];
      if ([200, 400, 401, 204, 201, 500].includes(response.status)) {
        result = await response.json();
      } else {
        result = response;
      }

      console.log('Response:', result);
      setbodyLoaderShow(false);

      if (result.success === true) {
        if (result?.pagination) {
          if (result.pagination.pages.length > 0)
            setpagination(result.pagination);
        }
        if (!messageAlert && result.message) {
          toast.success(result.message);
        }


        if (result?.token) {
          if(result?.user?.role!="serviceman" && result?.user?.role!="provider")
          {
            storage.set('token', result.token);
            storage.set('user', JSON.stringify(result?.user));
            setuser(result?.user);
            toggleModal("loginModal", false);
          }
        }
      } else {
        if (!messageAlert && result.message)
          toast.error(result.message || 'Something went wrong');
      }

      return result;
    } catch (error) {
      setbodyLoaderShow(false);
      console.error('Invalid JSON response:', error);
      return error;
    }
  };




  // ✅ Convert File to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

const PriceFormat = (value = 0, afterDigit = 2) => {
  const num = isNaN(value) ? 0 : Number(value);

  const digits = afterDigit === 0 ? 0 : afterDigit;
  

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(num);
};


  const generateUniqueId = () => {
    let uniqueId = localStorage.getItem("uniqueId");
    let user = localStorage.getItem("user");
    if (!uniqueId) {
      uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("uniqueId", uniqueId);
    }
    if (user) {
      user = JSON.parse(user);
      uniqueId = user._id;
    }
    return uniqueId;
  };


  const bookingStatus = (value) => {
    let status = '';
    
    switch(value) {
        case 'new':
            status = <span className="badge badge-soft-info ms-2">Confirm</span>;
            break;
        case 'assign':
            status = <span className="badge badge-soft-info ms-2">Assigned</span>;
            break;
        case 'hold':
            status = <span className="badge badge-soft-warning ms-2">On Hold</span>;
            break;
        case 'accept':
            status = <span className="badge badge-soft-success ms-2">Accepted</span>;
            break;
        case 'reject':
            status = <span className="badge badge-soft-danger ms-2">Rejected</span>;
            break;
        case 'ongoing':
            status = <span className="badge badge-soft-primary ms-2">In Progress</span>;
            break;
        case 'complete':
            status = <span className="badge badge-soft-success ms-2">Completed</span>;
            break;
        case 'cancel':
            status = <span className="badge badge-soft-danger ms-2">Cancelled</span>;
            break;
        case 'taken':
            status = <span className="badge badge-soft-info ms-2">Service Taken</span>;
            break;
        case 'partstatusnew':
            status = <span className="badge badge-soft-primary ms-2">Partial - New</span>;
            break;
        case 'partstatusconfirm':
            status = <span className="badge badge-soft-success ms-2">Partial - Confirmed</span>;
            break;
        case 'partstatusapprove':
            status = <span className="badge badge-soft-success ms-2">Partial - Approved</span>;
            break;
        case 'partstatusreject':
            status = <span className="badge badge-soft-danger ms-2">Partial - Rejected</span>;
            break;
        default:
            status = <span className="badge badge-soft-secondary ms-2">{value}</span>;
    }
    
    return status;
};




  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const imageCheck = (path, defaultImg = null) => {
    const baseUrl = SERVER_BASE_URL
    let image = '';
    if (!path) {
      if (defaultImg) image = `${baseUrl}${'uploads/' + defaultImg}`;
      else image = `${baseUrl}${'uploads/default.jpg'}`;
    }
    else {
      image = `${baseUrl}${path}`;
    }

    try {
      const decoded = JSON.parse(path);

      if (Array.isArray(decoded) || typeof decoded === "object") {
        if (decoded?.[0]?.image_path) {
          image = `${baseUrl}${decoded[0].image_path}`;
        }
      } else if (path && typeof path === "string") {
        image = `${baseUrl}${path}`;
      }
    } catch (e) {
      if (path && typeof path === "string") {
        image = `${baseUrl}${path}`;
      }
    }

    return image;
  }



  const [modals, setModals] = useState({
    homeCategoryModal: false,
    loginModal: false,
    serviceManJoinModal: false,
    addressModal: false,
    BookignStartModal: false,
    BookignReviewModal: false,
    CompanyReviewModal: false,
    ServiceDetailModal: false,
    RateCardModal: false,
    paymentModeModal: false,
  });
  const toggleModal = (modalName, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isOpen, // sirf us modal ka state update hoga
    }));
  };


  // checkFormSteps
  const [checkoutpageloading, setcheckoutpageloading] = useState(true);
  const [steps, setsteps] = useState({
    location: true,
    additionalservice: false,
    datetime: false,
    personalinformation: false,
    cart: false,
    payment: false,
    confirmation: false,
  });
  const toggleStep = (stepName, isOpen) => {
    setsteps((prev) => ({
      ...prev,
      [stepName]: isOpen, // sirf us modal ka state update hoga
    }));
  };




  const handleCartAddRemove = async (item, type, remove=null) => {
    let quantity = item?.quantity;
    let serviceId = item._id;
    if (item.serviceId) serviceId = item.serviceId;
    if (type == 1) {
      quantity += 1;
    }
    else {
      if(remove)
        quantity = 0;
      else
        quantity = quantity > 0 ? quantity - 1 : 0;
    }

    if(quantity>item.maxBookingQuantity)
    {
      toast.error(`Max Quantity ${item.maxBookingQuantity}` || 'Something went wrong');
      return false;
    }

    try {
      // generateUniqueId()
      const response = await postData({ serviceId: serviceId, quantity: quantity, userId: generateUniqueId() }, Urls.addRemoveCart, "POST", 0, 1);


      if (response.success) {
        setcartItems(response.data.cartProducts);
        setcartAmount(response.data.amountData);
        if (response.data?.cartProducts.length > 0) {
          setservicePageCartShow(true)
        }
        else {
          setservicePageCartShow(false)
        }
      }
      else {
        if (type == 1) {
          if (quantity > 0) quantity -= 1;
        }
        else {
          quantity = quantity > 0 ? quantity + 1 : 0;
        }
        setcartItems([]);
        setcartAmount([]);
      }
      item.quantity = quantity;      
      toggleModal("ServiceDetailModal", false);

    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  



  const handleCategoryClick = async (item) => {
    setcategoryModalImage(item.image)
    if (item.subCategoryCount) {
      setcategoryModalItemData(item)
      try {
        if (item.subSubCategoryCount) {
          const response = await postData({ categoryId: item._id, sort: 'asc' }, Urls.subCategoryList, "GET", 0, 1);
          if (response?.data.length > 0) {
            setcategoryModalListData(response.data);
          }
          toggleModal("homeCategoryModal", true);
        }
        else {
          toggleModal("homeCategoryModal", false);
          navigate("/services/" + item.slug);
        }

      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else if (item.subSubCategoryCount) {
      toggleModal("homeCategoryModal", false)
      setcategoryModalItemData(item)
      try {
        if (item.subSubSubCategoryCount) {
          const response = await postData({ subCategoryId: item._id, sort: 'asc' }, Urls.subSubCategoryList, "GET", 0, 1);
          if (response?.data.length > 0) {
            setcategoryModalListData(response.data);
          }
          toggleModal("homeCategoryModal", true);
        }
        else {
          toggleModal("homeCategoryModal", false);
          navigate("/services/" + item.slug);
        }
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else if (item.subSubSubCategoryCount) {
      toggleModal("homeCategoryModal", false)
      setcategoryModalItemData(item)
      try {
        const response = await postData({ subSubCategoryId: item._id, sort: 'asc' }, Urls.subSubSubCategoryList, "GET", 0, 1);
        // if (response?.data.length > 0) {
        //   setcategoryModalListData(response.data);
        // }  
        toggleModal("homeCategoryModal", false);
        navigate("/services/" + item.slug);
        toggleModal("homeCategoryModal", true)
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else {
      toggleModal("homeCategoryModal", false);
      navigate("/services/" + item.slug);
    }
  }

  const handleServiceDetail = async (id, item, openServicePage=0) => {
    if(openServicePage==1)
    {
      setserviceDetailDataItem(item);
      if(item.subSubSubCategoryCount)
      {
        navigate("/services/" + item.subSubCategorySlug+'?detail='+item._id);
      }
      else if(item.subSubCategoryCount)
        {
          navigate("/services/" + item.subCategorySlug+'?detail='+item._id);
      }
      else
        {
        navigate("/services/" + item.categorySlug+'?detail='+item._id);
      }
      

      return false;
    }

    try {
      const response = await postData({userId:generateUniqueId()}, Urls.serviceDetail + '/' + id, "GET", 0, 1);
      if (response.success) {
        if (response?.success) {
          setserviceDetailData(response.data);
          setserviceDetailDataItem(response.data);
          toggleModal("ServiceDetailModal", true)

        }
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  const handleRateCardDetail = async (id, item) => {
    try {
      const response = await postData({userId:generateUniqueId()}, Urls.rateCardDetail + '/' + id, "GET", 0, 1);
      if (response.success) {
        if (response?.success) {
          setrateCardDetailData(response.data);
          toggleModal("RateCardModal", true)
          toggleModal("ServiceDetailModal", false);
        }
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }


  const handleHome = async () => {
    try {
      const response = await postData({ userId: generateUniqueId() }, Urls.homeDetail, "GET", 0, 1);
      if (response.success) {
        sethomePageData(response.data)
        if (response?.data.category.length > 0) {
          setcategoryListData(response.data.category);
        }
        if (response?.data.cart.cartProducts.length > 0) {
          setservicePageCartShow(true);
          setcartItems(response.data.cart.cartProducts);
          setcartAmount(response.data.cart.amountData);
        }
      }
    } catch (error) {
      console.error("Cart API Error:", error);
    }
  }

  useEffect(() => {
    toggleModal("homeCategoryModal", false);
    handleHome();
  }, []);

  const handleLogout = async () => {
    storage.delete('user');
    storage.delete('token');
    setuser(null);
    window.location.reload();
  }





  const Urls = apiUrl();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AppContext.Provider value={{
      SERVER_BASE_URL,
      VITE_APP_NAME,
      socketUrl,
      toggleModal,
      modals,

      bookingStatus,
      
      checkoutpageloading,
      setcheckoutpageloading,
      steps,
      toggleStep,
      setsteps,
      Urls,
      postData,
      storage,
      formatDateTime,
      formatDate,
      handleHome,
      homePageData,
      sethomePageData,
      toast,
      user,
      setuser,
      handleLogout,
      imageCheck,
      pagination,
      setpagination,

      handleCategoryClick,
      handleServiceDetail,

      handleCartAddRemove,

      categoryModalListData,
      setcategoryModalListData,

      categoryModalItemData,
      setcategoryModalItemData,

      categoryListData,
      setcategoryListData,
      categoryItemData,
      setcategoryItemData,

      subcategoryListData,
      setsubcategoryListData,
      subcategoryItemData,
      setsubcategoryItemData,

      subsubcategoryListData,
      setsubsubcategoryListData,
      subsubcategoryItemData,
      setsubsubcategoryItemData,

      subsubsubcategoryListData,
      setsubsubsubcategoryListData,
      subsubsubcategoryItemData,
      setsubsubsubcategoryItemData,

      selectedCategory,
      setSelectedCategory,
      serviceDetailData,
      setserviceDetailData,
      serviceDetailDataItem,
      setserviceDetailDataItem,

      categoryModalImage,
      setcategoryModalImage,

      myserviceListData,
      setmyserviceListData,

      serviceListData,
      setserviceListData,
      pageLoading,
      setpageLoading,
      serviceItemData,
      setserviceItemData,

      rateCardDetailData,
      setrateCardDetailData,
      handleRateCardDetail,

      servicePageCategoryData,
      setservicePageCategoryData,

      servicePageName,
      setservicePageName,

      servicePageCartShow,
      setservicePageCartShow,

      cartItems,
      setcartItems,

      setCartOpen,
      cartOpen,

      setUserSidebaOpen,
      userSidebaOpen,

      cartAmount,
      setcartAmount,

      navigate,

      bodyLoaderShow,
      setbodyLoaderShow,
      PriceFormat,
      generateUniqueId,




      bookingAddress,
      setbookingAddress,

      bookingDate,
      setbookingDate,

      bookingTime,
      setbookingTime,

      bookingData,
      setbookingData,

      bookingItems,
      setbookingItems,

      bookingAmount,
      setbookingAmount,

    }}>
      {children}
      <BodyLoader />
      <LoginModal />
      <ServiceManJoinModal />
      <ServiceDetailModal />
      <ToastContainer
        position="bottom-right"   // you can change to "top-right", "top-center", etc.
        autoClose={3000}          // close after 3s
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"           // "light", "dark", or "colored"
      />
    </AppContext.Provider>

  );
};
