import { createAlert } from "components/Alert/Alert";
import axiosErrorHandler from "components/axiosErrorHandler";
import Paginator from "components/Paginator/Paginator";
import { api_host } from "config/api_host";
import { APPOINTMENT_STATUS } from "pages/MyAppointments/MyAppointments";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "services/axiosClient";


export default function MyPatients() {

    const navigate = useNavigate();

    const [appointmentsList , setAppointmentsList] = useState([]);
    const [nPages, setNPages] = useState(0);

    const NeedAcknowledgement = (status) => status == 0
    const AcceptedAppointment = 1;
    const RejectedAppointment = 2;

    useEffect(() => {
      axiosInstance.get(`${api_host}/appointements/me/patients/`)
      .then(response => {
        setNPages(Math.ceil(response.data.total / response.data.per_page));
        setAppointmentsList(response.data.data)
      }).catch(error => {
        axiosErrorHandler(error);
      })
    }, []);

    const handleAcceptAppointment = (appointmentId) => {
        axiosInstance.put(`${api_host}/appointements/me/patients/${appointmentId}`, {
          "status" : AcceptedAppointment
        })
        .then(() => {
            window.location.reload(true)
            createAlert("تم قبول الموعد")
        })
        .catch(err => {
            axiosErrorHandler(err);
        })
    }

    const handleRejectAppointment = (appointmentId) => {
        axiosInstance.put(`${api_host}/appointements/me/patients/${appointmentId}`, {
          "status" : RejectedAppointment
        })
        .then(() => {
            window.location.reload(true)
            createAlert("تم رفض الموعد")
        })
        .catch(err => {
            axiosErrorHandler(err);
        })
    }

    const AppointmentActions = ({appointmentId}) => (
        <div className="flex gap-4 justify-around p-3">
            <button
                name="accept"
                onClick={() => {
                    handleAcceptAppointment(appointmentId);
                }}
                className="text-white py-2 rounded-xl px-4 bg-green-600 hover:bg-green-700 duration-500">قبول</button>
            
            <button
                name="reject"
                onClick={() => {
                    handleRejectAppointment(appointmentId);
                }}
                className="text-white py-2 rounded-xl px-4 bg-red-600 hover:bg-red-700 duration-500">رفض</button>
        </div>
    );

    return (
        <div className="flex justify-center items-center w-full md:p-2 m-auto overflow-auto">
        <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md  my-16">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    اسم المريض
                  </th>
                  <th scope="col" className="px-6 py-3">
                    التاريخ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الفترة
                  </th>
                  <th scope="col" className="px-6 py-3">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {appointmentsList.map(appointment => (
                  <tr className="border cursor-pointer" onClick={event => {
                    if(event.target.name === "accept" || event.target.name === "reject") {
                      event.preventDefault();
                      event.stopPropagation();
                    } else{
                      navigate(`${appointment.appointment_id}`);
                    }
                  }}>
                    <th className="p-5">{appointment.patient.first_name} {appointment.patient.last_name}</th>
                    <th className="p-5">{appointment.appointment_date}</th>
                    <th className="p-5">{appointment.period}</th>
                    <th className="p-5 flex justify-center">
                      {
                        NeedAcknowledgement(appointment.status) ? 
                        <AppointmentActions appointmentId={appointment.appointment_id}/> : 
                        <p className={
                            "font-bold text-white rounded-2xl p-2  " 
                            + (appointment.status == 1 ? "bg-blue-600" : "bg-gray-600")
                          }>{APPOINTMENT_STATUS[appointment.status]}
                        </p>}
                      </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5">
            <Paginator 
              dataSetter={setAppointmentsList}
              resources={"appointements/me/patients"}
              nPages={nPages}
            />
          </div>
        </section>
      </div>
    )
}