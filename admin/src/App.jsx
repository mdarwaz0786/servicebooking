import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CategoryListPage from "./pages/Category/CategoryListPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AddServicePage from "./pages/Service/AddServicePage";
import ServiceListPage from "./pages/Service/ServiceListPage";
import AddCategoryPage from "./pages/Category/AddCategoryPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/add-service" element={<AddServicePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
