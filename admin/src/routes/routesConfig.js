import DashboardPage from "../pages/Dashboard/DashboardPage";
import CategoryListPage from "../pages/Category/CategoryListPage";
import AddCategoryPage from "../pages/Category/AddCategoryPage";
import UpdateCategoryPage from "../pages/Category/UpdateCategoryPage";
import ServiceListPage from "../pages/Service/ServiceListPage";
import AddServicePage from "../pages/Service/AddServicePage";
import BookingListPage from "../pages/Booking/BookingListPage";
import LoginPage from "../pages/Auth/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage";
import SubCategoryListPage from "../pages/SubCategory/SubCategoryListPage";
import AddSubCategoryPage from "../pages/SubCategory/AddSubCategoryPage";
import UpdateSubCategoryPage from "../pages/SubCategory/UpdateSubCategoryPage";
import SubSubCategoryListPage from "../pages/SubSubCategory/SubSubCategoryListPage";
import AddSubSubCategoryPage from "../pages/SubSubCategory/AddSubSubCategoryPage";
import UpdateSubSubCategoryPage from "../pages/SubSubCategory/UpdateSubSubCategoryPage";
import SubSubSubCategoryListPage from "../pages/SubSubSubCategory/SubSubSubCategoryListPage";
import AddSubSubSubCategoryPage from "../pages/SubSubSubCategory/AddSubSubSubCategoryPage";
import UpdateSubSubSubCategoryPage from "../pages/SubSubSubCategory/UpdateSubSubSubCategoryPage";
import UpdateServicePage from "../pages/Service/UpdateServicePage";
import TimeSlotListPage from "../pages/TimeSlot/TimeSlotListPage";
import AddTimeSlotPage from "../pages/TimeSlot/AddTimeSlotPage";
import UpdateTimeSlotPage from "../pages/TimeSlot/UpdateTimeSlotPage";
import BookingDetailPage from "../pages/Booking/BookingDetailPage";
import UserListPage from "../pages/User/UserListPage";
import KycListPage from "../pages/Kyc/KycListPage";
import TrainingScheduleListPage from "../pages/TrainingSchedule/TrainingScheduleListPage";
import EarningListPage from "../pages/Earning/EarningListPage";
import ServicemanProfileListPage from "../pages/ServicemanProfile/ServicemanProfileListPage";
import AddTrainingSchedulePage from "../pages/TrainingSchedule/AddTrainingSchedulePage";
import UpdateTrainingSchedulePage from "../pages/TrainingSchedule/UpdateTrainingSchedulePage";
import AddEarningPage from "../pages/Earning/AddEarningPage";
import UpdateEarningPage from "../pages/Earning/UpdateEarningPage";
import KycDetailsPage from "../pages/Kyc/KycDetailPage";
import ServicemanProfileDetailPage from "../pages/ServicemanProfile/ServicemanProfileDetailPage";
import HomeBannerListPage from "../pages/HomeBanner/HomeBannerListPage";
import AddHomeBannerPage from "../pages/HomeBanner/AddHomeBannerPage";
import UpdateHomeBannerPage from "../pages/HomeBanner/UpdateHomeBannerPage";
import HomeServiceListPage from "../pages/HomeService/HomeServiceListPage";
import AddHomeServicePage from "../pages/HomeService/AddHomeServicePage";
import UpdateHomeServicePage from "../pages/HomeService/UpdateHomeServicePage";
import HomeSliderListPage from "../pages/HomeSlider/HomePageSliderListPage";
import AddHomeSliderPage from "../pages/HomeSlider/AddHomeSliderPage";
import UpdateHomeSliderPage from "../pages/HomeSlider/UpdateHomeSliderPage";
import TransactionListPage from "../pages/Transaction/TransactionListPage";
import AddServiceIncludedPage from "../pages/ServiceIncluded/AddServiceIncludedPage";
import UpdateServiceIncludedPage from "../pages/ServiceIncluded/UpdateServiceIncludedPage";
import ServiceIncludedListPage from "../pages/ServiceIncluded/ServiceIncludedListPage";
import RequirementFromCustomerListPage from "../pages/RequirementFromCustomer/RequirementFromCustomerListPage";
import AddRequirementFromCustomerPage from "../pages/RequirementFromCustomer/AddRequirementFromCustomerPage";
import UpdateRequirementFromCustomerPage from "../pages/RequirementFromCustomer/UpdateRequirementFromCustomerPage";
import AddWhyChooseUsPage from "../pages/WhyChooseUs/AddWhyChooseUsPage";
import AddExpertTechnicianPage from "../pages/ExportTechnician/AddExpertTechnicianPage";
import AddBrandLogoPage from "../pages/BrandLogo/AddBrandLogoPage";
import AddGIPromisePage from "../pages/GiPromise/AddGIPromisePage";

const routesConfig = {
  private: [
    { path: "/", element: DashboardPage },
    { path: "/categories", element: CategoryListPage },
    { path: "/add-category", element: AddCategoryPage },
    { path: "/update-category/:id", element: UpdateCategoryPage },

    { path: "/sub-categories", element: SubCategoryListPage },
    { path: "/add-sub-category", element: AddSubCategoryPage },
    { path: "/update-sub-category/:id", element: UpdateSubCategoryPage },

    { path: "/sub-sub-categories", element: SubSubCategoryListPage },
    { path: "/add-sub-sub-category", element: AddSubSubCategoryPage },
    { path: "/update-sub-sub-category/:id", element: UpdateSubSubCategoryPage },

    { path: "/sub-sub-sub-categories", element: SubSubSubCategoryListPage },
    { path: "/add-sub-sub-sub-category", element: AddSubSubSubCategoryPage },
    { path: "/update-sub-sub-sub-category/:id", element: UpdateSubSubSubCategoryPage },

    { path: "/services", element: ServiceListPage },
    { path: "/add-service", element: AddServicePage },
    { path: "/update-service/:id", element: UpdateServicePage },

    { path: "/time-slots", element: TimeSlotListPage },
    { path: "/add-time-slot", element: AddTimeSlotPage },
    { path: "/update-time-slot/:id", element: UpdateTimeSlotPage },

    { path: "/bookings", element: BookingListPage },
    { path: "/booking-detail/:id", element: BookingDetailPage },

    { path: "/transactions", element: TransactionListPage },

    { path: "/kyc", element: KycListPage },
    { path: "/kyc-detail", element: KycDetailsPage },

    { path: "/training-schedule", element: TrainingScheduleListPage },
    { path: "/add-training-schedule", element: AddTrainingSchedulePage },
    { path: "/update-training-schedule/:id", element: UpdateTrainingSchedulePage },

    { path: "/earning", element: EarningListPage },
    { path: "/add-earning", element: AddEarningPage },
    { path: "/update-earning/:id", element: UpdateEarningPage },

    { path: "/service-man-profile", element: ServicemanProfileListPage },
    { path: "/service-man-profile-detail", element: ServicemanProfileDetailPage },

    { path: "/home-banner", element: HomeBannerListPage },
    { path: "/add-home-banner", element: AddHomeBannerPage },
    { path: "/update-home-banner/:id", element: UpdateHomeBannerPage },

    { path: "/home-slider", element: HomeSliderListPage },
    { path: "/add-home-slider", element: AddHomeSliderPage },
    { path: "/update-home-slider/:id", element: UpdateHomeSliderPage },

    { path: "/home-service", element: HomeServiceListPage },
    { path: "/add-home-service", element: AddHomeServicePage },
    { path: "/update-home-service/:id", element: UpdateHomeServicePage },

    { path: "/service-included", element: ServiceIncludedListPage },
    { path: "/add-service-included", element: AddServiceIncludedPage },
    { path: "/update-service-included/:id", element: UpdateServiceIncludedPage },

    { path: "/requirement-from-customer", element: RequirementFromCustomerListPage },
    { path: "/add-requirement-from-customer", element: AddRequirementFromCustomerPage },
    { path: "/update-requirement-from-customer/:id", element: UpdateRequirementFromCustomerPage },

    { path: "/add-why-choose-us", element: AddWhyChooseUsPage },

    { path: "/add-expert-technician", element: AddExpertTechnicianPage },

    { path: "/add-brand-logo", element: AddBrandLogoPage },

    { path: "/add-gi-promise", element: AddGIPromisePage },

    { path: "/users", element: UserListPage },
  ],
  public: [
    { path: "/login", element: LoginPage },
    { path: "/unauthorized", element: UnauthorizedPage },
    { path: "*", element: NotFoundPage },
  ],
};

export default routesConfig;
