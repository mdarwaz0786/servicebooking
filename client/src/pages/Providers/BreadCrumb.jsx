const BreadCrumb = () => {
  return (
    <div className="breadcrumb-bar text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <h2 className="breadcrumb-title mb-2">Providers</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><a href="index.html"><i className="ti ti-home-2" /></a></li>
                <li className="breadcrumb-item active" aria-current="page">Providers</li>
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
  );
};

export default BreadCrumb;