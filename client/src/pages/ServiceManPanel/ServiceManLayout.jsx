import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import LoginForm from "../Login/LoginForm";

const ServiceManLayout = () => {
  const { Urls, postData, user, toggleStep } = useContext(AppContext);
  return (
   

    <>
        {(user?.role=='serviceman')?(
            <>
                <Header/>
                <Sidebar/>
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <Outlet />
                    </div>
                </div>
            </>
        ):(
        <div className="col-md-4" style={{margin:'0 auto'}}>
            <LoginForm/>
        </div> 
        )}
    </>
   
            
  );
};

export default ServiceManLayout;
