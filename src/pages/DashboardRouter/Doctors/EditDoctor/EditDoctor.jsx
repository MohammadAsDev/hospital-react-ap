import axios from "axios";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import axiosErrorHandler from "components/axiosErrorHandler";
import { DOCTOR_RATE, DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import InputField from "components/InputField/InputField";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "services/axiosClient";


  
  const GENDER = {    // it's duplicated, so it's better to refactor it
    0 : "ذكر",
    1 : "أنثى"
  }


export default function EditDoctor() {
    
    const navigate = useNavigate();
    const [onSendRequest, setOnSendRequest] = useState(false);
    const [departements , setDepartements] = useState({});
    const { id } = useParams()
  
    const [doctor, setDoctor] = useState({});
    const [image, setImage] = useState("");

    const getDoctorInfo = () => {
        axiosInstance.get(`${api_host}/doctors/${id}?full-detailed=true`).then(response => {
            console.log(response.data)
            setDoctor(response.data)
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
        getDoctorInfo()
      })
    }

    useEffect(() => {
        getFullData()
    }, []);
 
    const handleTextFieldsChange = (event) => {
      setDoctor({
        ...doctor,
        [event.name]: event.value,
      });
    };

    const handleSelectFieldsChange = (event) => {
      setDoctor({
        ...doctor,
        [event.name]: event.selectedOptions[0].id
      })
    }

    const handleUpdate = (e) => {

      e.preventDefault();

      if (onSendRequest) return;
      setOnSendRequest(true);
      
      const form = new FormData();
      Object.entries(doctor).forEach((entity) => {
        if(entity[1] !== ""){
          form.append(entity[0] , entity[1])
        }
      })
      
      if(image)
        form.append("profile_picture" , image)


      axiosInstance
      .post(`${api_host}/doctors/${id}?_method=PUT`,form,{
        headers: {
          "Content-Type" : "form-data"
        }
      }).then(response => {
          navigate("/dashboard/doctors");
          setOnSendRequest(false);
        })
        .catch(error => {
          axiosErrorHandler(error)
          setOnSendRequest(false);
        });

    }
    
    return (
        <div className="flex justify-center items-center w-full md:p-2 m-auto overflow-auto">
          <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
                <InputField
                  title={"الاسم الأول"}
                  id={"first_name"}
                  value={doctor.first_name}
                  onChange={handleTextFieldsChange}
                />
                <InputField
                  title={"الاسم الأخير"}
                  id={"last_name"}
                  value={doctor.last_name}
                  onChange={handleTextFieldsChange}
                />
                <InputField
                  title={"البريد الالكتروني"}
                  id={"email"}
                  value={doctor.email}
                  onChange={handleTextFieldsChange}
                />
                <InputField
                  type="password"
                  direction="ltr"
                  title={"كلمة السّر"}
                  id={"password"}
                  value={doctor.password}
                  onChange={handleTextFieldsChange}
                />
                <InputField
                  title={"العنوان"}
                  id={"address"}
                  value={doctor.address}
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
                  value={doctor.phone_number}
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
                  value={doctor.short_description}
                  onChange={handleTextFieldsChange}
                  pull
                />
                
                <InputField
                  title={"تاريخ الميلاد"}
                  id={"birth_date"}
                  value={doctor.birth_date}
                  onChange={handleTextFieldsChange}
                  type="date"
                />
    
                <InputField
                  title={"تاريخ التعين"}
                  id={"assigned_at"}
                  value={doctor.assigned_at}
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