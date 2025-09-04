import React from "react";
import BookingSidebar from "./BookingSidebar";
import LocationBooking from "./LocationBooking";
import AdditionalServices from "./AdditionalServices";
import BookingDateTime from "./BookingDateTime";
import PersonalInformation from "./PersonalInformation";
import Cart from "./Cart";
import PaymentMethod from "./PaymentMethod";
import Confirmation from "./Confirmation";


const Checkoutpage = () => {
  return (
    <div className="page-wrapper">
		<div className="content">
			<div className="container">

				
				<div className="row">
					<div className="col-xxl-10 col-xl-11 mx-auto">
						<div className="card border-0 mb-0">
							<div className="card-body p-3 fieldset-wizard ">
								<div className="row">
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
