import { Spinner } from "components";
import axiosErrorHandler from "components/axiosErrorHandler";
import { DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import { ActionModal } from "components/Modals";
import Paginator from "components/Paginator/Paginator";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosClient";


export default function Clinics() {
    const [clinicsList, setClinicsList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedClinicId, setSelectedClinicId] = useState();
    const [nPages, setNPages] = useState(0);

    const navigate = useNavigate()

    const { auth } = useSelector(state => state.auth);

    const [openDeleteClinicsModal , setOpenDeleteClinicsModal] = useState(false);

    useEffect(() => {
        axiosInstance(`${api_host}/clinics/`).then(response => {
            setNPages(Math.ceil(response.data.total / response.data.per_page))
            setClinicsList(response.data.data);
            setIsLoaded(true);
        }).catch(error => {
            axiosErrorHandler(error);
        })
    }, []);

    const handleDelete = () => {
      axiosInstance.delete(`${api_host}/clinics/${selectedClinicId}/` , {
        headers : {
          "Authorization" : `Bearer ${auth.token}`
        }
      }).then(() => {
          setOpenDeleteClinicsModal(false);
          window.location.reload(false);
          
      }).catch(err => {
        axiosErrorHandler(err);
      })
    }

    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <div className="w-full max-w-7xl_">
            <div className="flex gap-4 mb-6">
              <Link to={"/dashboard/clinics/add"} className="btn btn-primary text-sm">
                إضافة قسم
              </Link>
            </div>
            </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                اسم القسم
              </th>
              <th scope="col" className="px-6 py-3">
                الإختصاص
              </th>
              <th scope="col" className="px-6 py-3">
                رمز الغرفة
              </th>
              <th scope="col" className="px-6 py-3">
              الادوات
              </th>
            </tr>
          </thead>
          <tbody>
            {clinicsList.length > 0 &&
              clinicsList.map((clinic, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 overflow-hidden"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {clinic.departement.name}
                  </th>
                  <td className="px-6 py-4">{DOCTOR_SPECIALIZATION[clinic.departement.specialization]}</td>
                  <td className="px-6 py-4">{clinic.clinic_code}</td>

                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-4">

                    <button
                      className="font-medium  btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedClinicId(clinic.clinic_id);
                        setOpenDeleteClinicsModal(true);
                      }}
                    >
                      حذف
                    </button>

                    <button
                      className="font-medium text-white  btn bg-blue-500 btn-sm"
                      onClick={() => {
                        navigate(`${clinic.clinic_id}/edit`)
                      }}
                    >
                      تعديل
                    </button>

                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!isLoaded && <Spinner />}
        {isLoaded && clinicsList.length == 0 && (
          <h1 className="text-center bg-gray-200 dark:bg-gray-800 dark:text-white font-medium text-gray-800 p-4 w-full">
            لا يوجد غرف داخليّة
          </h1>
        )}

       <ActionModal
        title={"حذف الغرفة"}
        open={openDeleteClinicsModal}
        close={setOpenDeleteClinicsModal}
        deleteAction={handleDelete}
        >
        <div className="h-full w-full flex justify-center items-center">
          <h1 className="text-4xl ">هل أنت متأكد من حذف الغرفة</h1>
        </div>
        </ActionModal> 
      </div>

      <div className="p-5">
      <Paginator 
        nPages={nPages}
        resources={"clinics"}
        dataSetter={setClinicsList}
      />
      </div>

  </>
    )
}