import { createContext, useState } from "react";
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





  // ✅ Base API URLs
  const apiUrl = () => {
    // const apiUrl = 'https://developershahrukh.in/demo/codediffusion/hindibible/api/';
    const apiUrl = 'http://localhost:8080/api/v1/';
    const commurl = apiUrl+'common/';
    const mainUrl = apiUrl + 'user/';

    return { 
      login: `${mainUrl}login`,
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
      if ([200, 400, 401, 204].includes(response.status)) {
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
          storage.set('user', JSON.stringify(result?.data));
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







  

  const [modals, setModals] = useState({
    homeCategoryModal: false,
    loginModal: false,
    modal3: false,
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
  });
  const toggleStep = (stepName, isOpen) => {
    setsteps((prev) => ({
      ...prev,
      [stepName]: isOpen, // sirf us modal ka state update hoga
    }));
  };

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

  const Urls = apiUrl();
  return (
    <AppContext.Provider value={{
      toggleModal,
      modals,
      toggleStep,
      steps,
      Urls,
      postData,
      handleCategoryClick,

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

      navigate,

      bodyLoaderShow,
      setbodyLoaderShow,
      
    }}>
      {children}
      <BodyLoader />
      <LoginModal />
    </AppContext.Provider>
    
  );
};
