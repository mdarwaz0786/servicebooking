const UserBookingPage = () => {
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
      <div className="card shadow-none booking-list">
        <div className="card-body d-md-flex align-items-center">
          <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
            <div className="booking-img me-sm-3 mb-3 mb-sm-0">
              <a href="booking-details.html" className="avatar">
                <img src="assets/img/services/service-08.jpg" alt="User Image" />
              </a>
              <div className="fav-item">
                <a href="javascript:void(0)" className="fav-icon">
                  <i className="feather-heart" />
                </a>
              </div>
            </div>
            <div className="booking-det-info">
              <h6 className="mb-3">
                <a href="booking-details.html">Computer Services </a><span className="badge badge-soft-danger ms-2">Cancelled</span>
              </h6>
              <ul className="booking-details">
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Booking Date</span> <small className="me-2">: </small>27 Sep, 17:00-18:00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Amount</span> <small className="me-2">: </small> $100.00<span className="badge badge-soft-primary ms-2">Paypal</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Location</span> <small className="me-2">: </small>Newyork, USA
                </li>
                <li className="d-flex align-items-center flex-wrap">
                  <span className="book-item">Provider</span> <small className="me-2">: </small>
                  <div className="user-book d-flex align-items-center flex-wrap me-2">
                    <div className="avatar avatar-xs me-2">
                      <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                    </div>
                    John Doe
                  </div>
                  <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f990979f96b9939691979d969cd79a9694">[email&nbsp;protected]</a></p>
                  <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 888 888 8888</p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <a href="booking.html" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#reschedule">Reschedule</a>
          </div>
        </div>
      </div>
      <div className="card shadow-none booking-list">
        <div className="card-body d-md-flex align-items-center">
          <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
            <div className="booking-img me-sm-3 mb-3 mb-sm-0">
              <a href="booking-details.html" className="avatar">
                <img src="assets/img/services/service-09.jpg" alt="User Image" />
              </a>
              <div className="fav-item">
                <a href="javascript:void(0)" className="fav-icon">
                  <i className="feather-heart" />
                </a>
              </div>
            </div>
            <div className="booking-det-info">
              <h6 className="mb-3">
                <a href="booking-details.html">Car Repair Services</a><span className="badge badge-soft-success ms-2">Completed</span>
              </h6>
              <ul className="booking-details">
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Booking Date</span> <small className="me-2">: </small>23 Sep 2022,
                  10:00-11:00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Amount</span> <small className="me-2">: </small> $50.00<span className="badge badge-soft-primary ms-2">COD</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Location</span> <small className="me-2">: </small>Alabama, USA
                </li>
                <li className="d-flex align-items-center flex-wrap">
                  <span className="book-item">Provider</span> <small className="me-2">: </small>
                  <div className="user-book d-flex align-items-center flex-wrap me-2">
                    <div className="avatar avatar-xs me-2">
                      <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                    </div>
                    John Smith
                  </div>
                  <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="7b12151d143b111413150816120f1355181416">[email&nbsp;protected]</a></p>
                  <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 607-276-5393</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <a href="booking.html" className="btn btn-dark me-2">Rebook</a>
              <a href="booking.html" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-review"><i className="ti ti-circle-plus me-2" />Add Review</a>
            </div>
            <div className="view-action mt-3 mb-0 me-0 ms-0">
              <div className="rating">
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
              </div>
              <a href="booking-details.html" className="text-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-none booking-list">
        <div className="card-body d-md-flex align-items-center">
          <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
            <div className="booking-img me-sm-3 mb-3 mb-sm-0">
              <a href="booking-details.html" className="avatar">
                <img src="assets/img/services/service-10.jpg" alt="User Image" />
              </a>
              <div className="fav-item">
                <a href="javascript:void(0)" className="fav-icon">
                  <i className="feather-heart" />
                </a>
              </div>
            </div>
            <div className="booking-det-info">
              <h6 className="mb-3">
                <a href="booking-details.html">Interior Designing</a><span className="badge badge-soft-info ms-2">Inprogress</span>
              </h6>
              <ul className="booking-details">
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Booking Date</span> <small className="me-2">: </small>22 Sep 2022,
                  11:00-12:00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Amount</span> <small className="me-2">: </small> $50.00<span className="badge badge-soft-primary ms-2">Paypal</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Location</span> <small className="me-2">: </small>Washington, DC, USA
                </li>
                <li className="d-flex align-items-center flex-wrap">
                  <span className="book-item">Provider</span> <small className="me-2">: </small>
                  <div className="user-book d-flex align-items-center flex-wrap me-2">
                    <div className="avatar avatar-xs me-2">
                      <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                    </div>
                    Quentin
                  </div>
                  <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="81e8efe7eec1f0f4e4eff5e8efafe2eeec">[email&nbsp;protected]</a></p>
                  <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 601-810-9218</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <a href="user-chat.html" className="btn btn-dark me-2"><i className="ti ti-message-2 me-2" />Chat</a>
              <a href="booking.html" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#cancel_appointment">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-none booking-list">
        <div className="card-body d-md-flex align-items-center">
          <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
            <div className="booking-img me-sm-3 mb-3 mb-sm-0">
              <a href="booking-details.html" className="avatar">
                <img src="assets/img/services/service-11.jpg" alt="User Image" />
              </a>
              <div className="fav-item">
                <a href="javascript:void(0)" className="fav-icon">
                  <i className="feather-heart" />
                </a>
              </div>
            </div>
            <div className="booking-det-info">
              <h6 className="mb-3">
                <a href="booking-details.html">Interior Designing</a><span className="badge badge-soft-info ms-2">Inprogress</span>
              </h6>
              <ul className="booking-details">
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Booking Date</span> <small className="me-2">: </small>22 Sep 2022,
                  11:00-12:00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Amount</span> <small className="me-2">: </small> $50.00<span className="badge badge-soft-primary ms-2">Paypal</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Location</span> <small className="me-2">: </small>Washington, DC, USA
                </li>
                <li className="d-flex align-items-center flex-wrap">
                  <span className="book-item">Provider</span> <small className="me-2">: </small>
                  <div className="user-book d-flex align-items-center flex-wrap me-2">
                    <div className="avatar avatar-xs me-2">
                      <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                    </div>
                    Quentin
                  </div>
                  <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="b5dcdbd3daf5c4c0d0dbc1dcdb9bd6dad8">[email&nbsp;protected]</a></p>
                  <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 601-810-9218</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <a href="user-chat.html" className="btn btn-dark me-2"><i className="ti ti-message-2 me-2" />Chat</a>
              <a href="booking.html" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#cancel_appointment">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-none booking-list mb-0">
        <div className="card-body d-md-flex align-items-center">
          <div className="booking-widget d-sm-flex align-items-center row-gap-3 flex-fill  mb-3 mb-md-0">
            <div className="booking-img me-sm-3 mb-3 mb-sm-0">
              <a href="booking-details.html" className="avatar">
                <img src="assets/img/services/service-12.jpg" alt="User Image" />
              </a>
              <div className="fav-item">
                <a href="javascript:void(0)" className="fav-icon">
                  <i className="feather-heart" />
                </a>
              </div>
            </div>
            <div className="booking-det-info">
              <h6 className="mb-3">
                <a href="booking-details.html">Car Repair Services</a><span className="badge badge-soft-success ms-2">Completed</span>
              </h6>
              <ul className="booking-details">
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Booking Date</span> <small className="me-2">: </small>23 Sep 2022,
                  10:00-11:00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Amount</span> <small className="me-2">: </small> $50.00<span className="badge badge-soft-primary ms-2">COD</span>
                </li>
                <li className="d-flex align-items-center mb-2">
                  <span className="book-item">Location</span> <small className="me-2">: </small>Alabama, USA
                </li>
                <li className="d-flex align-items-center flex-wrap">
                  <span className="book-item">Provider</span> <small className="me-2">: </small>
                  <div className="user-book d-flex align-items-center flex-wrap me-2">
                    <div className="avatar avatar-xs me-2">
                      <img className="avatar-img rounded-circle" alt="User Image" src="assets/img/profiles/avatar-02.jpg" />
                    </div>
                    John Smith
                  </div>
                  <p className="mb-0 me-2"><i className="ti ti-point-filled fs-10 text-muted me-2" /><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="fb92959d94bb919493958896928f93d5989496">[email&nbsp;protected]</a></p>
                  <p><i className="ti ti-point-filled fs-10 text-muted me-2" />+1 607-276-5393</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <a href="booking.html" className="btn btn-dark me-2">Rebook</a>
              <a href="booking.html" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-review"><i className="ti ti-circle-plus me-2" />Add Review</a>
            </div>
            <div className="view-action mt-3 mb-0 me-0 ms-0">
              <div className="rating">
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
                <i className="fas fa-star filled" />
              </div>
              <a href="booking-details.html" className="text-primary">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingPage;