import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
