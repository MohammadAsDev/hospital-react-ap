import React from "react";
import { Link } from "react-router-dom";

export const DOCTOR_SPECIALIZATION = Object.freeze({
  0 : 'تخدير' ,
  1 : 'جلديَّة' ,
  2 : 'داخليّة',
  3 : 'عصبيّة' ,
  4 : 'جراحة' ,
})


export const DOCTOR_RATE = Object.freeze({
  0 : 'متدرب' ,
  1 : 'مبتدأ' ,
  2 : 'خبرة متوسطة',
  3 : 'خبير' ,
  4 : 'محترف' ,
})

export default function Doctor({ info }) {
  return (
    <div className=" w-48 shadow-lg shadow-blue-700  bg-gradient-to-l from-blue-800 to-blue-700 rounded-md overflow-hidden">
      <Link to={`/our-doctors/${info.id}`}>
        <div className="overflow-hidden">
          <img
            src={info?.image}
            alt=""
            className="mx-auto duration-700 hover:scale-110 hover:rotate-2"
          />
        </div>{" "}
        <div className=" text-white flex flex-col items-center p-2 gap-2">
          <img src={info?.profile_picture_path}/>
          <h5>{info?.first_name + " " + info?.last_name}</h5>
          <p>{DOCTOR_SPECIALIZATION[info?.specialization]}</p>
        </div>
      </Link>
    </div>
  );
}
