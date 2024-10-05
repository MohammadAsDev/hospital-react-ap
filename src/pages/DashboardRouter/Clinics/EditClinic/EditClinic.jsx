import { Spinner } from "components";
import axiosErrorHandler from "components/axiosErrorHandler";
import InputField from "components/InputField/InputField";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "services/axiosClient";


export default function EditClinic() {

    const [onSendRequest, setOnSendRequest] = useState(false);
    const [clinic, setClinic] = useState({});

    const navigate = useNavigate();

    const { id } = useParams()



    const [departements , setDepartements] = useState({});

    const getClinicData = () => {
        axiosInstance.get(`${api_host}/clinics/${id}/`).then(
            response => {
                console.log(response.data)
                setClinic(response.data)
            }
        ).catch(error => {
            console.log(error);
        })
    }

    const getFullData = () => {
        axiosInstance.get(`${api_host}/departements/`).then(response => {
            const departements_data = response.data.data;
            const departementsObj = {}
            departements_data.forEach(dep => {
              departementsObj[dep.id] = dep.name;
            });
            setDepartements({0 : "قم بإختيار القسم" , ...departementsObj});
          }).then(() => getClinicData()).catch(error => {
              axiosErrorHandler(error);
          })
    }

    const handleTextFieldsChange = (event) => {
        setClinic({
          ...clinic,
          [event.name]: event.value,
        });
    };

    const handleSelectFieldsChange = (event) => {
        setClinic({
          ...clinic,
          [event.name]: event.selectedOptions[0].id
        })
      }
  

    useEffect(() => {
        getFullData()    
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        if (onSendRequest) return;
        setOnSendRequest(true);
        

        axiosInstance
        .put(`${api_host}/clinics/${id}`,clinic)
          .then(() => {
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
            <form onSubmit={handleUpdate}>
                <InputField
                    title={"رمز الغرفة"}
                    required={true}
                    type="text"
                    id={"clinic_code"}
                    value={clinic.clinic_code}
                    onChange={handleTextFieldsChange}
                />
                <InputField
                  title={"القسم"}
                  id={"departement_id"}
                  type="select"
                  value={departements}
                  onChange={handleSelectFieldsChange}
                  required
                />
                
                <div className="flex justify-end mt-6">
                    {!onSendRequest ? (
                      <button 
                      className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                        تعديل
                      </button>
                    ) : (
                      <Spinner />
                    )}
                </div>            
            </form>
        </section>
    );
}