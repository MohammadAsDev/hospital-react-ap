import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api_host } from "config/api_host";
import { DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import axiosInstance from "services/axiosClient";

export default function OurDoctors() {

  const [bestDoctors , setBestDoctors] = useState([]);

  const generateDoctorCard = (doctor) => {
    return (
      <>
        <Link to={`our-doctors/${doctor.id}`} className="mx-auto w-72 shadow-lg shadow-blue-700   bg-gradient-to-l from-blue-800 to-blue-700 shadow-md rounded-md overflow-hidden">
          <div className="overflow-hidden">
            <img src={doctor.profile_picture_path} alt="" className="mx-auto duration-700 hover:scale-110 hover:rotate-2" />
          </div>
          <div className=" text-white flex flex-col items-center p-2 gap-2">
            <h5>{doctor.first_name + " " +  doctor.last_name}</h5>
            <p>{DOCTOR_SPECIALIZATION[doctor.specialization]}</p>
          </div>
        </Link>
      </>
    );
  }

 useEffect(() => {
   axiosInstance.get(`${api_host}/statistics/best_doctors/`)
  .then(response => {
    setBestDoctors(response.data.data)
  })
  .catch(err => {
    console.log(err)  
  })
 } , [])

  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            {" "}
            أطبائنا
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
        <Link to={"/our-doctors"} className="text-blue-800 text-lg md:text-xl">
          عرض الجميع
        </Link>
      </div>
      <div className="flex flex-wrap justify-center mt-8 gap-8 md:gap-3">
        {bestDoctors.map(doctor => generateDoctorCard(doctor))}
      </div>
    </div>
  );
}
