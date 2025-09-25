import { useContext, useEffect, useState } from "react";
import BookingListCard from "./BookingListCard";
import { AppContext } from "../../../context/AppContext";

const UserBookingPage = () => {

  const { Urls, postData, setmyserviceListData, generateUniqueId } = useContext(AppContext);
  const [page, setpage] = useState(1);
  const fetchData = async () => {
      try { 
        const response = await postData({page:page}, Urls.myBooking, "GET", 0, 1);    
        setmyserviceListData(response.data?response.data:[]);
      
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }

  const handlePagination = async (page) => {
      setpage(page);
  }
  
  useEffect(() => {  
  fetchData(); 
  }, [page]);  

  return (
    <div className="col-xl-9 col-lg-8">
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
        <h4>Booking List</h4>
        <div className="d-flex align-items-center">
          <p className="text-dark me-2 mb-0">Sort</p>
          <div className="dropdown me-2">
            <a href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown">
              Newly Added
            </a>
            <div className="dropdown-menu">
              <a href="javascript:void(0);" className="dropdown-item active">Newly Added</a>
              <a href="javascript:void(0);" className="dropdown-item">Oldest</a>
            </div>
          </div>
          <a href="user-bookings-calendar.html" className="tags d-flex justify-content-center align-items-center border rounded me-2"><i className="ti ti-calendar-month" /></a>
          <a href="javascript:void(0);" className="tags d-flex justify-content-center align-items-center border rounded"><i className="ti ti-filter" /></a>
        </div>
      </div>
      
      <BookingListCard handlePagination={handlePagination} />
      

    </div>
  );
};

export default UserBookingPage;