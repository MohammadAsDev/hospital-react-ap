import React from "react";
import hpu from "./../../assets/images/hpu.jpg";

export default function AboutUs() {
  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            حول
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid  md:grid-cols-2 w-full mt-8">
        <div className="p-8 flex bg-gray-100 justify-center items-center">
          <h5 className="text-2xl">
            افتتح مشفى الدكتور فرزات ايوب بجامعة الحواش الخاصة في منطقة وادي
            النصارة بريف حمص الغربي عام{" "}
            <p className="text-blue-800 inline">٢٠٢٠</p> وتم تسليمه الى كلية
            الطب البشري في الجامعة ليصبح مشفى تعليميا لطلاب كلية الطب ويقدم
            خدماته الطبية والعلاجية للمواطنين بطاقة استعابية تبلغ{" "}
            <p className="text-blue-800 inline">110</p> أسرة ويضم عيادات خارجية
            بكل الاختصاصات الطبية .
          </h5>{" "}
        </div>
        <div>
          <img src={hpu} alt="" />
        </div>
      </div>
      
    </div>
  );
}
