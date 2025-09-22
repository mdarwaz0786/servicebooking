import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./context/AppContext";

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
