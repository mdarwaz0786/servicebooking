import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // ✅ Global state yahan banao
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("light");

  

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
      steps
    }}>
      {children}
    </AppContext.Provider>
  );
};
