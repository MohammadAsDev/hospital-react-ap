import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import axiosErrorHandler from "components/axiosErrorHandler";
import InputField from "components/InputField/InputField";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosClient";


export default function AddClinic() {

    const [clinicCode, setClicicCode] = useState("");
    const [departmentId, setDepartmentId] = useState(1);
    const [onSendRequest, setOnSendRequest] = useState(false);
    const navigate = useNavigate();

    const newClinic = {
        "clinic_code" : clinicCode,
        "departement_id" : departmentId
    }


    const [departements , setDepartements] = useState({});
    useEffect(() => {
        axiosInstance.get(`${api_host}/departements/`).then(response => {
          const departements_data = response.data.data;
          const departementsObj = {}
          departements_data.forEach(dep => {
            departementsObj[dep.id] = dep.name;
          });
          setDepartements({0 : "قم بإختيار القسم" , ...departementsObj});
        }).catch(error => {
            axiosErrorHandler(error);
        })
      }, []);

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
    
        if (onSendRequest) return;
        setOnSendRequest(true);
        if (
          clinicCode === "" ||
          departmentId === ""
        ) {
          createAlert("Warning", "جميع الحقول مطلوبة");
          setOnSendRequest(false);
          return;
        }    
    
        console.log(newClinic);

        axiosInstance
        .post(`${api_host}/clinics/`,newClinic)
          .then(response => {
            navigate("/dashboard/clinics");
            setOnSendRequest(false);
          })
          .catch(error => {
            axiosErrorHandler(error)
            setOnSendRequest(false);
          });
      };

    return (
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
            <form onSubmit={handleSubmitRegister}>
                <InputField
                    title={"رمز الغرفة"}
                    required={true}
                    type="text"
                    value={clinicCode}
                    onChange={(event) => setClicicCode(event.value)}
                />
                <InputField
                  title={"القسم"}
                  id={"departement_id"}
                  type="select"
                  value={departements}
                  onChange={(event) => setDepartmentId(event.selectedOptions[0].id)}
                  required
                />
                
                <div className="flex justify-end mt-6">
                    {!onSendRequest ? (
                      <button 
                      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                        إضافة
                      </button>
                    ) : (
                      <Spinner />
                    )}
                </div>            
            </form>
        </section>
    );
}