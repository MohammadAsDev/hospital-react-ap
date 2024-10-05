import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_host } from "../../../config/api_host";
import InputField from "components/InputField/InputField";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import axiosInstance from "services/axiosClient";

export default function Register() {
  // axios.interceptors.response.use((response) => response, axiosErrorHandler);
  const [onSendRequest, setOnSendRequest] = useState(false);
  const navigate = useNavigate()

  const genderChoices = {
    0 : "ذكر" ,
    1 : "أنثى"
  }

  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    birth_date : "2000-01-01",
    ssn : "",
    address: "",
    gender: 0,
    password_confirmation: "",
  });

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;
    setOnSendRequest(true);
    if (
      person.first_name === "" ||
      person.last_name === "" ||
      person.email === "" ||
      person.password === "" ||
      person.password_confirmation === "" ||
      person.ssn === "" ||
      person.address === "" ||
      person.gender === "" ||
      person.birth_date === ""
    ) {
      createAlert("Warning", "جميع الحقول مطلوبة");
      setOnSendRequest(false);
      return;
    }
    if (person.password.length < 8) {
      createAlert(
        "Warning",
        "يجب ان تكون كلمة المرور على الاقل مكونة من 8 محارف"
      );
      setOnSendRequest(false);
      return;
    }

    if (person.password !== person.password_confirmation) {
      createAlert(
        "Warning",
        "لا يوجد تطابق بين كلمة المرور وتأكيد كلمة المرور"
      );
      setOnSendRequest(false);
      return;
    }

    try {
      await axiosInstance
        .post(`${api_host}/patients/`, person, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          if (response == undefined) return;

          if (response.status === 200) {      // navigate to "verification account"
            createAlert("Success", "تم إنشاء حساب جديد ");
            // dispatch(login(response.data.data));
            navigate("/login");
            setOnSendRequest(false);
          }
        })
        .catch((error) => {
          createAlert("Error", error.response.status);
          setOnSendRequest(false);
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    setOnSendRequest(false);
  };

  const handleTextFieldsChange = (event) => {
      setPerson({
        ...person,
        [event.name]: event.value,
      });
  };

  const handleSelectFieldsChange = (event) => {
      setPerson({
        ...person,
        [event.name] : event.selectedOptions[0].id
      })
  }

  return (
    <div className="flex justify-center items-center w-full md:p-2 mt-28 overflow-auto">
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          تسجيل مريض جديد
        </h2>

        <form onSubmit={handleSubmitRegister}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            <InputField
              title={"الاسم الأول"}
              id={"first_name"}
              value={person.first_name}
              onChange={handleTextFieldsChange}
              required
            />
            <InputField
              title={"الاسم الأخير"}
              id={"last_name"}
              value={person.last_name}
              onChange={handleTextFieldsChange}
              required
            />
            <InputField
              title={"البريد إلكتروني"}
              id={"email"}
              type="email"
              value={person.email}
              onChange={handleTextFieldsChange}
              direction="ltr"
              required
              pull
            />
            <InputField
              title={"رقم الهاتف"}
              id={"phone_number"}
              value={person.phone_number}
              onChange={handleTextFieldsChange}
              direction="ltr"
              required
              pull
            />
            <InputField
              title={"العنوان"}
              id={"address"}
              value={person.address}
              onChange={handleTextFieldsChange}
              required
            />
            <InputField
              title={"الرقم الوطني"}
              id={"ssn"}
              value={person.ssn}
              onChange={handleTextFieldsChange}
              required
            />
            <InputField
              title={"الجنس"}
              id={"gender"}
              type="select"
              value={genderChoices}
              onChange={handleSelectFieldsChange}
              required
            />
            <InputField
              title={"تاريخ الميلاد"}
              id={"birth_date"}
              type="date"
              onChange={handleTextFieldsChange}
              required
            />
            <InputField
              title={"كلمة المرور"}
              id={"password"}
              type="password"
              value={person.password}
              onChange={handleTextFieldsChange}
              direction="ltr"
              required
            />
            <InputField
              title={"تأكيد كلمة المرور"}
              id={"password_confirmation"}
              type="password"
              value={person.password_confirmation}
              onChange={handleTextFieldsChange}
              direction="ltr"
              required
            />
          </div>

          <h1 className="text-xs mt-6 text-center cursor-context-menu text-gray-700 dark:text-white">
            هل لديك حساب؟{" "}
            <Link to={"/login"} className="text-blue-500 font-semibold">
              تسجيل الدخول
            </Link>
          </h1>

          <div className="flex justify-end mt-6">
            {!onSendRequest ? (
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                تسجيل
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
