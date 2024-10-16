import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputField from "components/InputField/InputField";
import { Spinner } from "components";
import { DOCTOR_SPECIALIZATION , DOCTOR_RATE } from "components/Doctor/Doctor";
import axiosInstance from "services/axiosClient";
import { api_host } from "config/api_host";
import axiosErrorHandler from "components/axiosErrorHandler";

const GENDER =  { 
  0 : 'ذكر',
  1 : 'أنثى'
};

export default function EditNures() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [onSendRequest, setOnSendRequest] = useState(false);

  const [departements , setDepartements] = useState({});

  const [nurse, setNurse] = useState({});
  const [image, setImage] = useState("");

  const getNurseInfo = () => {
    axiosInstance.get(`${api_host}/nurses/${id}`).then(response => {
        setNurse(response.data)
    }).catch(error => {
      console.log(error);
    })
}

    const getFullData = () => {
      axiosInstance.get(`${api_host}/departements/?paginated=0`).then(response => {
        const departements_data = response.data;
        const departementsObj = {}
        departements_data.forEach(dep => {
          departementsObj[dep.id] = dep.name;
        });
        setDepartements({0 : "قم بتحديد القسم", ...departementsObj});
      }).then(() => {
        getNurseInfo()
      })
    }

    useEffect(() => {
        getFullData()
    }, []);



  const handleUpdate = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;
    setOnSendRequest(true);
    
    const formData = new FormData();
    Object.entries(nurse).forEach((entry) => {
      if(entry[1] !== "")
        formData.append(entry[0] , entry[1])
    });
    
    if(image)
      formData.append("profile_picture" , image);

    axiosInstance
    .post(`${api_host}/nurses/${id}?_method=PUT`,formData , {
      headers : {
        "Content-Type" : "form-data"
      }
    })
      .then(response => {
        navigate("/dashboard/nurses");
        setOnSendRequest(false);
      })
      .catch(error => {
        axiosErrorHandler(error)
      });

      setOnSendRequest(false);
  };

  const handleTextFieldsChange = (event) => {
    setNurse({
      ...nurse,
      [event.name]: event.value,
    });
  };

  const handleSelectFieldsChange = (event) => {
    setNurse({
      ...nurse,
      [event.name]: event.selectedOptions[0].id,
    });
  };

  return (
    <div className="flex justify-center items-center w-full md:p-2 m-auto overflow-auto">
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          <InputField
              title={"الاسم الأول"}
              id={"first_name"}
              value={nurse.first_name}
              onChange={handleTextFieldsChange}
            />
            <InputField
              title={"الاسم الأخير"}
              id={"last_name"}
              value={nurse.last_name}
              onChange={handleTextFieldsChange}
            />
            <InputField
              title={"البريد الالكتروني"}
              id={"email"}
              value={nurse.email}
              onChange={handleTextFieldsChange}
            />
            <InputField
              type="password"
              direction="ltr"
              title={"كلمة السّر"}
              id={"password"}
              value={nurse.password}
              onChange={handleTextFieldsChange}
            />
            <InputField
              title={"العنوان"}
              id={"address"}
              value={nurse.address}
              onChange={handleTextFieldsChange}
            />
            <InputField
              type="select"
              title={"الجنس"}
              id={"gender"}
              value={GENDER}
              onChange={handleSelectFieldsChange}
            />
            <InputField
              title={"رقم الموبايل"}
              id={"phone_number"}
              value={nurse.phone_number}
              onChange={handleTextFieldsChange}
            />
            <InputField
              title={"القسم"}
              id={"departement_id"}
              type="select"
              value={departements}
              onChange={handleSelectFieldsChange}
            />
            
            <InputField
              title={"التقييم"}
              type="select"
              id={"rate"}
              value={DOCTOR_RATE}
              onChange={handleSelectFieldsChange}
            />
            <InputField
              type="select"
              title={"الاختصاص"}
              id={"specialization"}
              value={DOCTOR_SPECIALIZATION}
              onChange={handleSelectFieldsChange}
            />
            <InputField
              title={"الوصف"}
              id={"short_description"}
              value={nurse.short_description}
              onChange={handleTextFieldsChange}
              pull
            />
            
            <InputField
              title={"تاريخ الميلاد"}
              id={"birth_date"}
              value={nurse.birth_date}
              onChange={handleTextFieldsChange}
              type="date"
            />

            <InputField
              title={"تاريخ التعين"}
              id={"assigned_at"}
              value={nurse.assigned_at}
              onChange={handleTextFieldsChange}
              type="date"
            />

            <InputField
              pull
              title={"الصورة"}
              id={"profile_picture"}
              value={image}
              onChange={setImage}
              type="file"
            />

          </div>

          <div className="flex justify-end mt-6">
            {!onSendRequest ? (
              <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                تعديل
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
