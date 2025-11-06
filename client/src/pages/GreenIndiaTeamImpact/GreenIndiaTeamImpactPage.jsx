import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

const GreenIndiaTeamImpactPage = () => {

  const { Urls, postData, imageCheck, formatDate } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const response = await postData({}, Urls.GreenIndiaTeamImpact, "GET", 0, 1);
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
    <>
    <BreadCrumb data={{title:data.title}} />
    <div className="container my-5">
      <div className="col-md-10 mx-auto">

        <div
            className="mt-1"
            dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
      </div>
    </div>
    </>
  );
};

export default GreenIndiaTeamImpactPage;
