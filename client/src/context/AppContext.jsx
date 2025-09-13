import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyLoader from "../components/Loader/bodyLoader";
import LoginModal from "../components/Modal/LoginModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";



export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  // const Urls = apiUrl();

  const [bodyLoaderShow, setbodyLoaderShow] = useState(false);

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

  
    




  // ✅ Base API URLs
  const apiUrl = () => {
    // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/';
    const apiUrl = 'http://localhost:8080/api/v1/';
    const commurl = apiUrl+'common/';
    const mainUrl = apiUrl + 'user/';

    return { 
      login: `${commurl}user/login`,
      verifyOtp: `${commurl}user/verify-otp`,      
      logout: `${mainUrl}logout`,
      
      homeDetail: `${commurl}home`,

      categoryList: `${commurl}category`,
      subCategoryList: `${commurl}sub-category`,
      subSubCategoryList: `${commurl}sub-sub-category`,
      subSubSubCategoryList: `${commurl}sub-sub-sub-category`,
      serviceList: `${commurl}service`,

      addressList: `${mainUrl}address`,
      addAddress: `${mainUrl}address/create-address`,
      removeAddress: `${mainUrl}address/delete-address`,

      timeSlot: `${commurl}time-slot/available/by-date`,

      addRemoveCart: `${commurl}cart/create-cart`,
      
      createBooking: `${mainUrl}booking/create-booking`,
      };
  };
  const SERVER_BASE_URL = import.meta.env.VITE_API_SERVER_BASE_URL;

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
    messageAlert = null
  ) => {
    const deviceInfo = JSON.stringify(getDeviceInfo());

    let data = '';
    if (method === 'POST')
      data = JSON.stringify({ ...filedata, device_detail: deviceInfo });
    let UID = generateUniqueId();
    if (method === 'GET' && filedata) {
      const params = new URLSearchParams({ ...filedata, device_detail: deviceInfo }).toString();
      url += `?${params}`;
    }
    if (method === 'delete' && filedata) {
      const params = new URLSearchParams({ ...filedata, device_detail: deviceInfo }).toString();
      url += `?${params}`;
    }

    if (!loaderShowHide) setbodyLoaderShow(true);
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + storage.get('token'),
        },
        body: method === 'POST' ? data : undefined,
      });
      // console.log(response);
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
      if ([200, 400, 401, 204, 201].includes(response.status)) {
        result = await response.json();
      } else {
        result = response;
      }

      console.log('Response:', result);
      setbodyLoaderShow(false);

      if (result.success === true) {
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
        toast.error(result.message || 'Something went wrong');
      }

      return result;
    } catch (error) {
      if (extraData?.loader) extraData.loader.setShowLoader(false);
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



  

  const [modals, setModals] = useState({
    homeCategoryModal: false,
    loginModal: false,
    addressModal: false,
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
        const response = await postData({serviceId:serviceId,quantity:quantity,userId:generateUniqueId()}, Urls.addRemoveCart, "POST");
        

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
    if(item.subCategoryCount)
    {
      setcategoryModalItemData(item)
      try {
        const response = await postData({id:item._id}, Urls.subCategoryList, "GET");
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
        const response = await postData({id:item._id}, Urls.subSubCategoryList, "GET");
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
        const response = await postData({id:item._id}, Urls.subSubSubCategoryList, "GET");
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
        const response = await postData({userId:generateUniqueId()}, Urls.homeDetail, "GET");
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
      toggleModal,
      modals,
      toggleStep,
      steps,
      setsteps,
      Urls,
      postData,
      storage,
      formatDateTime,
      handleHome,
      toast,
      
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

      user,
      setuser,
      handleLogout,


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
