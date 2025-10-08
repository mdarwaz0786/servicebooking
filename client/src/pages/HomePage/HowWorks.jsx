
const HowWorks = () => {
  return (
    <section className="section" style={{background:'#F5F5F5'}}>
      <div className="container">
        <div className="work-section bg-black m-0">
          
          <div className="row gx-0">
            
            <div className="col-lg-8 d-flex p-3">

              <div className="row gx-0">
                <div className="col-12 m-0">
                  <h2 className="fs-22 mb-2 text-white" style={{fontWeight: '100'}}>Why Choose Us</h2>
                </div>
              
                <div className="text-start flex-fill">
                  <h6 className="text-white mb-2 fs-23">Green India Team: Your Trusted Team, Anytime</h6>
                  <p className="fs-13" style={{textAlign: 'justify'}}>At Green India Team, we believe in impeccably doing our work. That’s what produce us from other companies. We concentrate on doing our job in a good way, Whether it’s a regular day or a breaking point, we’re just a call out. We try to be there when our client need us most.</p>
                  <div className="row">

                    <div className="col-6">
                        <div className="why-icon-div">
                          <div><i className="fa fa-star"></i></div>
                          <div>
                            <p>4.8</p>
                            <span className="why-rating-text">Star Rating</span>
                          </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="why-icon-div">
                          <div><i className="fa fa-users"></i></div>
                          <div>
                            <p>10k+</p>
                            <span className="why-rating-text">Users</span>
                          </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="why-icon-div">
                          <div><i className="fa fa-arrow-right-arrow-left"></i></div>
                          <div>
                            <p>upto 180</p>
                            <span className="why-rating-text">Day Warrenty</span>
                          </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="why-icon-div">
                          <div><i className="fa fa-phone"></i></div>
                          <div>
                            <p>12/7</p>
                            <span className="why-rating-text">Support</span>
                          </div>
                        </div>
                    </div>
                    
                    


                  </div>                
                </div>
              </div>

            </div>
            <div className="col-lg-4 d-flex">
              <img src="assets/img/home/why-choose-us.jpg" alt="img" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HowWorks;