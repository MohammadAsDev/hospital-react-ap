import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "components/InputField/InputField";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";

const suffererTemplate = {
  name: "",
  email: "",
  bloodType: "A+",
  birthday: "",
  phone: "",
  address: "",
  gender: "ذكر",
};

export default function Reservation() {
  const navigate = useNavigate();
  const [onSendRequest, setOnSendRequest] = useState(false);

  const [sufferer, setSufferer] = useState(suffererTemplate);

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;
    setOnSendRequest(true);
    if (
      sufferer.name === "" ||
      sufferer.email === "" ||
      sufferer.bloodType === "" ||
      sufferer.birthday === "" ||
      sufferer.phone === "" ||
      sufferer.address === "" ||
      sufferer.gender === ""
    ) {
      createAlert("Warning", "جميع الحقول مطلوبة");
      setOnSendRequest(false);
      return;
    }

    console.log(sufferer);

    const formData = new FormData();
    formData.append("name", sufferer.name);
    formData.append("email", sufferer.email);
    formData.append("phone", sufferer.phone);
    formData.append("birthday", sufferer.birthday);
    formData.append("bloodType", sufferer.bloodType);
    formData.append("address", sufferer.address);
    formData.append("gender", sufferer.gender);

    // await axios
    // .post(``,formData)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });

    console.table(sufferer);

    // navigate("/dashboard/doctors");

    setOnSendRequest(false);
  };

  const handleFieldsChange = (event) => {
    setSufferer({
      ...sufferer,
      [event.name]: event.value,
    });
  };

  return (
    <div className="flex justify-center items-center w-full md:p-2 m-auto overflow-auto">
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <form onSubmit={handleSubmitRegister}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <InputField
              pull
              title={"الاسم"}
              id={"name"}
              value={sufferer.name}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"البريد الالكتروني"}
              id={"email"}
              value={sufferer.email}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"رقم الموبايل"}
              id={"phone"}
              value={sufferer.phone}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"تاريخ التولد"}
              id={"birthday"}
              value={sufferer.birthday}
              type="date"
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"العنوان"}
              id={"address"}
              value={sufferer.address}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"زمرة الدم"}
              id={"bloodType"}
              type="select"
              value={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
              onChange={handleFieldsChange}
              required
            />
            <InputField
              title={"الجنس"}
              type="select"
              id={"gender"}
              value={["ذكر", "انثى"]}
              onChange={handleFieldsChange}
              required
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
