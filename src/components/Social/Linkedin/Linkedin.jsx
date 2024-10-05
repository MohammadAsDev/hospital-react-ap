import React from "react";
import "./Linkedin.scss";
import { FaLinkedinIn } from "react-icons/fa6";

export default function Linkedin() {
  return (
    <div className="tooltip-container group relative cursor-pointer transition-all rounded-lg text-lg m-1">
      <div className="tooltip absolute top-0 left-1/2 -translate-x-1/2 p-2 opacity-0 pointer-events-none transition-all rounded-xl group-hover:-top-[150px] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto">
        <div className="profile p-2">
          <div className="user">
            <div className="img">Ui</div>
            <div className="details">
              <div className="name">User</div>
              <div className="username">@usernasssssme</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text">
        <a
          className="icon no-underline text-white block relative group-hover:-rotate-[35deg] group-hover:skew-x-[20deg]"
          href="https://freecodez.com/"
        >
          <div className="layer w-[55px] h-[55px] transition-transform">
            <span className="absolute top-0 left-0 h-full w-full border rounded-md transition-all"></span>
            <span className="absolute top-0 left-0 h-full w-full border rounded-md transition-all"></span>
            <span className="absolute top-0 left-0 h-full w-full border rounded-md transition-all"></span>
            <span className="absolute top-0 left-0 h-full w-full border rounded-md transition-all"></span>
            <span className="fab fa-linkedin absolute top-0 left-0 h-full w-full border rounded-md transition-all">
              <FaLinkedinIn />
            </span>
          </div>
          <div className="text">LinkedIn</div>
        </a>
      </div>
    </div>
  );
}
