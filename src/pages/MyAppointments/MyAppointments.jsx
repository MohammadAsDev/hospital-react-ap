import axiosErrorHandler from "components/axiosErrorHandler";
import Paginator from "components/Paginator/Paginator";
import { api_host } from "config/api_host";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosClient";

export const APPOINTMENT_STATUS =  Object.freeze({
  0 : "بإنتظار القبول",
  1 : "تمّ قبول الحجز",
  2 : "تمّ رفض الحجز",
  3 : "متأخر" 
});

export default function MyAppointments() {

  const [appointmentsList , setAppointmentsList] = useState([]);
  const [nPages, setNPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`${api_host}/appointements/me/`)
    .then(response => {
      setNPages(Math.ceil(response.data.total / response.data.per_page));
      setAppointmentsList(response.data.data)
    }).catch(error => {
      axiosErrorHandler(error);
    })
  }, []);

  return (
    <div className="flex justify-center items-center w-full md:p-2 m-auto overflow-auto">
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md  my-16">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  اسم الطبيب
                </th>
                <th scope="col" class="px-6 py-3">
                  القسم
                </th>
                <th scope="col" class="px-6 py-3">
                  التاريخ
                </th>
                <th scope="col" class="px-6 py-3">
                  الفترة
                </th>
                <th scope="col" class="px-6 py-3">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {appointmentsList.map(appointment => (
                <tr className="border cursor-pointer" onClick={() => navigate(`${appointment.appointment_id}`)}>
                  <th className="p-5">{appointment.first_name} {appointment.last_name}</th>
                  <th className="p-5">{appointment.departement_name}</th>
                  <th className="p-5">{appointment.appointment_date}</th>
                  <th className="p-5">{appointment.period}</th>
                  <th className="p-5 flex justify-center">
                    <p className={
                        "font-bold text-white rounded-2xl p-2  " 
                        + (appointment.status == 1 ? "bg-blue-600" : "bg-gray-600")
                      }>{APPOINTMENT_STATUS[appointment.status]}
                    </p>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5">
          <Paginator 
            resources={"appointements/me"}
            dataSetter={setAppointmentsList}
            nPages={nPages}
          />
        </div>
      </section>
    </div>
  );
}
