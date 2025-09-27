import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

const KycForm = () => {

    const { Urls, postData, generateUniqueId, imageCheck } = useContext(AppContext);
    const fetchData = async () => {
        try {
            let userId = generateUniqueId();
            const response = await postData({}, Urls.serviceMankycDetail, "GET", 1, 1); 
            if(response.success)
            {
                setFormData((prev) => ({
                    ...prev,
                    passbookOrChequePreview: imageCheck(response.data.passbookOrCheque),
                    panCardImagePreview: imageCheck(response.data.panCardImage),
                    aadharFrontImagePreview: imageCheck(response.data.aadharFrontImage),
                    aadharBackImagePreview: imageCheck(response.data.aadharBackImage),
                    shopImagePreview: imageCheck(response.data.shopImage),
                    
                    bankName: response.data.bankName,
                    branchName: response.data.branchName,
                    accountNumber: response.data.accountNumber,
                    confirmAccountNumber: response.data.confirmAccountNumber,
                    ifscCode: response.data.ifscCode,
                    panCardNumber: response.data.panCardNumber,
                    aadharCardNumber: response.data.aadharCardNumber,
                    gstNumber: response.data.gstNumber,
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
        bankName: "",
        branchName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        ifscCode: "",
        passbookOrCheque: null,
        passbookOrChequePreview: "",
        panCardNumber: "",
        panCardImage: null,
        panCardImagePreview: "",
        aadharCardNumber: "",
        aadharFrontImage: null,
        aadharFrontImagePreview: "",
        aadharBackImage: null,
        aadharBackImagePreview: "",
        gstNumber: "",
        shopImage: null,
        shopImagePreview: ""
    });

    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            let userId = generateUniqueId();
            const response = await postData(formData, Urls.serviceMankycUpdate, "POST", 0, 0,1); 
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
            <div className="row">
                <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
                    <h4>Kyc Verification</h4>

                </div>
            </div>



            <>
                <div className="row justify-content-center">
                    <div className="col-xxl-12 col-lg-12">

                        <form onSubmit={handleSubmit} className="p-3">
                            <div className="modal-body">
                                <div className="row">


                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Bank Name</label>
                                        <input
                                            type="text"
                                            name="bankName"
                                            className="form-control"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            placeholder="Enter Bank Name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Branch Name</label>
                                        <input
                                            type="text"
                                            name="branchName"
                                            className="form-control"
                                            value={formData.branchName}
                                            onChange={handleChange}
                                            placeholder="Enter Branch Name"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Account Number</label>
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            className="form-control"
                                            value={formData.accountNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Account Number"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Confirm AccountNumber</label>
                                        <input
                                            type="text"
                                            name="confirmAccountNumber"
                                            className="form-control"
                                            value={formData.confirmAccountNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Confirm AccountNumber"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">IFSC Code</label>
                                        <input
                                            type="text"
                                            name="ifscCode"
                                            className="form-control"
                                            value={formData.ifscCode}
                                            onChange={handleChange}
                                            placeholder="Enter IFSC Code"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PanCard Number</label>
                                        <input
                                            type="text"
                                            name="panCardNumber"
                                            className="form-control"
                                            value={formData.panCardNumber}
                                            onChange={handleChange}
                                            placeholder="Enter PanCard Number"
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">AadharCard Number</label>
                                        <input
                                            type="text"
                                            name="aadharCardNumber"
                                            className="form-control"
                                            value={formData.aadharCardNumber}
                                            onChange={handleChange}
                                            placeholder="Enter AadharCard Number"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Gst Number</label>
                                        <input
                                            type="text"
                                            name="gstNumber"
                                            className="form-control"
                                            value={formData.gstNumber}
                                            onChange={handleChange}
                                            placeholder="Enter Gst Number"
                                        />
                                    </div>
                                    

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Passbook/Cancel Cheque</label>
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
                                                name="passbookOrCheque"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.passbookOrChequePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.passbookOrChequePreview}
                                                    alt="preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: 150 }}
                                                />                                                    
                                            </div>
                                        )}
                                    </div>

                                    

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PanCard Image</label>
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
                                                name="panCardImage"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.panCardImagePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.panCardImagePreview}
                                                    alt="preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: 150 }}
                                                />                                                    
                                            </div>
                                        )}
                                    </div>

                                    
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">AadharFront Image</label>
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
                                                name="aadharFrontImage"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.aadharFrontImagePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.aadharFrontImagePreview}
                                                    alt="preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: 150 }}
                                                />                                                    
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">AadharBack Image</label>
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
                                                name="aadharBackImage"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.aadharBackImagePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.aadharBackImagePreview}
                                                    alt="preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: 150 }}
                                                />                                                    
                                            </div>
                                        )}
                                    </div>





                                    
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Shop Image</label>
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
                                                name="shopImage"
                                                accept="image/*,video/*,application/pdf"
                                                onChange={handleFileChange}
                                                className="form-control mt-2"
                                            />
                                            
                                        </div>
                                        {formData.shopImagePreview && (
                                            <div className="mt-3 text-center">
                                                <img
                                                    src={formData.shopImagePreview}
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
                                        Submit Verification
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </>








        </>
    );
};

export default KycForm;