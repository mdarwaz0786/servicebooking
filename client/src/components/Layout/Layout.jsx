import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton";
import Meta from "../Meta/meta";



const Layout = () => { 
  return (
    <>
      
      
      <Meta />

      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Outlet />          
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>

    </>
  );
};

export default Layout;
