import Accordion from "components/Accordion/Accordion";
import React from "react";

export default function Advice() {
  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            {"نصائح"}
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
      </div>

<Accordion/>

    </div>
  );
}
