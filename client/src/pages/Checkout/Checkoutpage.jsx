
import BookingSidebar from "./BookingSidebar";
import LocationBooking from "./LocationBooking";
import AdditionalServices from "./AdditionalServices";
import BookingDateTime from "./BookingDateTime";
import PersonalInformation from "./PersonalInformation";
import Cart from "./Cart";
import PaymentMethod from "./PaymentMethod";
import Confirmation from "./Confirmation";

import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import LoginForm from "../Login/LoginForm";
import { Link } from "react-router-dom";
import UserProfileForm from "../UserPanel/Profile/UserProfileForm";


const Checkoutpage = () => {

  const { Urls, postData, user, steps, toggleStep, cartAmount, bookingAmount, checkoutpageloading, setcheckoutpageloading } = useContext(AppContext);

  useEffect(() => {
    toggleStep('location', true);
    toggleStep('additionalservice', false);
    toggleStep('datetime', false);
    toggleStep('personalinformation', false);
    toggleStep('cart', false);
    toggleStep('payment', false);
    toggleStep('confirmation', false);

    
    
  }, []);  
  
  if(cartAmount.amount) setcheckoutpageloading(false);
  


  return (
    <div className="page-wrapper m-0">
		<div className="content">
			<div className="container">

				
				<div className="row">
					<div className={`${user?'col-xxl-9 col-xl-11':'col-md-4'} mx-auto`}>
						<div className="card border-0 mb-0">
							<div className="card-body p-3 fieldset-wizard ">
                
								<div className="row">
                      <>
                        {(!checkoutpageloading)?(
                          
                              <>
                              {(user)?(
                                <>

                              {(user?.name)?(                                
                                <>
                                {(cartAmount.amount)?(
                                  <>
                                      <BookingSidebar />
                                      <div className="col-lg-9">
                                        <LocationBooking />
                                        <AdditionalServices />
                                        <BookingDateTime />
                                        <PersonalInformation />
                                        <Cart />
                                        <PaymentMethod />
                                      </div>
                                    </>
                                    ):(
                                      <>
                                      {(bookingAmount.amount)?(
                                        <>
                                          <BookingSidebar />
                                          <div className="col-lg-9">
                                            <Confirmation />
                                          </div>
                                        </>
                                      ):(
                                        <>
                                          <h1 className="text-center mb-2">Cart is empty!</h1>
                                          <Link to={'/'} className="btn btn-primary" style={{width: 'fit-content',margin: '0 auto'}}>Go Home</Link>
                                        </>
                                      )}
                                      </>
                                    )}
                                 </>
                              ):(<>
                              <UserProfileForm />
                              </>)}
                                  
                                </>
                                    ):(
                                    <LoginForm/>
                              )}
                              </>                        
                          ):(
                          <div>

                          </div>
                        )}
                      </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default Checkoutpage;
