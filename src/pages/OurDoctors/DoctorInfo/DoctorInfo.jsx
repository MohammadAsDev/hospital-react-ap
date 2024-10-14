import React, { useEffect, useRef, useState } from "react";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { useParams } from "react-router-dom";
import { api_host } from "config/api_host";
import axiosInstance from "services/axiosClient";
import InputField from "components/InputField/InputField";
import { createAlert } from "components/Alert/Alert";
import axiosErrorHandler from "components/axiosErrorHandler";
import { useSelector } from "react-redux";
import { isPatient } from "store/reducers/authReducer";
import { ReactComponent as FreeAppointment } from "../../../assets/images/free-allocation.svg"
import { ReactComponent as AllocatedAppointment } from "../../../assets/images/allocated.svg"
import { ReactComponent as CloseImg } from "../../../assets/images/close.svg"
import { Spinner } from "components";

const APPOINTMENT_PERIOD = Object.freeze({
  0 : "9-10",
  1 : "10-11",
  2 : "11-12",
  3 : "12-13",
  4 : "13-14",
  5 : "14-15",
  6 : "15-16",
})


const PopUpWindow = ({Element , open=false , close}) => {

  const ref = useRef();

  console.log("test")
  console.log(close);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      close(false); // Close the modal or perform any other action
    }
  };

  const handleClick = (e) => {
    if (e.target === ref.current) {
      close(false);
    }
  };

  
  useEffect(() => {
    if (open) ref.current.focus();
  }, [open]);

  return (
        <div
          id="default-modal"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={ref}
          tabIndex="-1"
          aria-hidden="true"
          className="show-info-modal p-4 fixed top-0 right-0 bottom-0 left-0 z-40 flex md:justify-center items-center bg-gray-600 bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl  ">
            <div
              className="relative h-full bg-white rounded-lg shadow-md dark:bg-gray-900 grid grid-cols-1"
            >
            <div className="mx-5 my-3">
              <button onClick={() => close(false)}>
                <CloseImg/>
              </button>
            </div>
            {Element}  
            </div>
          </div>
        </div>
  );
}

const AppointmentForm = ({open = false, close}) => {
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("9-10");
  const { id } = useParams();

  console.log("form");
  console.log(close)

  const appointment = {
    date,
    period,
    "doctor_id" : id
  }

  const allocateAppointment = () => {
    if (date === "" || period === "") {
      createAlert("Warning" , "جميع الحقول مطلوبة")
      return ;
    }

    axiosInstance.post(`${api_host}/appointements/` , appointment).then(
      () => {
        close(false);
        createAlert("Success" , "تمّ طلب الموعد");
      }
    ).catch(
      (err) => {
        axiosErrorHandler(err);
      }
    )
  }

  return (
  <>
  { open &&
    <PopUpWindow open={open} close={close} Element={ 
      <>
      <h2 className="text-center py-5 text-lg font-bold">إضافة موعد جديد</h2>

      <div className="flex flex-col gap-4 p-8 justify-around">
        <InputField
          type="date"
          value={date}
          title={"التاريخ"}
          required={true}
          onChange={event => {
            setDate(event.value)
          }}
        />

        <InputField 
          type="select"
          title={"الفترة"}
          required={true}
          value={APPOINTMENT_PERIOD}
          onChange={event => {
            setPeriod(event.value)
          }}
        />
      </div>
  
  
      <div className="flex items-center justify-around h-12 px-4 md:px-5 p-1 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600">
  
        <button
            type="button"
            className="py-1 px-5 pb-1.5  font-bold text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-600 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:hover:bg-gray-800 dark:text-gray-50 dark:border-gray-600 dark:hover:text-white dark:bg-gray-700"
            onClick={allocateAppointment}
          >
            حجز
          </button>

      </div>
      </> 
    }
    />
  }
  </>
  )

}


const DoctorSchedule = ({open=false , close}) => {
  const { id } = useParams();
  const [appointmentsSchedule , setAppointmentSchedule] = useState([])
  const { auth } = useSelector(state => state.auth);
  const [isLoaded , setIsLoaded] = useState(false);

  const arabicTranslate = (dayName) => {
    switch(dayName.toLowerCase()) {
      case "sunday" : return "الأحد"
      case "monday" : return "الإثنين"
      case "tuesday" : return "الثلاثاء"
      case "wednesday" : return "الأربعاء"
      case "thursday" : return "الخميس"
      case "friday" : return "الجمعة"
      case "saturday" : return "السبت"
    }
  }

  useEffect(() => {
    if(isPatient(auth.role))
      axiosInstance.get(`${api_host}/appointements/schedule/doctors/${id}`).then(response => {
        setAppointmentSchedule(response.data)
        setIsLoaded(true);
      }).catch(error => createAlert("Error" , error))
  } , []);

  return(
    <>
      {open && 
        <PopUpWindow close={close} Element={
          <>
                <h2 className="text-center text-2xl p-5 font-bold text-gray-600">جدول المواعيد:</h2>

      <div className="flex justify-around text-center items-center">
        <div className="flex gap-3 items-center">
          <span>محجوز:</span>
          <AllocatedAppointment/>
        </div>
        <div className="flex gap-3 items-center">
          <span>متاح:</span>
          <FreeAppointment />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 w-full p-4">
        {
          isLoaded && (
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 text-slate-800">
                    <tr className="divide-x divide-gray-200 border rounded-lg">
                      <th className="font-bold px-8 py-2 text-lg text-blue-400">Date</th>
                      {
                        Object.values(APPOINTMENT_PERIOD).map(item => 
                          <th className="px-4 py-2">{item}</th>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                      {
                        Object.keys(appointmentsSchedule)
                        .filter(k => k != "working_time")
                        .map(k => <tr className="border border-gray-300">
                          <th className="font-bold">{appointmentsSchedule[k].date} ({arabicTranslate(appointmentsSchedule[k].day_name)})</th>
                        
                          {
                            Object.values(appointmentsSchedule[k].periods).map(isAllocatedPeriod => ( 
                                <th className="text-sm border border-gray-300">
                                  <div className="flex justify-center">
                                  {
                                    isAllocatedPeriod ? <AllocatedAppointment /> : <FreeAppointment />  
                                  }
                                  </div>
                                
                                </th>
                              )
                            )
                          }
                        </tr>)
                      }
                  </tbody>
                </table>
          )
        }
        
        { !isLoaded && <Spinner/> }

      </div>
          </>
        }/>
      }
    </>
  )
}


export default function DoctorInfo() {
  const { auth } = useSelector(state => state.auth);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false);
  const [openAppointmentSchedule, setAppointmentSchedule] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`${api_host}/doctors/${id}` , {
      headers : {
        "Content-Type" : "application/json"
      }
    }).then(response => {
      setDoctorInfo(response.data)
    })
  }, []);

  return (
    <div className="min-h-96 mt-28  w-full">
      <div className="m-10 p-10 w-full max-w-7xl  justify-center mx-auto flex flex-col md:flex-row gap-8">
        
        <div className="max-w-96 w-full overflow-hidden mx-auto md:mx-0 rounded-md">
          <img src={doctorInfo?.profile_picture_path} alt="" className="w-full object-cover" />
        </div>
        
        <div className="grid">
          
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">{doctorInfo.first_name + " " + doctorInfo.last_name}</h1>
            <span>التقييم: {doctorInfo.rate}/5</span>
            <p className="max-w-[500px]">{doctorInfo.short_description}</p>
          </div>
          
          {
            isPatient(auth.role) &&
            <div className="flex justify-between items-center m-5">
              <button
              onClick={() => setOpenAppointmentForm(true)} 
              className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 duration-150 text-center text-5">حجز موعد</button>
              
              <button 
              onClick={() => setAppointmentSchedule(true)}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 duration-150 text-center text-5">إطلاع على المواعيد</button>
            </div>
          }

          <div className=" mt-4 flex flex-col gap-5 items-center justify-center">
            <a className="flex items-center flex-row-reverse    w-60 px-2 py-1 rounded-lg bg-gradient-to-l from-blue-800 to-blue-700 hover:to-blue-600 duration-700 text-white gap-4" href={`mailto:${doctorInfo.email}`}>
              <MdOutlineAttachEmail />
              {doctorInfo.email}
            </a>
            
            <a className="flex items-center flex-row-reverse    w-60 px-2 py-1 rounded-lg bg-gradient-to-l from-blue-800 to-blue-700 hover:to-blue-600 duration-700 text-white gap-4" href={`tel:${doctorInfo.phone}`}>
              <MdOutlinePhone />
              {doctorInfo.phone_number}
            </a>  
          </div>

          <AppointmentForm
            open={openAppointmentForm}
            close={setOpenAppointmentForm}
          />
            
          <DoctorSchedule
            open={openAppointmentSchedule}
            close={setAppointmentSchedule}
          />


        </div>
      </div>
    </div>
  );
}
