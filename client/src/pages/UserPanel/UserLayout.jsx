import { Outlet } from "react-router-dom";
import Sidebar from "./UserSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import LoginForm from "../Login/LoginForm";

const UserLayout = () => {
  const { Urls, postData, user, toggleStep } = useContext(AppContext);
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper m-0 p-0">
          <div className="content">
            <div className="container">
              <div className="row justify-content-center">

                <>
                  {(user?.role=='user')?(
                    <>
                      <Sidebar />
                      <Outlet />
                    </>
                    ):(
                    <div className="col-md-4" style={{margin:'0 auto'}}>
                      <LoginForm/>
                    </div> 
                  )}
                  </>
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
