import DashboardPage from "../pages/Dashboard/DashboardPage";
import CategoryListPage from "../pages/Category/CategoryListPage";
import AddCategoryPage from "../pages/Category/AddCategoryPage";
import UpdateCategoryPage from "../pages/Category/UpdateCategoryPage";
import ServiceListPage from "../pages/Service/ServiceListPage";
import AddServicePage from "../pages/Service/AddServicePage";
import BookingListPage from "../pages/Booking/BookingListPage";
import LoginPage from "../pages/auth/LoginPage";
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

    { path: "/users", element: UserListPage },
  ],
  public: [
    { path: "/login", element: LoginPage },
    { path: "/unauthorized", element: UnauthorizedPage },
    { path: "*", element: NotFoundPage },
  ],
};

export default routesConfig;
