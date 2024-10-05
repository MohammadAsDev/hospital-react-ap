import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "components";
import { Link, useNavigate } from "react-router-dom";
import { ActionModal } from "components/Modals";
import axiosInstance from "services/axiosClient";
import axiosErrorHandler from "components/axiosErrorHandler";
import Paginator from "components/Paginator/Paginator";
export default function Nurses() {

  const navigate =useNavigate();

  const [nursesList, setNursesList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [openDeleteNursesModal, setOpenDeleteNursesModal] = useState(false);
  const [nursesId, setNursesId] = useState(0);
  const [nPages, setNPages] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`${api_host}/nurses/`)
      .then((response) => {
        if (response.status == 200) {
          setNPages(Math.ceil(response.data.total / response.data.per_page))
          setNursesList(response.data.data);
          setLoadData(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLoadData(true);
  }, []);

  const handleDelete = (event) => {
    axiosInstance.delete(`${api_host}/nurses/${nursesId}/`)
    .then(() => {
      setOpenDeleteNursesModal(false);
      window.location.reload("nurses");
    }).catch((error) => {
      axiosErrorHandler(error);
    })
  }

  return (
    <div className="w-full max-w-7xl_">
      <div className="flex gap-4 mb-6">
        <Link to={"/dashboard/nurses/add"} className="btn btn-primary text-sm">
          إضافة ممرض
        </Link>
      </div>

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
                تاريخ الاضافة
              </th>
              <th scope="col" className="px-6 py-3">
                الادوات
              </th>
            </tr>
          </thead>
          <tbody>
            {nursesList.length > 0 &&
              nursesList.map((nurse) => (
                <tr
                  key={nurse.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {nurse.first_name + " " + nurse.last_name}
                  </th>
                  <td className="px-6 py-4">
                    <img
                      src={nurse.profile_picture_path}
                      className="w-14 rounded-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4">{nurse.email}</td>{" "}
                  <td className="px-6 py-4">{nurse.phone_number}</td>
                  <td className="px-6 py-4">{nurse.assigned_at}</td>
                  <td className="px-6 py-4">
                  <div className="flex flex-row items-center gap-4">
                    <button
                      className="font-medium  btn btn-danger btn-sm"
                      onClick={() => {
                        setNursesId(nurse.id);
                        setOpenDeleteNursesModal(true);
                      }}
                    >
                      حذف
                    </button>

                    <button
                      className="font-medium text-white btn bg-blue-500 btn-sm"
                      onClick={() => {
                        navigate(`${nurse.id}/edit`)       
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
        {loadData && nursesList.length == 0 && (
          <h1 className="text-center bg-gray-200 dark:bg-gray-800 dark:text-white font-medium text-gray-800 p-4 w-full">
            لا يوجد ممرضين
          </h1>
        )}
      </div>

      <ActionModal
        title={"حذف ممرض"}
        open={openDeleteNursesModal}
        close={setOpenDeleteNursesModal}
        deleteAction={handleDelete}
      >
        <div className="h-full w-full flex justify-center items-center">
          <h1 className="text-4xl ">هل أنت متأكد من حذف الممرض</h1>
        </div>
      </ActionModal>

      <div className="p-5">
      <Paginator 
        nPages={nPages}
        resources={"nurses"}
        dataSetter={setNursesList}
      />
      </div>
    </div>
  );
}
