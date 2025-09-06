// api.js (React Web Version)

// ✅ Base API URLs
export const apiUrl = () => {
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
export const storage = {
  set: (key, value) => localStorage.setItem(key, value),
  get: (key) => localStorage.getItem(key),
  delete: (key) => localStorage.removeItem(key),
};

// ✅ Get browser device info
export const getDeviceInfo = () => {
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
export const postData = async (
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

  if (!loaderShowHide && extraData?.loader) extraData.loader.setShowLoader(true);

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
    if (extraData?.loader) extraData.loader.setShowLoader(false);
    console.error('Failed to make API request:', error);
    return error;
  }
};

// ✅ Response Handler
export const responseCheck = async (response, extraData, messageAlert) => {
  try {
    let result = [];
    if ([200, 400, 401, 204].includes(response.status)) {
      result = await response.json();
    } else {
      result = response;
    }

    console.log('Response:', result);
    if (extraData?.loader) extraData.loader.setShowLoader(false);

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
export const showSuccessMessage = (message, extraData, type, messageAlert) => {
  if (!messageAlert && extraData?.alert) {
    extraData.alert.setAlertMessage(message);
    extraData.alert.setShowAlert(true);
    extraData.alert.setAlertType(type);
  } else {
    alert(message);
  }
};

// ✅ Convert File to Base64
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
