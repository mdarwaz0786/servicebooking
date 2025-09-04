import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ServicesDetailsPage from "./pages/ServiceDetailsPage/ServicesDetailsPage";
import BookingPage from "./pages/Booking/BookingPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import SearchPage from "./pages/Search/SearchPage";
import ProvidersPage from "./pages/Providers/ProvidersPage";
import ProviderDetailsPage from "./pages/ProviderDetails/ProviderDetailsPage";
import UserLayout from "./pages/UserPanel/UserLayout";
import UserDashboard from "./pages/UserPanel/UserDashboard";
import UserBookingPage from "./pages/UserPanel/Booking/UserBookingPage";
import UserFavouritesPage from "./pages/UserPanel/Favourites/UserFavouritesPage";
import UserWalletPage from "./pages/UserPanel/Wallet/UserWalletPage";
import UserReviewsPage from "./pages/UserPanel/Reviews/UserReviewsPage";
import SubCategoriesPage from "./pages/SubCategories/SubCategoriesPage";
import Checkoutpage from "./pages/Checkout/Checkoutpage";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service-details" element={<ServicesDetailsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/sub-categories/:name/:id" element={<SubCategoriesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/provider-details" element={<ProviderDetailsPage />} />
        <Route path="/Checkout" element={<Checkoutpage />} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user-booking" element={<UserBookingPage />} />
        <Route path="/user-favourites" element={<UserFavouritesPage />} />
        <Route path="/user-wallet" element={<UserWalletPage />} />
        <Route path="/user-reviews" element={<UserReviewsPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
