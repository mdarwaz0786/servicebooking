import { createRoot } from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter basename="/admin/">
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
    </BrowserRouter>
  </AuthProvider>
);
