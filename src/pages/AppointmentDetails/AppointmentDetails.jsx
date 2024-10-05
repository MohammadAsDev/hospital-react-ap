import axiosErrorHandler from "components/axiosErrorHandler";
import { api_host } from "config/api_host";
import { APPOINTMENT_STATUS } from "pages/MyAppointments/MyAppointments";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "services/axiosClient";
import { isDoctor } from "store/reducers/authReducer";
import { ReactComponent as BreathImg } from "../../assets/air.svg"
import { ReactComponent as PulseImg } from "../../assets/pulse.svg"
import { ReactComponent as TemperatureImg } from "../../assets/temperature.svg"
import { DOCTOR_RATE, DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";


const TestElement = ({test}) => {
    return (
        <div>
            <div 
            className="bg-gray-300 p-5 rounded-2xl flex flex-col gap-6">
                    <div className="flex min-[320px]:flex-col md:flex-row justify-between min-[320px]:gap-9 md:gap-24">
                        <div className="flex flex-row justify-between gap-5 items-center">
                            <BreathImg/>
                            <p>معدل التنفس: {test.breathing_rate}</p>
                        </div>
                        <div className="flex flex-row justify-between gap-5 items-center">
                            <PulseImg/>
                            <p>معدل ضربات القلب: {test.pulse_rate}</p>
                        </div>
                        <div className="flex flex-row justify-between gap-5 items-center">
                            <TemperatureImg/>
                            <p>درجة الحرارة (C): {test.body_temperature}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <p>تاريخ الإنشاء: {test.created_at}</p>
                    </div>
            </div>
            {
                test.prescription || test.medical_notes  ? (
                <div className="bg-sky-100 relative bottom-3 rounded-2xl -z-10">
                    {
                        test.prescription ? (<div className="p-3">
                            <div>
                                <h3 className="text-2xl">الوصفة الطبية:</h3>
                            </div>
                            <div className="px-4">
                                {test.prescription}
                            </div>
                        </div>) : <></>
                    }
                    {
                        test.medical_notes ? (
                            <div className="p-3">
                                <div>
                                    <h3 className="text-2xl">الملاحظات الطبية:</h3>
                                </div>
                                <div className="px-4">
                                    {test.medical_notes}
                                </div>
                            </div>
                        ) : <></>
                    }
                </div>
                ) : <></>
            }
        </div>
    );
}

const DoctorAppointment = ({patient, data}) => {
  
    const [isLoaded, setIsLoaded] = useState(false);
    const [routineTests, setRoutineTests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get(`${api_host}/tests/me/patients/${patient.id}`).then(
            response => {
                setIsLoaded(true);
                setRoutineTests(response.data);
            }
        ).catch(error => {
            axiosErrorHandler(error)
        })
    }, patient.id)

    return (
        <>
        <div className="flex md:flex-row min-[320px]:flex-col justify-around p-5 items-center">
            <div>
                <h3 className="font-bold text-3xl py-4">المعلومات الشّخصيّة:</h3>
                <div className="flex justify-between items-center gap-8">
                    <div className="w-48">
                        <img src={patient.profile_picture_path}/>
                    </div>
                    <div>
                        <h3>اسم المريض: {patient.first_name + " " + patient.last_name}</h3>
                        <h3>تاريخ الميلاد: {patient.birth_date}</h3>
                        <h3>الجنس: {patient.gender == 0 ? "ذكر" : "أنثى"}</h3>
                    </div>

                </div>
            </div>
            
            <div className="text-center p-4">
                <h3 className="font-bold text-3xl">معلومات الموعد:</h3>
                <div className="flex flex-col items-center gap-2">
                    <h3>تاريخ الموعد: {data.appointment_date}</h3>
                    <h3>الفترة: {data.appointment_date}</h3>
                    <h3>حالة الموعد: {APPOINTMENT_STATUS[data.status]}</h3>
                </div>
            </div>
        </div>
        {
            data.status === 1 && (
            <div className="flex justify-center">
                <button 
                onClick={() => navigate("tests")}
                className="text-white bg-blue-600 p-3 rounded-xl hover:bg-blue-700 duration-500 my-5">
                    إنشاء إختبار    
                </button>
            </div>
            )
        }
        
        {
            routineTests.length > 0 && isLoaded && (
                <div className="flex flex-col items-center gap-6">
                    <h2 className="font-bold text-2xl text-blue-600">الإختبارات الخاصَّة بالمريض:</h2>
                    {
                        routineTests.map(test => <TestElement test={test} />)
                    }
                </div>                    
            )
        }
        </>
    )
}

const PatientAppointment = ({doctor, data}) => {

    return (
        <>
        <div className="flex md:flex-row min-[320px]:flex-col justify-around p-5 items-center">
            <div>
                <h3 className="font-bold text-3xl py-4">المعلومات الشّخصيّة:</h3>
                <div className="flex justify-between items-center gap-8">
                    <div className="w-48">
                        <img src={doctor.profile_picture_path}/>
                    </div>
                    <div>
                        <h3>اسم الطبيب: {doctor.first_name + " " + doctor.last_name}</h3>
                        <h3>رقم الهاتف: {doctor.phone_number}</h3>
                        <h3>البريد الإلكتروني: {doctor.email}</h3>
                        <h3>الإختصاص: {DOCTOR_SPECIALIZATION[doctor.specialization]}</h3>
                        <h3>التقيم: {DOCTOR_RATE[doctor.rate]}</h3>
                    </div>

                </div>
            </div>
            
            <div className="p-5 text-center">
                <h3 className="font-bold text-3xl">معلومات الموعد:</h3>
                <div className="flex flex-col items-center md:items-start gap-2">
                    <h3>تاريخ الموعد: {data.appointment_date}</h3>
                    <h3>الفترة: {data.appointment_date}</h3>
                    <h3>حالة الموعد: {APPOINTMENT_STATUS[data.status]}</h3>
                </div>
            </div>
        </div>
        </>
    )
}

export default function AppointmentDetails() {
    const { id } = useParams()

    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [doctorDetails, setDoctorDetails] = useState({});
    const [patientDetails, setPatientDetails] = useState({});

    const { auth } = useSelector(state => state.auth);
    const resource = isDoctor(auth.role) ? "me/patients" : "me";

    useEffect(() => {
        axiosInstance.get(`${api_host}/appointements/${resource}/${id}/`).then((response) => {
            setAppointmentDetails(response.data)
            setDoctorDetails(response.data.doctor)
            setPatientDetails(response.data.patient)
        }).catch((error) => {
            axiosErrorHandler(error);
        })
    }, [])

    return (
        <>
            {
                isDoctor(auth.role) ? 
                <DoctorAppointment patient={patientDetails} data={appointmentDetails}/> : 
                <PatientAppointment doctor={doctorDetails} data={appointmentDetails}/>
            }
        </>
    );
}