import React from "react";
import logo from "./../../../assets/images/logo.png";
export default function TopSection() {
  return (
    <div className="py-2 bg-gray-100">
      <div className="max-w-7xl mx-auto flex items-center">
        <img src={logo} alt="logo" className="w-28" />
        <div className="font-bold text-2xl text-blue-950">
          <span>مستشفى الدكتور</span>
          <hr className="mb-1" style={{ borderColor: "rgb(22 101 175)" }} />
          <span>فرزات أيوب الجامعي</span>
        </div>
      </div>
    </div>
  );
}
