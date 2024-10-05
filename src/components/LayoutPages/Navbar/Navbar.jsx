import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FiBell } from "react-icons/fi";

export default function Navbar({ action }) {
  return (
    <div className="flex md:hidden justify-between items-center mx-3 backdrop-blur-md rounded-lg bg-white/50 dark:bg-gray-800/60 mb-1.5 px-3 py-3 h-fit sticky top-1">
      <button
        className="text-xl hover:bg-blue-600 hover:text-white rounded-md p-2 duration-150 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
        onClick={action}
      >
        <CgMenuLeft />
      </button>
      <h1 className="font-bold  md:text-md text-blue-950">
        <span>مستشفى الدكتور</span>
        <hr className="mb-1" style={{ borderColor: "rgb(22 101 175)" }} />
        <span>فرزات أيوب الجامعي</span>
      </h1>
      <button
        className={`relative invisible_ lg:visible text-xl hover:bg-blue-600 hover:text-white rounded-md p-2 duration-150 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600 notification`}
      >
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 border-2 border-white rounded-full top-0 end-0 dark:border-gray-900  dark:bg-blue-600">
          2
        </div>
        <FiBell />
      </button>
    </div>
  );
}
