import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import SelectMultipleService from "../../components/Form/SelectMultipleService";

const UpdateRateCardPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [rateGroups, setRateGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, rateCardRes] = await Promise.all([
          axios.get(apis.service.get),
          axios.get(`${apis.rateCard.get}/${id}`, {
            headers: { Authorization: validToken },
          }),
        ]);

        setServices(serviceRes?.data?.data || []);

        const rateCardData = rateCardRes?.data?.data;
        if (rateCardData) {
          const existingServiceIds = rateCardData?.services?.map((s) => s?._id || s?.id) || [];
          setSelectedServices(existingServiceIds);

          setRateGroups(
            rateCardData?.rateGroups?.length
              ? rateCardData?.rateGroups?.map((group) => ({
                title: group?.title || "",
                rates: group?.rates?.map((r) => ({
                  description: r?.description || "",
                  price: r?.serviceCharge?.price || "",
                  labourCharge: r?.serviceCharge?.labourCharge || "",
                })) || [{ description: "", price: "", labourCharge: "" }],
              }))
              : [{ title: "", rates: [{ description: "", price: "", labourCharge: "" }] }]
          );
        };
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch rate card details");
      };
    };

    fetchData();
  }, [id, validToken]);

  const handleGroupTitleChange = (index, value) => {
    const updated = [...rateGroups];
    updated[index].title = value;
    setRateGroups(updated);
  };

  const handleRateChange = (groupIndex, rateIndex, field, value) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates[rateIndex][field] = value;
    setRateGroups(updated);
  };

  const addGroupField = () => {
    setRateGroups([
      ...rateGroups,
      { title: "", rates: [{ description: "", price: "", labourCharge: "" }] },
    ]);
  };

  const removeGroupField = (index) => {
    setRateGroups(rateGroups.filter((_, i) => i !== index));
  };

  const addRateField = (groupIndex) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates.push({ description: "", price: "", labourCharge: "" });
    setRateGroups(updated);
  };

  const removeRateField = (groupIndex, rateIndex) => {
    const updated = [...rateGroups];
    updated[groupIndex].rates.splice(rateIndex, 1);
    setRateGroups(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      toast.error("Please select at least one service");
      return;
    }

    const validGroups = rateGroups.filter(
      (g) => g?.title?.trim() && g?.rates?.some((r) => r?.description?.trim())
    );

    if (validGroups.length === 0) {
      toast.error("Please add at least one valid rate group and rate");
      return;
    }

    const payload = {
      services: selectedServices,
      rateGroups: rateGroups?.map((group) => ({
        title: group?.title,
        rates: group?.rates?.map((rate) => ({
          description: rate?.description,
          serviceCharge: {
            price: rate?.price,
            labourCharge: rate?.labourCharge,
          },
        })),
      })),
    };

    try {
      setLoading(true);
      const res = await axios.patch(`${apis.rateCard.update}/${id}`, payload, {
        headers: { Authorization: validToken },
      });

      if (res?.data?.success) {
        toast.success("Rate Card updated successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container mt-4 mb-5">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Rate Card</h5>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Services */}
              <div className="mb-3">
                <label className="form-label">
                  Select Services <span className="text-danger">*</span>
                </label>
                <SelectMultipleService
                  optionsList={services}
                  value={selectedServices}
                  onChange={setSelectedServices}
                />
              </div>

              {/* Rate Groups */}
              <div className="mb-3">
                <label className="form-label">Rate Groups</label>
                {rateGroups.map((group, gIndex) => (
                  <div key={gIndex} className="border rounded p-3 mb-3 bg-light">
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Group Title"
                        value={group.title}
                        onChange={(e) => handleGroupTitleChange(gIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeGroupField(gIndex)}
                        disabled={rateGroups.length === 1}
                      >
                        -
                      </button>
                      {gIndex === rateGroups.length - 1 && (
                        <button
                          type="button"
                          className="btn btn-success ms-2"
                          onClick={addGroupField}
                        >
                          +
                        </button>
                      )}
                    </div>

                    {/* Rates */}
                    {group.rates.map((rate, rIndex) => (
                      <div key={rIndex} className="row g-2 align-items-end mb-2">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            value={rate.description}
                            onChange={(e) =>
                              handleRateChange(gIndex, rIndex, "description", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            value={rate.price}
                            onChange={(e) =>
                              handleRateChange(gIndex, rIndex, "price", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Labour Charge"
                            value={rate.labourCharge}
                            onChange={(e) =>
                              handleRateChange(gIndex, rIndex, "labourCharge", e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-2 d-flex">
                          <button
                            type="button"
                            className="btn btn-danger me-1"
                            onClick={() => removeRateField(gIndex, rIndex)}
                            disabled={group.rates.length === 1}
                          >
                            -
                          </button>
                          {rIndex === group.rates.length - 1 && (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => addRateField(gIndex)}
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRateCardPage;
