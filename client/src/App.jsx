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
import UserAddressPage from "./pages/UserPanel/Address/UserAddressPage";
import UserBookingDetailPage from "./pages/UserPanel/Booking/UserBookingDetailPage";
import UserFavouritesPage from "./pages/UserPanel/Favourites/UserFavouritesPage";
import UserWalletPage from "./pages/UserPanel/Wallet/UserWalletPage";
import UserReviewsPage from "./pages/UserPanel/Reviews/UserReviewsPage";
import SubCategoriesPage from "./pages/SubCategories/SubCategoriesPage";
import Checkoutpage from "./pages/Checkout/Checkoutpage";
import Test from "../Test";


import ServiceManLayout from "./pages/ServiceManPanel/ServiceManLayout";
import ServiceManBookingPage from "./pages/ServiceManPanel/Booking/ServiceManBookingPage";
import KycForm from "./pages/ServiceManPanel/Kyc/KycForm";
import ProfileForm from "./pages/ServiceManPanel/Profile/ProfileForm";
import ServiceManDashboard from "./pages/ServiceManPanel/Dashboard/ServiceManDashboard";

import ServiceManReviewPage from "./pages/ServiceManPanel/Review/ServiceManReviewPage";





const App = () => {
 

  return (
    
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/services/:slug" element={<ServicesPage />} />
          <Route path="/service-details" element={<ServicesDetailsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/sub-categories/:slug/:id" element={<SubCategoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/provider-details" element={<ProviderDetailsPage />} />
          <Route path="/Checkout" element={<Checkoutpage />} />
          <Route path="/test" element={<Test />} />
        </Route>

        
        <Route element={<UserLayout />}>
          <Route path="/user" element={<UserBookingPage />} />
          <Route path="/user/booking/:bookingId" element={<UserBookingDetailPage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/address" element={<UserAddressPage />} />
          <Route path="/user/reviews" element={<UserReviewsPage />} />
          <Route path="/user-favourites" element={<UserFavouritesPage />} />
          <Route path="/user-wallet" element={<UserWalletPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />


        <Route element={<ServiceManLayout />}>
          <Route path="/serviceman/dashboard" element={<ServiceManDashboard />} />
          <Route path="/serviceman/booking" element={<ServiceManBookingPage />} />
          <Route path="/user/booking/:bookingId" element={<UserBookingDetailPage />} />
          <Route path="/serviceman/profile" element={<ProfileForm />} />
          <Route path="/serviceman/kyc" element={<KycForm />} />

          <Route path="/serviceman/reviews" element={<ServiceManReviewPage />} />
          <Route path="/user-favourites" element={<UserFavouritesPage />} />
          <Route path="/user-wallet" element={<UserWalletPage />} />
        </Route>



      </Routes>

      

    
  );
};

export default App;
