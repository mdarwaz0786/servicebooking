import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

const ServiceManDashboard = () => {

    const { Urls, postData, generateUniqueId, imageCheck, formatDate } = useContext(AppContext);
    const fetchData = async () => {
        try {
            let userId = generateUniqueId();
            const response = await postData({}, Urls.serviceManProfileDetail, "GET", 1, 1); 
            if(response.success)
            {
                setFormData((prev) => ({
                    ...prev,
                    profileImagePreview: imageCheck(response.data.profileImage),
                    
                    categoryIds: response.data.categoryIds,
                    name: response.data.name,
                    email: response.data.email,
                    dob: response.data.dob,
                    experienceLevel: response.data.experienceLevel,
                    companyName: response.data.companyName,
                    yearOfExperience: response.data.yearOfExperience,
                    permanentAddress: response.data.permanentAddress,
                    currentAddress: response.data.currentAddress,
                    referenceName1: response.data.referenceName1,
                    referenceMobile1: response.data.referenceMobile1,
                    referenceName2: response.data.referenceName2,
                    referenceMobile2: response.data.referenceMobile2,                    
                }));
            }

        } catch (error) {
            console.error("Cart API Error:", error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const stats = [
        {
          title: "Upcoming Appointments",
          count: 12,
          change: 12,
          changeType: "up", // up | down
          bg: "info",
        },
        {
          title: "Completed Appointments",
          count: 68,
          change: 12,
          changeType: "down",
          bg: "success",
        },
        {
          title: "Canceled Appointments",
          count: 8,
          change: 0,
          changeType: "down",
          bg: "danger",
        },
      ];
    return (
        <>
           



            <>
                <div className="row justify-content-center">
                <div className="col-xxl-3 col-md-12">
                    <div className="row flex-fill">
                        {stats.map((item, i) => (
                        <div className="col-4" key={i}>
                            <div className="card prov-widget">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                <div className="mb-2">
                                    <p className="mb-1">{item.title}</p>
                                    <h5>
                                    <span className="counter animated fadeInDownBig">
                                        {item.count}
                                    </span>
                                    +
                                    </h5>
                                </div>
                                <span
                                    className={`prov-icon bg-${item.bg} d-flex justify-content-center align-items-center rounded`}
                                >
                                    <i className="ti ti-calendar-check"></i>
                                </span>
                                </div>
                                <p className="fs-12">
                                <span
                                    className={`me-2 text-${
                                    item.changeType === "up" ? "success" : "danger"
                                    }`}
                                >
                                    {item.change}%{" "}
                                    {item.changeType === "up" ? (
                                    <i className="ti ti-arrow-badge-up-filled"></i>
                                    ) : (
                                    <i className="ti ti-arrow-badge-down-filled"></i>
                                    )}
                                </span>
                                from Last Week
                                </p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

            </>








        </>
    );
};

export default ServiceManDashboard;