import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyLoader from "../components/Loader/bodyLoader";
import LoginModal from "../components/Modal/LoginModal";
// import { apiUrl, postData, storage, getDeviceInfo, responseCheck, showSuccessMessage, convertToBase64 } from "../components/api";

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
  
    




  // ✅ Base API URLs
  const apiUrl = () => {
    // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/';
    const apiUrl = 'http://localhost:8080/api/v1/';
    const commurl = apiUrl+'common/';
    const mainUrl = apiUrl + 'user/';

    return { 
      login: `${commurl}user/login`,
      verifyOtp: `${commurl}user/verify-otp`,
      registerOtpSend: `${mainUrl}register-otp-send`,
      register: `${mainUrl}register`,
      updateProfile: `${mainUrl}update-profile`,
      updateProfilePhoto: `${mainUrl}update-profile-photo`,
      updatePassword: `${mainUrl}update-password`,
      getProfile: `${mainUrl}get-profile`,
      logout: `${mainUrl}logout`,
      sendOtp: `${mainUrl}send-otp`,
      submitOtp: `${mainUrl}submit-otp`,
      createPassword: `${mainUrl}create-password`,

      country: `${commurl}country`,
      package: `${commurl}package`,
      state: `${commurl}state`,

      categoryList: `${commurl}category`,
      subCategoryList: `${commurl}sub-category`,
      subSubCategoryList: `${commurl}sub-sub-category`,
      subSubSubCategoryList: `${commurl}sub-sub-sub-category`,
      serviceList: `${commurl}service`,

      addressList: `${commurl}address`,
      addAddress: `${commurl}create-address`,

      addRemoveCart: `${commurl}cart/create-cart`,
      

      

      appSetting: `${commurl}app-setting`,
      contactInquiry: `${commurl}contact-inquiry`,

      homeDetail: `${mainUrl}home-detail`,
      createTransaction: `${mainUrl}create-transaction`,
      transactionStatus: `${mainUrl}check-transaction-status`,
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
    extraData,
    loaderShowHide = null,
    messageAlert = null
  ) => {
    const deviceInfo = JSON.stringify(getDeviceInfo());

    let data = '';
    if (method === 'POST')
      data = JSON.stringify({ ...filedata, device_detail: deviceInfo });
    if (method === 'GET' && filedata) {
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
      return await responseCheck(response, extraData, messageAlert);
    } catch (error) {
      setbodyLoaderShow(false);
      console.error('Failed to make API request:', error);
      return error;
    }
  };

  // ✅ Response Handler
  const responseCheck = async (response, extraData, messageAlert) => {
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
        // showSuccessMessage(result.message, extraData, 1, messageAlert);

        if (result?.token) {
          storage.set('token', result.token); 
          storage.set('user', JSON.stringify(result?.user));
          setuser(result?.user);
          toggleModal("loginModal",false);
        }
      } else {
        showSuccessMessage(result.message || 'Something went wrong', extraData, 0, messageAlert);
      }

      return result;
    } catch (error) {
      if (extraData?.loader) extraData.loader.setShowLoader(false);
      console.error('Invalid JSON response:', error);
      return error;
    }
  };

  // ✅ Show Message
  const showSuccessMessage = (message, extraData, type, messageAlert) => {
    if (!messageAlert && extraData?.alert) {
      extraData.alert.setAlertMessage(message);
      extraData.alert.setShowAlert(true);
      extraData.alert.setAlertType(type);
    } else {
      alert(message);
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
      uniqueId = user.id;
    }
    return uniqueId;
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
        const response = await postData({serviceId:serviceId,quantity:quantity,userId:generateUniqueId()}, Urls.addRemoveCart, "POST");
        item.quantity = quantity;

        setcartItems(response.data.cartProducts);
        setcartAmount(response.data.amountData);
        if(response.data?.cartProducts.length>0)
        {
          setservicePageCartShow(true)
        }
        else{
          setservicePageCartShow(false)
        }

        // if (response?.data.length > 0) {
          
        // }
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
      navigate("/services/"+categoryModalItemData.slug);
    }
  }

  const addRemoveCart = async () => {
    try { 
      const response = await postData({slug:slug}, Urls.serviceList, "GET");
      if (response?.data.length > 0) {
        setserviceListData(response.data);
        setservicePageCategoryData(response.categoryList);
        setservicePageName(response.name);
      } 
    } catch (error) { 
      console.error("Cart API Error:", error);
    }
  }

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
      toggleModal,
      modals,
      toggleStep,
      steps,
      setsteps,
      Urls,
      postData,
      storage,
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

      addRemoveCart,
      user,
      setuser,
      handleLogout,
      
    }}>
      {children}
      <BodyLoader />
      <LoginModal />
    </AppContext.Provider>
    
  );
};
