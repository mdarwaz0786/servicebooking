import DashboardPage from "../pages/Dashboard/DashboardPage";
import CategoryListPage from "../pages/Category/CategoryListPage";
import AddCategoryPage from "../pages/Category/AddCategoryPage";
import UpdateCategoryPage from "../pages/Category/UpdateCategoryPage";
import ServiceListPage from "../pages/Service/ServiceListPage";
import AddServicePage from "../pages/Service/AddServicePage";
import BookingPage from "../pages/Booking/BookingPage";
import LoginPage from "../pages/auth/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage";

const routesConfig = {
  private: [
    { path: "/", element: DashboardPage },
    { path: "/categories", element: CategoryListPage },
    { path: "/add-category", element: AddCategoryPage },
    { path: "/update-category/:id", element: UpdateCategoryPage },
    { path: "/services", element: ServiceListPage },
    { path: "/add-service", element: AddServicePage },
    { path: "/bookings", element: BookingPage },
  ],
  public: [
    { path: "/login", element: LoginPage },
    { path: "/unauthorized", element: UnauthorizedPage },
    { path: "*", element: NotFoundPage },
  ],
};

export default routesConfig;
