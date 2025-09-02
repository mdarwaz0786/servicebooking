const ContactUsPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Contact Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="breadcrumb-bg">
            <img src="assets/img/bg/breadcrumb-bg-01.png" className="breadcrumb-bg-1" alt="Img" />
            <img src="assets/img/bg/breadcrumb-bg-02.png" className="breadcrumb-bg-2" alt="Img" />
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="contacts">
              <div className="contacts-overlay-img d-none d-lg-block">
                <img src="assets/img/bg/bg-07.png" alt="img" className="img-fluid" />
              </div>
              <div className="contacts-overlay-sm d-none d-lg-block">
                <img src="assets/img/bg/bg-08.png" alt="img" className="img-fluid" />
              </div>
              {/* Contact Details */}
              <div className="contact-details">
                <div className="row justify-content-center">
                  <div className="col-md-6 col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <span className="rounded-circle"><i className="ti ti-phone text-primary" /></span>
                          <div>
                            <h6 className="fs-18 mb-1">Phone Number</h6>
                            <p className="fs-14">(888) 888-8888</p>
                            <p className="fs-14">(123) 456-7890</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <span className="rounded-circle"><i className="ti ti-mail text-primary" /></span>
                          <div>
                            <h6 className="fs-18 mb-1">Email Address</h6>
                            <p className="fs-14"><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a0d4d2d5c5ccd9d3c5cccce0c5d8c1cdd0ccc58ec3cfcd">[email&nbsp;protected]</a></p>
                            <p className="fs-14"><a href="https://truelysell.dreamstechnologies.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="fc969394928f91958894bc99849d918c9099d29f9391">[email&nbsp;protected]</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 d-flex">
                    <div className="card flex-fill">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <span className="rounded-circle"><i className="ti ti-map-pin text-primary" /></span>
                          <div>
                            <h6 className="fs-18 mb-1">Address</h6>
                            <p className="fs-14">367 Hillcrest Lane, Irvine, California,
                              United States</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Contact Details */}
              {/* Get In Touch */}
              <div className="row">
                <div className="col-md-6 d-flex align-items-center">
                  <div className="contact-img flex-fill">
                    <img src="assets/img/services/service-76.jpg" className="img-fluid" alt="img" />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                  <div className="contact-queries flex-fill">
                    <h2>Get In Touch</h2>
                    <form action="https://truelysell.dreamstechnologies.com/html/template/contact-us.html">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="form-group">
                              <input className="form-control" type="text" placeholder="Your Name" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="form-group">
                              <input className="form-control" type="email" placeholder="Your Email Address" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <div className="form-group">
                              <input className="form-control" type="text" placeholder="Your Phone Number" />
                            </div>
                          </div>
                          <div className="mb-3">
                            <select className="select">
                              <option>Select Services</option>
                              <option>Car Repair</option>
                              <option>Interior Designing</option>
                              <option>House Cleaning</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <div className="form-group">
                              <textarea className="form-control" placeholder="Type Message" id="floatingTextarea" defaultValue={""} />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 submit-btn">
                          <button className="btn btn-dark d-flex align-items-center " type="submit">Send Message<i className="feather-arrow-right-circle ms-2" /></button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* /Get In Touch */}
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="map-grid">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="contact-map" />
        </div>
        {/* /Map */}
      </div>
      {/* /Page Wrapper */}
    </>
  );
};

export default ContactUsPage;