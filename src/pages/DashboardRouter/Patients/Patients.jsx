import { Spinner } from "components";
import axiosErrorHandler from "components/axiosErrorHandler";
import { ActionModal } from "components/Modals";
import Paginator from "components/Paginator/Paginator";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "services/axiosClient";


export default function Patients() {

    const [patientsList, setPatientsList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState();
    const [nPages, setNPages] = useState(0);

    const { auth } = useSelector(state => state.auth);

    const [openDeletePatientsModal , setOpenDeletePatientsModal] = useState(false);

    useEffect(() => {
        axiosInstance(`${api_host}/patients/`).then(response => {
            setPatientsList(response.data.data);
            setIsLoaded(true);
        }).catch(error => {
            axiosErrorHandler(error);
        })
    }, []);

    const handleDelete = () => {
      axiosInstance.delete(`${api_host}/patients/${selectedPatientId}/` , {
        headers : {
          "Authorization" : `Bearer ${auth.token}`
        }
      }).then((response) => {
          setNPages(Math.ceil(response.data.total / response.data.per_page));
          setOpenDeletePatientsModal(false);
          window.location.reload(false);
      }).catch(err => {
        axiosErrorHandler(err);
      })
    }

    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                الاسم
              </th>
              <th scope="col" className="px-6 py-3">
                الصورة
              </th>
              <th scope="col" className="px-6 py-3">
                البريد الالكتروني
              </th>
              <th scope="col" className="px-6 py-3">
                رقم الهانف
              </th>
              <th scope="col" className="px-6 py-3">
                العنوان
              </th>
              <th scope="col" className="px-6 py-3">
                الجنس
              </th>
              <th scope="col" className="px-6 py-3">
                المعرف الوطني
              </th>
              <th scope="col" className="px-6 py-3">
                الأدوات
              </th>
            </tr>
          </thead>
          <tbody>
            {patientsList.length > 0 &&
              patientsList.map((patient, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 overflow-hidden"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {patient.first_name + " " + patient.last_name}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={patient.profile_picture_path}
                      className="w-14 rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.phone_number}</td>
                  <td className="px-6 py-4">{patient.address}</td>
                  <td className="px-6 py-4">{patient.gender == 0 ? "ذكر" : "أنثى"}</td>
                  <td className="px-6 py-4">{patient.ssn}</td>

                  <td className="px-6 py-4">
                    <button
                      className="font-medium  btn btn-danger btn-sm"
                      onClick={() => {
                        setSelectedPatientId(patient.id);
                        setOpenDeletePatientsModal(true);
                      }}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!isLoaded && <Spinner />}
        {isLoaded && patientsList.length == 0 && (
          <h1 className="text-center bg-gray-200 dark:bg-gray-800 dark:text-white font-medium text-gray-800 p-4 w-full">
            لا يوجد أطباء
          </h1>
        )}

       <ActionModal
        title={"حذف مريض"}
        open={openDeletePatientsModal}
        close={setOpenDeletePatientsModal}
        deleteAction={handleDelete}
        >
        <div className="h-full w-full flex justify-center items-center">
          <h1 className="text-4xl ">هل أنت متأكد من حذف المريض</h1>
        </div>
        </ActionModal> 

      </div>

      <div className="p-5">
      <Paginator 
        nPages={nPages}
        resources={"patients"}
        dataSetter={setPatientsList}
      />
      </div>

    </>
    )
}