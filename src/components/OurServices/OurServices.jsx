import React from "react";
import { Link } from "react-router-dom";

import { RiStethoscopeFill } from "react-icons/ri";
import { RiHistoryLine } from "react-icons/ri";
import { RiFirstAidKitFill } from "react-icons/ri";
import { RiMicroscopeFill } from "react-icons/ri";
import { RiCapsuleFill } from "react-icons/ri";

const servicesList = [
  { title: "حملة عيادات مجانية", icon: RiStethoscopeFill },
  { title: "خدمات على مدار الساعة", icon: RiHistoryLine },
  { title: "استقبال حالات اسعافية طارئة", icon: RiFirstAidKitFill },
  { title: "تحاليل مخبرية", icon: RiMicroscopeFill },
  { title: "صيدلية", icon: RiCapsuleFill },
];

export default function OurServices() {
  return (
    <div className="md:mt-64 w-full max-w-7xl mx-auto  py-4 px-8">
      <div className="flex mt-12 mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl"> خدماتنا</h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
        {/* <Link to={"#"} className="text-blue-800 text-xl">
          عرض الجميع
        </Link> */}
      </div>
      <div className="flex flex-wrap justify-evenly mt-8 gap-8">
        {servicesList.map((item) => (
          <div className="bg-gradient-to-l z-10 text-white flex flex-col justify-between p-6 items-center h-48 w-48 from-blue-800 to-blue-700 duration-700 shadow-lg shadow-blue-700 hover:-translate-y-2 rounded-md overflow-hidden">
            <item.icon className=" text-6xl" />
            <h5 className="text-center text-xl">{item.title}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
