import { useContext, useEffect, useState } from "react";
import BookingListCard from "./BookingListCard";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

const ServiceManBookingPage = () => {

  const { Urls, postData, setmyserviceListData, generateUniqueId } = useContext(AppContext);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(10);
  const fetchData = async () => {
      try { 

      let userId = generateUniqueId();

      const response = await postData({page:page,limit:limit}, Urls.serviceManBooking, "GET", 0, 1);
      
          setmyserviceListData(response.data?response.data:[]);
       
      } catch (error) { 
      console.error("Cart API Error:", error);
      }
  }
  const handlePagination = async (page, limit) => {
      setpage(page);
      if(limit) setlimit(limit);
  }
  
  useEffect(() => {  
    fetchData(); 
  }, [page, limit]);

  return (
    <>
      <div className="row">
        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
          <h4>Booking List</h4>
          <div className="d-flex align-items-center flex-wrap row-gap-3 w-100 justify-content-around">
          
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              New
            </Link>
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              Accepted
            </Link>
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              Rejected
            </Link>
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              Ongoing
            </Link>
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              Completed
            </Link>
            <Link              
              className="btn btn-dark d-flex align-items-center"
            >
              cancel
            </Link>

          </div>
        </div>
      </div>



      <>
        <div className="row justify-content-center"> 
          <div className="col-xxl-12 col-lg-12">
            
            <BookingListCard handlePagination={handlePagination} />
            
          </div>
        </div>
        
      </>








    </>
  );
};

export default ServiceManBookingPage;