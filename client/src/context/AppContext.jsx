import { createContext, useState } from "react";
import { apiUrl, postData, storage, getDeviceInfo, responseCheck, showSuccessMessage, convertToBase64 } from "../components/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const Urls = apiUrl();
  

  const [modals, setModals] = useState({
    homeCategoryModal: false,
    modal2: false,
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

  return (
    <AppContext.Provider value={{
      toggleModal,
      modals,
      toggleStep,
      steps,
      Urls,
      postData
    }}>
      {children}
    </AppContext.Provider>
  );
};
