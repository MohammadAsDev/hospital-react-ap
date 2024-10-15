import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { Spinner } from "components";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ActionModal } from "components/Modals";
import axiosInstance from "services/axiosClient";
import Paginator from "components/Paginator/Paginator";


export default function Doctors() {

  const [doctorsList, setDoctorsList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [openDeleteDoctorModal, setOpenDeleteDoctorModal] = useState(false);
  const [doctorId, setDoctorId] = useState(0);
  const [departmentData, setDepartmentData] = useState({});
  const { department_id } = useParams();

  const navigate = useNavigate();


  const [nPages, setNPages] = useState(1);


  const doctorsUrl = 
  department_id ? 
  `${api_host}/departements/${department_id}/doctors/` : 
  `${api_host}/doctors/?full-detailed=true`;

  useEffect(() => {

    axiosInstance
      .get(doctorsUrl)
      .then((response) => {
        if (response.status == 200) {
          setNPages(Math.ceil(response.data.total / response.data.per_page))
          setDoctorsList(response.data.data);
          setLoadData(true);
        }
      })
      .then(() => {
        if (department_id)
          axiosInstance
            .get(`${api_host}/departements/${department_id}/`)
            .then(response => {
              if (response.status == 200) {
                setDepartmentData(response.data)
              }
            }).catch(error => {
              console.log(error)
            })
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLoadData(true);
  }, [department_id]);

  const handleDelete = () => {
    axiosInstance.delete(`${api_host}/doctors/${doctorId}/`)
    .then((response) => {
      window.location.reload(false);
      setOpenDeleteDoctorModal(false);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="w-full max-w-7xl_">
      {
        department_id ?
        <></> :
        <div className="flex gap-4 mb-6">
        <Link to={"/dashboard/doctors/add"} className="btn btn-primary text-sm">
          إضافة طبيب
        </Link>
        </div>
      }

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        {
          department_id ? 
          <h1 className="text-gray-500 font-bold text-xl p-5">الأطباء الموجودين في ({departmentData.name})</h1> :
          <></>
        }
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
                تاريخ التعين
              </th>
              <th scope="col" className="px-6 py-3">
                العنوان
              </th>
              <th scope="col" className="px-6 py-3">
                التقييم
              </th>
              <th scope="col" className="px-6 py-3">
                المعلومات
              </th>
              <th scope="col" className="px-6 py-3">
                الادوات
              </th>
            </tr>
          </thead>
          <tbody>
            {doctorsList.length > 0 &&
              doctorsList.map((doctor, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 overflow-hidden"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {doctor.first_name + " " + doctor.last_name}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={doctor.profile_picture_path}
                      className="w-14 rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4">{doctor.email}</td>
                  <td className="px-6 py-4">{doctor.phone_number}</td>
                  <td className="px-6 py-4">{doctor.assigned_at}</td>
                  <td className="px-6 py-4">{doctor.address}</td>
                  <td className="px-6 py-4">{doctor.rate + 1}</td>
                  <td className="px-6 py-4 line-clamp-1">
                    {doctor.short_description}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-4">
                    <button
                      className="font-medium  btn btn-danger btn-sm"
                      onClick={() => {
                        setDoctorId(doctor.id);
                        setOpenDeleteDoctorModal(true);
                      }}
                    >
                      حذف
                    </button>

                    <button
                      className="font-medium text-white  btn bg-blue-600 btn-sm"
                      onClick={() => {
                        navigate(`/dashboard/doctors/${doctor.id}/edit`)
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
        {!loadData && <Spinner />}
        {loadData && doctorsList.length == 0 && (
          <h1 className="text-center bg-gray-200 dark:bg-gray-800 dark:text-white font-medium text-gray-800 p-4 w-full">
            لا يوجد أطباء
          </h1>
        )}
        
      </div>

      <div className="p-5">
          <Paginator 
            resources={department_id ? `departements/${department_id}/doctors` : `doctors`} 
            dataSetter={setDoctorsList}
            nPages={nPages}
            query={"full-detailed=true"}
          />
      </div>

      <ActionModal
        title={"حذف طبيب"}
        open={openDeleteDoctorModal}
        close={setOpenDeleteDoctorModal}
        deleteAction={handleDelete}
      >
        <div className="h-full w-full flex justify-center items-center">
          {" "}
          <h1 className="text-4xl ">هل أنت متأكد من حذف الطبيب</h1>
        </div>
      </ActionModal>
    </div>
  );
}
