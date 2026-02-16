import { Outlet } from "react-router-dom";
import Sidebar from "./UserSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import LoginForm from "../Login/LoginForm";

const UserLayout = () => {
  const { Urls, postData, user, toggleStep, isLoading: contextLoading } = useContext(AppContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Small delay to ensure user state is properly loaded
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Loading Skeleton for User Layout
  const LayoutSkeleton = () => (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper m-0 p-0">
          <div className="content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-3">
                  {/* Sidebar Skeleton */}
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center mb-4">
                        <Skeleton circle width={80} height={80} />
                        <Skeleton width={120} height={20} className="mt-2" />
                        <Skeleton width={100} height={15} />
                      </div>
                      <div className="nav flex-column nav-pills">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <Skeleton key={item} height={45} className="mb-2" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  {/* Content Skeleton */}
                  <div className="card">
                    <div className="card-body">
                      <Skeleton height={40} width={200} className="mb-4" />
                      <Skeleton height={20} count={5} className="mb-2" />
                      <Skeleton height={150} className="my-4" />
                      <Skeleton height={20} count={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  // Login Page Skeleton
  const LoginSkeleton = () => (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper m-0 p-0">
          <div className="content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4" style={{ margin: '0 auto' }}>
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center mb-4">
                        <Skeleton circle width={60} height={60} className="mx-auto" />
                        <Skeleton width={150} height={25} className="mt-3 mx-auto" />
                        <Skeleton width={200} height={15} className="mx-auto" />
                      </div>
                      <Skeleton height={50} className="mb-3" />
                      <Skeleton height={50} className="mb-3" />
                      <Skeleton height={40} className="mb-3" />
                      <Skeleton height={40} width={120} className="mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  // Show loading skeleton while checking authentication
  if (isCheckingAuth || contextLoading) {
    return <LayoutSkeleton />;
  }

  // If user is logged in and has user role
  if (user?.role === 'user') {
    return (
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <div className="page-wrapper m-0 p-0">
            <div className="content">
              <div className="container">
                <div className="row justify-content-center">
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
  }

  // If user is not logged in or has different role
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <div className="page-wrapper m-0 p-0">
          <div className="content">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4" style={{ margin: '0 auto' }}>
                  <LoginForm />
                </div>
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