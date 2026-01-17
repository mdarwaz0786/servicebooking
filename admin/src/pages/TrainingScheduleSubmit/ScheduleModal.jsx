import axios from "axios";
import { useEffect, memo, useRef, useState } from "react";
import apis from "../../apis/apis";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import MultiSelect from "../../components/Form/MultiSelect";
import SingleSelect from "../../components/Form/SingleSelect";

const ScheduleModal = () => {
  const { validToken } = useAuth();
  const [formData, setFormData] = useState({
    servicemanId: [],
    trainingId: null,
  });

  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (window.bootstrap && modalRef.current && !modalInstance.current) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    };
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      const element = modalRef.current;
      const handleHidden = () => {
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((bd) => bd.remove());
      };
      element.addEventListener("hidden.bs.modal", handleHidden);
      return () => element.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);

  const [serviceMen, setServiceMen] = useState([]);
  const [training, setTraining] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServiceMen = async () => {
      try {
        const res = await axios.get(apis.servicemanProfile.get, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          setServiceMen(res?.data?.data || []);
        }
      } catch (err) {
        console.log("Error while fetching servicemen:", err.message);
      }
    };

    fetchServiceMen();
  }, [validToken]);

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const res = await axios.get(apis.training.get, {
          headers: { Authorization: validToken },
        });

        if (res?.data?.success) {
          setTraining(res?.data?.data || []);
        }
      } catch (err) {
        console.log("Error while fetching training:", err.message);
      }
    };

    fetchTraining();
  }, [validToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(apis.trainingScheduleSubmit.reshedule, formData, {
        headers: { Authorization: validToken },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      };
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Error while assigning");
    } finally {
      setLoading(false);
      modalInstance.current?.hide();
    };
  };

  return (
    <div
      className="modal fade"
      id="scheduleModal"
      tabIndex="-1"
      aria-labelledby="scheduleModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="scheduleModalLabel">
              Reschedule Training
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="row">
              <div className="col-md-6">
                <label className="form-label">Providers</label>
                <MultiSelect
                  optionsList={serviceMen}
                  value={formData.servicemanId}
                  placeholder="Select Providers"
                  onChange={(selectedIds) =>
                    setFormData((prev) => ({
                      ...prev,
                      servicemanId: selectedIds,
                    }))
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Training</label>
                <SingleSelect
                  optionsList={training}
                  value={formData.trainingId}
                  placeholder="Select Tarining"
                  onChange={(selectedIds) =>
                    setFormData((prev) => ({
                      ...prev,
                      TrainingId: selectedIds,
                    }))
                  }
                  labelKey={"subject"}
                  valueKey={"_id"}
                />
              </div>

              <div className="text-end mt-4">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ScheduleModal);
