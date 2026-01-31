/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";

const PERMISSION_KEYS = [
  "role",
  "product",
  "variant",
  "serviceProcess",
  "nestedServiceProcess",
  "productStore",
  "timeSlot",
  "brand",
  "city",
  "zone",
  "pincode",
  "providerAppSupport",
  "mobileAppInfo",
  "serviceIncluded",
  "requirementFromCustomer",
  "whyChooseUs",
  "expertTechnician",
  "brandLogo",
  "giPromise",
  "faq",
  "rateCard",
  "user",
  "customer",
  "provider",
  "earning",
  "providerEarning",
  "providerProfile",
  "providerKyc",
  "providerTraining",
  "providerTrainingScheduleSubmit",
  "providerWallet",
  "providerCashcollected",
  "providerInsurance",
  "providerCertificate",
  "providerNotification",
  "customerPayment",
  "providerPayment",
  "activeBooking",
  "cancelBooking",
  "completeBooking",
  "invoice",
  "wideBanner",
  "productService",
  "frontBanner",
  "blogCategory",
  "blog",
  "termsAndCondition",
  "privacyPolicy",
  "refundPolicy",
  "disclaimer",
  "giImpact",
  "contactEnquiry",
  "job",
  "resume",
  "customerSupport",
  "providerSupport",
  "metaTag",
];

const emptyPermission = {
  add: false,
  view: false,
  update: false,
  delete: false,
};

const buildPermissions = () => {
  const obj = {};
  PERMISSION_KEYS.forEach((k) => {
    obj[k] = { ...emptyPermission };
  });
  return obj;
};

const RoleForm = () => {
  const { validToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roleName: "",
    departmentName: "",
    permissions: buildPermissions(),
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      fetchRole();
    }
  }, [id]);

  const fetchRole = async () => {
    try {
      const res = await axios.get(`${apis.role.get}/${id}`, {
        headers: { Authorization: validToken },
      });
      const role = res.data.data || res.data;

      setFormData({
        roleName: role.roleName,
        departmentName: role.departmentName,
        permissions: role.permissions,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load role");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePermission = (module, action) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [action]: !prev.permissions[module][action],
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await axios.patch(`${apis.role.update}/${id}`, formData, {
          headers: { Authorization: validToken },
        });
        toast.success("Role updated successfully");
      } else {
        await axios.post(apis.role.create, formData, {
          headers: { Authorization: validToken },
        });
        toast.success("Role created successfully");
      };

      navigate("/roles");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="d-flex justify-content-between align-items-center p-3">
        <h5 className="mb-0">{isEdit ? "Update Role" : "Add Role"}</h5>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0" style={{ color: "#fff" }}>
              {isEdit ? "Update Role" : "Create Role"}
            </h5>
          </div>

          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            >

              {/* BASIC INFO */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Role Name</label>
                  <input
                    type="text"
                    name="roleName"
                    value={formData.roleName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label>Department Name</label>
                  <input
                    type="text"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              {/* PERMISSIONS */}
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Module</th>
                      <th>Add</th>
                      <th>View</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {PERMISSION_KEYS.map((module) => (
                      <tr key={module}>
                        <td className="text-capitalize">
                          {module.replace(/([A-Z])/g, " $1")}
                        </td>

                        {["add", "view", "update", "delete"].map((action) => (
                          <td key={action}>
                            <input
                              type="checkbox"
                              style={{ width: "20px", height: "20px" }}
                              checked={formData.permissions[module]?.[action] || false}
                              onChange={() =>
                                togglePermission(module, action)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* BUTTON */}
              <button
                disabled={loading}
                className="btn btn-primary mt-3"
              >
                {loading
                  ? "Saving..."
                  : isEdit
                    ? "Update Role"
                    : "Create Role"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
