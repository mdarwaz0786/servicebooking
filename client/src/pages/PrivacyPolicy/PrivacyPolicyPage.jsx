import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const PrivacyPolicyPage = () => {

  const { Urls, postData, imageCheck, formatDate } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const response = await postData({}, Urls.privacyPolicy, "GET", 0, 1);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Detail Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="container my-5">
      <div className="col-md-10 mx-auto">
        <h4 className="fw-bold mb-3">{data.title}</h4>
        <p className="text-muted mb-4">Effective Date: {formatDate(data.effectiveDate)}</p>

        <div
            className="mt-1"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
