import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CategoryListPage from "./pages/Category/CategoryListPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AddServicePage from "./pages/Service/AddServicePage";
import ServiceListPage from "./pages/Service/ServiceListPage";
import AddCategoryPage from "./pages/Category/AddCategoryPage";
import BookingPage from "./pages/Booking/BookingPage";
import LoginPage from "./pages/auth/LoginPage";
import UpdateCategoryPage from "./pages/Category/UpdateCategoryPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/add-category" element={<AddCategoryPage />} />
        <Route path="/update-category/:id" element={<UpdateCategoryPage />} />
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/add-service" element={<AddServicePage />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
