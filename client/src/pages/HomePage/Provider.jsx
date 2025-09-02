const Provider = () => {
  return (
    <section className="section provide-section bg-black">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <div className="section-header mb-md-0 mb-3">
              <p className="sub-title fw-medium text-light mb-1">Become a Provider</p>
              <h2 className="text-white">Post your service <span className="text-linear-primary">in a minute</span>
              </h2>
            </div>
          </div>
          <div className="col-md-6 text-md-end wow fadeInUp" data-wow-delay="0.2s">
            <a href="javascript:void(0);" className="btn btn-linear-primary"><i className="ti ti-user-filled me-2" />Join Us</a>
          </div>
        </div>
      </div>
      <div className="provider-bg1">
        <img src="assets/img/bg/provide-bg-01.svg" className="img-fluid" alt="img" />
      </div>
      <div className="provider-bg2">
        <img src="assets/img/bg/provide-bg-02.svg" className="img-fluid" alt="img" />
      </div>
    </section>
  );
};

export default Provider;