import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "components";
import { api_host } from "config/api_host";
import { DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import axiosInstance from "services/axiosClient";
import FindDoctor from "components/FindDoctor/FindDoctor";
import Paginator from "components/Paginator/Paginator";


export default function OurDoctors() {    // needs pagination
  const [doctorsList, setDoctorsList] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [nPages, setNPages] = useState(0);

  useEffect(() => {

      axiosInstance
      .get(`${api_host}/doctors`)
      .then((response) => {
        if (response.status === 200) {
          setNPages(Math.ceil(response.data.total / response.data.per_page))
          setDoctorsList(response.data.data);
          setLoadData(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }, []);

  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      
      <FindDoctor />


      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            أطبائنا
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center_ mt-8 gap-8 md:gap-5">
       {loadData ?  doctorsList.length > 0 &&
          doctorsList.map(doctor => (
            <Link
              key={doctor.id}
              to={`/our-doctors/${doctor.id}`}
              className="mx-auto_ w-72  bg-blue-800 shadow-md rounded-md overflow-hidden"
            >
              <img src={doctor.profile_picture_path} alt="" className="mx-auto" />{" "}
              <div className=" text-white flex flex-col items-center p-2 gap-2">
                <h5>{doctor.first_name + " " + doctor.last_name}</h5>
                <p>{DOCTOR_SPECIALIZATION[doctor.specialization]}</p>
              </div>
            </Link>
          )) : <Spinner page />}
      </div>
      <div className="p-5">
        <Paginator dataSetter={setDoctorsList} resources={"doctors"} nPages={nPages}/>
      </div>
    </div>
  );
}
