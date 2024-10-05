import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "components/InputField/InputField";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import { DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import { api_host } from "config/api_host";
import axiosInstance from "services/axiosClient";

export default function AddSection() {
  const navigate = useNavigate();
  const [onSendRequest, setOnSendRequest] = useState(false);


  const [section, setSection] = useState({
    name: "",
    description: "",
    specialization : 0
  });

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;

    setOnSendRequest(true);
    if (section.name === "" || section.description === "") {
      createAlert("Warning", "جميع الحقول مطلوبة");
      setOnSendRequest(false);
      return;
    }

    axiosInstance.post(`${api_host}/departements/` , section).then(response => {
      navigate("/dashboard/sections");
      setOnSendRequest(false);
    }).catch(err => {
      setOnSendRequest(false);
    })

  };

  const handleSpecializationChange = event => {
    setSection({
      ...section,
      [event.name] : event.selectedOptions[0].id
    })
  }
  const handleFieldsChange = (event) => {
    setSection({
      ...section,
      [event.name]: event.value,
    });
  };

  return (
    <div className="flex justify-center items-center w-full md:p-2 mt-28 overflow-auto">
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <form onSubmit={handleSubmitRegister}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <InputField
              title={"اسم القسم"}
              id={"name"}
              value={section.name}
              onChange={handleFieldsChange}
              required
            />
    
            <InputField
              type="select"
              title={"الإختصاص"}
              id={"specialization"}
              value={DOCTOR_SPECIALIZATION}
              onChange={handleSpecializationChange}
              required
            />

            <InputField
              title={"الوصف"}
              id={"description"}
              value={section.description}
              onChange={handleFieldsChange}
              required
              pull
            />
          </div>

          <div className="flex justify-end mt-6">
            {!onSendRequest ? (
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                إضافة
              </button>
            ) : (
              <Spinner />
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
