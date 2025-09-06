const AddCategoryPage = () => {
  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Add Category</h5>
          </div>

          <div className="card-body">
            <form>
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" />
              </div>

              {/* Category Slug */}
              <div className="mb-3">
                <label className="form-label me-1">Category Slug</label>
                <small className="form-text text-muted">(Ex: test-slug)</small>
                <input type="text" className="form-control" />
              </div>

              {/* Category Image */}
              <div className="mb-3">
                <label className="form-label">Category Image</label>
                <div className="form-uploads">
                  <div className="form-uploads-path">
                    <img src="assets/img/icons/upload.svg" alt="upload" />
                    <div className="file-browse">
                      <h6>Drag &amp; drop image or </h6>
                      <div className="file-browse-path">
                        <input type="file" />
                        <a href="#"> Browse</a>
                      </div>
                    </div>
                    <h5>Supported formats: JPEG, PNG</h5>
                  </div>
                </div>
              </div>

              {/* Is Featured */}
              <div className="mb-4">
                <label className="form-label">Is Featured?</label>
                <ul className="custom-radiosbtn">
                  <li>
                    <label className="radiossets">
                      Yes
                      <input type="radio" defaultChecked name="featured" />
                      <span className="checkmark-radio" />
                    </label>
                  </li>
                  <li>
                    <label className="radiossets">
                      No
                      <input type="radio" name="featured" />
                      <span className="checkmark-radio" />
                    </label>
                  </li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="text-end">
                <button type="reset" className="btn btn-secondary me-2">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
