import { Link } from "react-router-dom";

const AddServicePage = () => {
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-lg-12 m-auto">
            <div className="progressbar-card">
              <ul id="progress-head">
                <li className="active">Add Service - Service Information</li>
                <li>Add Service - Availablity</li>
                <li>Add Service - Location</li>
                <li>Add Service - Gallery</li>
                <li>Add Service - SEO</li>
              </ul>
              <ul id="progressbar">
                <li className="active">
                  <div className="multi-step-icon">
                    <span><i className="far fa-check-circle" /></span>
                  </div>
                  <div className="multi-step-info">
                    <h6>Information</h6>
                  </div>
                </li>
                <li>
                  <div className="multi-step-icon">
                    <span><i className="far fa-clock" /></span>
                  </div>
                  <div className="multi-step-info">
                    <h6>Availability</h6>
                  </div>
                </li>
                <li>
                  <div className="multi-step-icon">
                    <span><i className="far fa-map" /></span>
                  </div>
                  <div className="multi-step-info">
                    <h6>Location</h6>
                  </div>
                </li>
                <li>
                  <div className="multi-step-icon">
                    <span><i className="far fa-images" /></span>
                  </div>
                  <div className="multi-step-info">
                    <h6>Gallery</h6>
                  </div>
                </li>
                <li>
                  <div className="multi-step-icon">
                    <span><i className="far fa-chart-bar" /></span>
                  </div>
                  <div className="multi-step-info">
                    <h6>SEO</h6>
                  </div>
                </li>
              </ul>
            </div>
            {/* Service Information */}
            <fieldset id="first-field">
              <div className="container-service space-service">
                <div className="sub-title">
                  <h6>Service Information</h6>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Provider</label>
                      <select className="select">
                        <option>Select Provider</option>
                        <option>Johnny</option>
                        <option>James</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Service Title</label>
                      <input type="text" className="form-control" placeholder />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Category</label>
                      <select className="select">
                        <option>Select Category</option>
                        <option>Car Wash</option>
                        <option>House Cleaning</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Sub Category</label>
                      <select className="select">
                        <option>Select Sub Category</option>
                        <option>car Repair</option>
                        <option>Plumbing</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group price">
                      <label>Price <span>Set 0 for free</span></label>
                      <input type="text" className="form-control" placeholder />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Duration</label>
                      <div className="form-duration">
                        <input type="text" className="form-control" placeholder />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group service-editor">
                      <label>Description</label>
                      <div id="editor" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-service">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="additional">
                      <div className="sub-title Service">
                        <h6>Additional Service</h6>
                      </div>
                      <div className="status-toggle float-sm-end mb-3">
                        <input type="checkbox" id="status_1" className="check" defaultChecked />
                        <label htmlFor="status_1" className="checktoggle">checkbox</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="addservice-info">
                  <div className="row service-cont">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Additional Service</label>
                        <input type="text" className="form-control" placeholder="Enter Service" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Price</label>
                        <input type="text" className="form-control" placeholder="Enter Price" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group tax">
                        <label>Duration <span>Include tax</span></label>
                        <input type="text" className="form-control" placeholder="Enter Service Duration" />
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/javascript:void(0);" className="link-sets add-extra"><i className="fa fa-plus-circle me-2" aria-hidden="true" />Add Additional Service</Link>
              </div>
              <div className="container-service space-service">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="video">
                      <div className="video-title">
                        <h6>Video</h6>
                      </div>
                    </div>
                    <div className="video-link">
                      <div className="form-group">
                        <label>Video Link</label>
                        <input type="text" className="form-control" placeholder="https://www.youtube.com/shorts/Lf-Z7H8bZ8o" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="bottom-btn">
                    <div className="field-btns">
                      <button className="btn btn-primary next_btn" type="button">Next <i className="fas fa-arrow-right" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            {/* /Service Information */}
            {/* Availablity*/}
            <fieldset>
              <div className="row">
                <div className="col-md-12">
                  <div className="available-section card-section ">
                    <div className="available-heading">
                      <h4>Availablity</h4>
                    </div>
                    {/* Timeslot */}
                    <div className="timeslot-sec availablt-time-slots">
                      {/* Schedule Nav */}
                      <label className="col-form-label">Configure Time Slots</label>
                      <div className="schedule-nav">
                        <ul className="nav">
                          <li className="nav-item">
                            <Link className="nav-link active" data-bs-toggle="tab" to="/#all_days">All Days</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_monday">Monday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_tuesday">Tuesday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_wednesday">Wednesday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_thursday">Thursday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_friday">Friday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_saturday">Saturday</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="tab" to="/#slot_sunday">Sunday</Link>
                          </li>
                        </ul>
                      </div>
                      {/* /Schedule Nav */}
                      <div className="tab-content pt-0">
                        <div className="tab-pane active" id="all_days">
                          <div className="hours-info">
                            <h4 className="nameof-day">All Days</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_monday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Monday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_tuesday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Tuesday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_wednesday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Wednesday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_thursday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Thursday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_friday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Friday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_saturday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Saturday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                        <div className="tab-pane fade" id="slot_sunday">
                          <div className="hours-info">
                            <h4 className="nameof-day">Sunday</h4>
                            <div className="row hours-cont">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>From</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label>To</label>
                                  <div className="form-availability-field">
                                    <input type="text" className="form-control timepicker" placeholder="Select Time" />
                                    <span className="cus-icon"><i className="fe fe-clock" /></span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group ">
                                  <label>Slots</label>
                                  <input type="text" className="form-control" placeholder="Enter Slot" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to="/#" className="link-sets add-text add-hours"><i className="fe fe-plus-circle" /> Add
                            More</Link>
                        </div>
                      </div>
                    </div>
                    {/* Timeslot */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="bottom-btn">
                    <div className="field-btns">
                      <button className="btn btn-prev prev_btn" type="button"><i className="fas fa-arrow-left" />
                        Prev</button>
                      <button className="btn btn-primary next_btn" type="button">Next <i className="fas fa-arrow-right" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            {/* /Availablity */}
            {/* Location */}
            <fieldset>
              <div className="addition-service card-section space-service">
                <div className="row">
                  <div className="col-md-12">
                    <div className="heading-service">
                      <h4>Location</h4>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Address</label>
                      <input type="text" className="form-control" placeholder="Enter Your Address" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Contry</label>
                      <input type="text" className="form-control" placeholder="Enter Sub Category" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>City</label>
                      <input type="text" className="form-control" placeholder="Enter Your City" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>State</label>
                      <input type="text" className="form-control" placeholder="Enter Your State" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Pincode</label>
                      <input type="text" className="form-control" placeholder="Enter Your Pincode" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Google Maps Place ID</label>
                      <input type="text" className="form-control" placeholder="Enter Maps Place ID" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Latitude</label>
                      <input type="text" className="form-control" placeholder="Enter Latitude Number" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Longitude</label>
                      <input type="text" className="form-control" placeholder="Enter Longitude Number" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="map-grid">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin" allowFullScreen aria-hidden="false" tabIndex={0} className="contact-map" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="bottom-btn">
                    <div className="field-btns">
                      <button className="btn btn-prev prev_btn" type="button"><i className="fas fa-arrow-left" />
                        Prev</button>
                      <button className="btn btn-primary next_btn" type="button">Next <i className="fas fa-arrow-right" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            {/* /Location */}
            {/* Gallery */}
            <fieldset>
              <div className="addition-service card-section ">
                <div className="heading-service">
                  <h4>Gallery</h4>
                </div>
                <div className="form-uploads">
                  <div className="form-uploads-path">
                    <img src="assets/img/icons/upload.svg" alt="img" />
                    <div className="file-browse">
                      <h6>Drag &amp; drop image or </h6>
                      <div className="file-browse-path">
                        <input type="file" />
                        <Link to="/javascript:void(0);"> Browse</Link>
                      </div>
                    </div>
                    <h5>Supported formates: JPEG, PNG</h5>
                  </div>
                </div>
                <div className="file-preview">
                  <label className="form-label">Select Default Image</label>
                  <ul className="gallery-selected-img">
                    <li>
                      <div className="img-preview">
                        <img src="assets/img/services/service-01.jpg" alt="Service Image" />
                        <Link to="/javascript:void(0);" className="remove-gallery"><i className="fe fe-trash-2" /></Link>
                      </div>
                      <label className="custom_check">
                        <input type="radio" name="gallery" defaultChecked />
                        <span className="checkmark" />
                      </label>
                    </li>
                    <li>
                      <div className="img-preview">
                        <img src="assets/img/services/service-02.jpg" alt="Service" />
                        <Link to="/javascript:void(0);" className="remove-gallery"><i className="fe fe-trash-2" /></Link>
                      </div>
                      <label className="custom_check">
                        <input type="radio" name="gallery" />
                        <span className="checkmark" />
                      </label>
                    </li>
                    <li>
                      <div className="img-preview">
                        <img src="assets/img/services/service-03.jpg" alt="Service Image" />
                        <Link to="/javascript:void(0);" className="remove-gallery"><i className="fe fe-trash-2" /></Link>
                      </div>
                      <label className="custom_check">
                        <input type="radio" name="gallery" />
                        <span className="checkmark" />
                      </label>
                    </li>
                    <li>
                      <div className="img-preview">
                        <img src="assets/img/services/service-04.jpg" className="img-fluid thumbnail" alt="image" />
                        <Link to="/javascript:void(0);" className="remove-gallery"><i className="fe fe-trash-2" /></Link>
                      </div>
                      <label className="custom_check">
                        <input type="radio" name="gallery" />
                        <span className="checkmark" />
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bottom-btn">
                <div className="field-btns">
                  <button className="btn btn-prev prev_btn" type="button"><i className="fas fa-arrow-left" /> Prev</button>
                  <button className="btn btn-primary next_btn" type="button">Next <i className="fas fa-arrow-right" /></button>
                </div>
              </div>
            </fieldset>
            {/* /Gallery */}
            {/* SEO */}
            <fieldset>
              <div className="addition-service card-section space-service">
                <div className="heading-service">
                  <h4>SEO</h4>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Meta Title (English)</label>
                      <input type="text" className="form-control" placeholder="Enter metatitle" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group meta-keys">
                      <label>Meta Keywords (English)</label>
                      <input className="input-tags form-control" type="text" data-role="tagsinput" name="specialist" placeholder="Enter keywords" id="specialist" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Meta Description (English)</label>
                      <textarea className="form-control" placeholder="Enter description" rows={5} defaultValue={""} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-btn">
                <div className="field-btns">
                  <button className="btn btn-prev prev_btn" type="button"><i className="fas fa-arrow-left" /> Prev</button>
                  <Link to="/services.html" className="btn btn-primary next_btn" data-bs-toggle="modal" data-bs-target="#successmodal">Save</Link>
                </div>
              </div>
            </fieldset>
            {/* /SEO */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServicePage;