import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Doctor from "components/Doctor/Doctor";
import axios from "axios";
import { api_host } from "config/api_host";

export default function FindDoctor() {
  // const [doctorsList, setDoctorsList] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorsResult, setDoctorsResult] = useState([]);



  const searchDoctor = (name) => {
    axios.get(`${api_host}/doctors/search?name=${name}`)
    .then((response) => {
      if (response.status == 200) {
        setDoctorsResult(response.data.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-around md:my-2 py-2 md:py-4 px-8 md:rounded-md w-full md:max-w-7xl h-24 md:h-52  bg-blue-800_ bg-gradient-to-l from-blue-800 to-blue-700">
        <div className="flex items-end gap-3 ">
          <h5 className="text-white font-bold md:text-4xl"> ابحث عن طبيب </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>

        <form className="w-full">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              className="block w-full p-2 pl-14 md:text-2xl text-gray-900 border outline-0 border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-100 "
              placeholder="ادخل اسم الدكتور"
              required
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                searchDoctor(doctorName)
              }}
              className="text-white absolute end-2.5 bottom-1 md:bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg p-2 "
            >
              <FaSearch />
            </button>
            {doctorsResult.length > 0 && (
              <div className=" bg-gray-50 shadow-md rounded-md absolute top-full w-full mt-1 flex flex-wrap justify-center max-h-96 overflow-auto gap-4 p-4 z-20">
                {doctorsResult.length > 0 && doctorsResult.map((doctor, index) => <Doctor info={doctor} key={index} />)}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
