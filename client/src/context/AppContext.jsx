import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BodyLoader from "../components/Loader/BodyLoader";
import LoginModal from "../components/Modal/LoginModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import ServiceManJoinModal from "../components/Modal/ServiceManJoinModal";



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

  const [serviceListData, setserviceListData] = useState([]);
  const [serviceItemData, setserviceItemData] = useState([]);

  const [myserviceListData, setmyserviceListData] = useState([]);

  const [categoryModalImage, setcategoryModalImage] = useState([]);

  const [servicePageCategoryData, setservicePageCategoryData] = useState([]);
  const [servicePageName, setservicePageName] = useState([]);


  const [cartItems, setcartItems] = useState([]);
  const [cartAmount, setcartAmount] = useState([]);

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

  // ✅ Base API URLs
  const apiUrl = () => {
    // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/';
    const apiUrl = SERVER_BASE_URL+'api/v1/';
    const commurl = apiUrl+'common/';
    const userUrl = apiUrl + 'user/';
    const servicemanUrl = apiUrl + 'serviceman/';

    return { 
      login: `${userUrl}auth/login`,
      verifyOtp: `${userUrl}auth/verify-otp`,      
      logout: `${userUrl}logout`,
      
      homeDetail: `${commurl}home`,

      categoryList: `${commurl}category`,
      subCategoryList: `${commurl}sub-category`,
      subSubCategoryList: `${commurl}sub-sub-category`,
      subSubSubCategoryList: `${commurl}sub-sub-sub-category`,
      serviceList: `${commurl}service`,

      addressList: `${userUrl}address`,
      addAddress: `${userUrl}address/create-address`,
      removeAddress: `${userUrl}address/delete-address`,

      timeSlot: `${commurl}time-slot/available/by-date`,

      addRemoveCart: `${commurl}cart/create-cart`,

      createTransaction: `${commurl}payment/create-order`,
      verifyTransaction: `${commurl}payment/verify-payment`,
      
      createBooking: `${userUrl}booking/create-booking`,
      myBooking: `${userUrl}booking`,
      myBookingDetail: `${userUrl}booking`,
      
      myReview: `${userUrl}review`,
      myReviewRemove: `${userUrl}review`,

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
  const deviceInfo = JSON.stringify(getDeviceInfo());
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
      if ([200, 400, 401, 204, 201,500].includes(response.status)) {
        result = await response.json();
      } else {
        result = response;
      }

      console.log('Response:', result);
      setbodyLoaderShow(false);

      if (result.success === true) {
        if(result?.pagination)
        {
          if(result.pagination.pages.length>0)
          setpagination(result.pagination);
        }
        if(!messageAlert && result.message) 
        {
          toast.success(result.message);
        }
        

        if (result?.token) {
          storage.set('token', result.token); 
          storage.set('user', JSON.stringify(result?.user));
          setuser(result?.user);
          toggleModal("loginModal",false);
        }
      } else {
        if(!messageAlert && result.message) 
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


  const PriceFormat = (value) => {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2, // optional: 2 decimal places
    }).format(value);
    return formatted;
  };
 

  const generateUniqueId = () => {
    let uniqueId = localStorage.getItem("uniqueId");
    let user = localStorage.getItem("user");
    if (!uniqueId) {
      uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
      localStorage.setItem("uniqueId", uniqueId);
    }
    if(user)
    {
      user = JSON.parse(user);
      uniqueId = user._id;
    }
    return uniqueId;
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
  if(!path)
  {
    if(defaultImg) image = `${baseUrl}${'uploads/'+defaultImg}`;
    else image = `${baseUrl}${'uploads/default.jpg'}`;
  }
  else{
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
  });
  const toggleModal = (modalName, isOpen) => {
    setModals((prev) => ({
      ...prev,
      [modalName]: isOpen, // sirf us modal ka state update hoga
    }));
  };


  // checkFormSteps
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



  
   const handleCartAddRemove = async (item, type) => {    
      let quantity = item?.quantity;
      let serviceId = item._id;
      if(item.serviceId) serviceId = item.serviceId;
      if(type==1)
      {
        quantity += 1;
      }
      else{
        quantity = quantity > 0 ? quantity - 1 : 0;
      }
      try {
        // generateUniqueId()
        const response = await postData({serviceId:serviceId,quantity:quantity,userId:generateUniqueId()}, Urls.addRemoveCart, "POST", 0, 1);
        

        if(response.success)
        {
          setcartItems(response.data.cartProducts);
          setcartAmount(response.data.amountData);
          if(response.data?.cartProducts.length>0)
          {
            setservicePageCartShow(true)
          }
          else{
            setservicePageCartShow(false)
          }
        }
        else{
          if(type==1)
          {
            if(quantity>0) quantity -= 1;
          }
          else{
            quantity = quantity > 0 ? quantity + 1 : 0;
          }
          setcartItems([]);
          setcartAmount([]);
        }
        item.quantity = quantity;

      } catch (error) {
        console.error("Cart API Error:", error);
      }
  }



  const handleCategoryClick = async (item) => {
    setcategoryModalImage(item.image)
    if(item.subCategoryCount)
    {
      setcategoryModalItemData(item)
      try {
        const response = await postData({id:item._id}, Urls.subCategoryList, "GET", 0, 1);
        if (response?.data.length > 0) {
          setcategoryModalListData(response.data);
        }
        toggleModal("homeCategoryModal",true)
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else if(item.subSubCategoryCount){
      toggleModal("homeCategoryModal",false)
      setcategoryModalItemData(item)
      try {
        const response = await postData({id:item._id}, Urls.subSubCategoryList, "GET", 0, 1);
        if (response?.data.length > 0) {
          setcategoryModalListData(response.data);
        }        
        toggleModal("homeCategoryModal",true)
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else if(item.subSubSubCategoryCount){
      toggleModal("homeCategoryModal",false)
      setcategoryModalItemData(item)
      try {
        const response = await postData({id:item._id}, Urls.subSubSubCategoryList, "GET", 0, 1);
        if (response?.data.length > 0) {
          setcategoryModalListData(response.data);
        }        
        toggleModal("homeCategoryModal",true)
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    }
    else{
      toggleModal("homeCategoryModal", false); 
      navigate("/services/"+categoryModalItemData.slug);
    }
  }


    const handleHome = async () => {
      try {
        const response = await postData({userId:generateUniqueId()}, Urls.homeDetail, "GET", 0, 1);
        if(response.success)
        {
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
      toggleModal,
      modals,
      toggleStep,
      steps,
      setsteps,
      Urls,
      postData,
      storage,
      formatDateTime,
      formatDate,
      handleHome,
      toast,
      user,
      setuser,
      handleLogout,
      imageCheck,
      pagination,
      setpagination,
      
      handleCategoryClick,

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

      categoryModalImage,
      setcategoryModalImage,

      myserviceListData,
      setmyserviceListData,

      serviceListData,
      setserviceListData,
      serviceItemData,
      setserviceItemData,

      servicePageCategoryData,
      setservicePageCategoryData,
      
      servicePageName,
      setservicePageName,

      servicePageCartShow,
      setservicePageCartShow,

      cartItems,
      setcartItems,

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
