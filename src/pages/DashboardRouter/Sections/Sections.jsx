import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "components";
import { Link, useNavigate } from "react-router-dom";
import { ActionModal } from "components/Modals";
import { DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import axiosInstance from "services/axiosClient";
import axiosErrorHandler from "components/axiosErrorHandler";
import Paginator from "components/Paginator/Paginator";


export default function Sections() {
  const { auth } = useSelector((state) => state.auth);
  const [sectionsList, setSectionsList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [openDeleteSectionsModal, setOpenDeleteSectionsModal] = useState(false);
  const [sectionId, setSectionId] = useState(0);
  const [nPages, setNPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${api_host}/departements/`)
      .then((response) => {
        if (response.status == 200) {
          setNPages(Math.ceil(response.data.total / response.data.per_page))
          setSectionsList(response.data.data);
          setLoadData(true);
        }
      })
      .catch((error) => {
        axiosErrorHandler(error)
      });

    setLoadData(true);
  }, []);

  const handleDelete = () => {
    axiosInstance.delete(`${api_host}/departements/${sectionId}/` , {
      headers : {
        "Authorization" : `Bearer ${auth.token}`
      }
    }).then(() => {
        setOpenDeleteSectionsModal(false);
        window.location.reload(false);
        
    }).catch(err => {
      axiosErrorHandler(err);
    })
  }

  return (
    <div className="w-full max-w-7xl_">
      <div className="flex gap-4 mb-6">
        <Link to={"/dashboard/sections/add"} className="btn btn-primary text-sm">
          إضافة قسم
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
                الوصف
              </th>
              <th scope="col" className="px-6 py-3">
                الإختصاص
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
            {sectionsList.length > 0 &&
              sectionsList.map(section => (
                <tr
                  key={section.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {section.name}
                  </th>

                  <td className="px-6 py-4">{section.description}</td>
                  <td className="px-6 py-4">{DOCTOR_SPECIALIZATION[section.specialization]}</td>
                  <td className="px-6 py-4">{section.created_at}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row items-center gap-4">
                    <button
                      className="font-medium btn btn-danger btn-sm"
                      onClick={() => {
                        setSectionId(section.id);
                        setOpenDeleteSectionsModal(true);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="font-medium text-white btn bg-blue-500 btn-sm"
                      onClick={() => {
                        navigate(`${section.id}/edit`)
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
        {loadData && sectionsList.length == 0 && (
          <h1 className="text-center bg-gray-200 dark:bg-gray-800 dark:text-white font-medium text-gray-800 p-4 w-full">
            لا يوجد مقاسم
          </h1>
        )}
      </div>

      <div className="p-5">
        <Paginator 
          dataSetter={setSectionsList}
          resources={"departements"}
          nPages={nPages}
        />
      </div>

      <ActionModal
        title={"حذف قسم"}
        open={openDeleteSectionsModal}
        close={setOpenDeleteSectionsModal}
        deleteAction={handleDelete}
      >
        <div className="h-full w-full flex justify-center items-center">
          <h1 className="text-4xl ">هل أنت متأكد من حذف القسم</h1>
        </div>
      </ActionModal>
    </div>
  );
}
