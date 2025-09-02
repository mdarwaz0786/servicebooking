import { Outlet } from "react-router-dom";
import Sidebar from "./UserSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const UserLayout = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div class="page-wrapper">
          <div class="content">
            <div class="container">
              <div class="row justify-content-center">
                <Sidebar />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
