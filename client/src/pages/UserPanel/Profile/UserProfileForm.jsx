import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

import Select2Multiple from "../../../components/Select2/Select2Multiple";

const UserProfileForm = () => {

    const { Urls, postData, generateUniqueId, imageCheck, formatDate, categoryListData, bodyLoaderShow } = useContext(AppContext);
    const fetchData = async () => {
        try {
            let userId = generateUniqueId();
            const response = await postData({}, Urls.myManProfileDetail, "GET", 1, 1); 
            if(response.success)
            {
                setFormData((prev) => ({
                    ...prev,
                    profileImagePreview: imageCheck(response.data.profileImage),                    
                    
                    name: response.data.name,
                    email: response.data.email,
                    dob: response.data.dob,
                    mobile: response.data.mobile,
                }));
            }

        } catch (error) {
            console.error("Cart API Error:", error);
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    const [formData, setFormData] = useState({
        categoryIds: [],
        name: "",
        email: "", 
        dob: "",
        mobile: "",
        profileImage: null,
        profileImagePreview: "",        
    });

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            let userId = generateUniqueId();
            const response = await postData(formData, Urls.myManProfileUpdate, "POST", 0, 0,1); 
            if(response.success)
            {
                
            }

        } catch (error) {
            console.error("Cart API Error:", error);
        }


        // Submit logic here (API call, etc.)
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };
    const handleCategoryChange = (selectedIds) => {
        setFormData(prev => ({
            ...prev,
            categoryIds: selectedIds
        }));
    };

    // ✅ File change handler with preview 
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            
            // File ko base64 string me convert karte hain
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    [name]: file,                // Actual file upload ke liye
                    [`${name}Preview`]: reader.result // ✅ Base64 preview
                }));
            };
    
            reader.readAsDataURL(file); // Base64 me read
        }
    };


  
    return (
        <>



            <>
                
                    <div className="col-xxl-8 col-lg-8">
                        <div className="row">
                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-1">
                                <h4>Profile</h4>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-0">
                            <div className="modal-body">
                                <div className="row">


                                    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date Of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            className="form-control"
                                            value={formatDate(formData.dob)}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Reference Name 1</label>
                                        <input
                                            type="text"
                                            name="mobile"
                                            className="form-control"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    
                                    
                                    

                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Profile Image</label>
                                        <div className="file-upload drag-file w-100 d-flex align-items-center justify-content-center flex-column mb-2 border p-3 rounded">
                                            <span className="upload-img d-block mb-2">
                                                <i className="ti ti-upload text-dark"></i>
                                            </span>
                                            <p className="mb-0 text-center fs-16 text-dark">
                                                Drag or Click here to Upload documents
                                            </p>
                                            <p className="text-center fs-14">
                                                Document file size should not exceed 5MB
                                            </p>
                                            <input
                                                type="file"
                                                name="profileImage"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.profileImagePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.profileImagePreview}
                                                    alt="preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: 150 }}
                                                />                                                    
                                            </div>
                                        )}
                                    </div>

                                   
                                   








                                </div>

                                {/* Submit Button */}
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                

            </>








        </>
    );
};

export default UserProfileForm;