
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


const Checkoutpage = () => {

  const { Urls, postData, user, toggleStep } = useContext(AppContext);

  useEffect(() => {
    toggleStep('location', true);
    toggleStep('additionalservice', false);
    toggleStep('datetime', false);
    toggleStep('personalinformation', false);
    toggleStep('cart', false);
    toggleStep('payment', false);
    toggleStep('confirmation', false);
  }, []);  


  return (
    <div className="page-wrapper">
		<div className="content">
			<div className="container">

				
				<div className="row">
					<div className="col-xxl-9 col-xl-11 mx-auto">
						<div className="card border-0 mb-0">
							<div className="card-body p-3 fieldset-wizard ">
								<div className="row">
                  
                  <>
                  {(user)?(
                    <>
                      <BookingSidebar />
                      <div className="col-lg-9">
                          <LocationBooking />
                          <AdditionalServices />
                          <BookingDateTime />
                          <PersonalInformation />
                          <Cart />
                          <PaymentMethod />
                          <Confirmation />
                      </div>
                    </>
                    ):(
                    <LoginForm/>
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
