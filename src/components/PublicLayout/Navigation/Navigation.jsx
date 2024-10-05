import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiStethoscopeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { isAdmin , isStaff , isPatient, isDoctor , isAnonymous } from "store/reducers/authReducer";
import { ReactComponent as Account } from "../../../assets/images/account.svg"

export default function Navigation() {
  
  const { auth } = useSelector(state => state.auth);
  
  const [isOpenNavigation, setIsOpenNavigation] = useState(true);

  const isNormalUser = !(isAdmin(auth.role) || isStaff(auth.role))
  const needVerification = isAnonymous(auth.role)

  if (!auth.isLoggedIn) return;
  if (needVerification) return;

  return (
    <div className="fixed bottom-4 z-40 right-4">
      <div className="relative">
        <button
          onClick={() => setIsOpenNavigation((prev) => !prev)}
          className="shadow-md p-4 z-50 relative rounded-full text-2xl m-1 duration-500 hover:scale-105 font-medium text-white bg-gradient-to-l from-blue-800 to-blue-700"
        >
          <RiStethoscopeFill />
        </button>
          {isNormalUser && <>
            <Link
              to={"/me"}
              title="حسابي"
              className={`shadow-md p-4 z-20 bottom-full right-0 m-1 absolute rounded-full text-2xl duration-500 hover:scale-105 font-medium text-white bg-gradient-to-l from-blue-800 to-blue-700 ${
                isOpenNavigation && "!bottom-0"
              }`}
            >
              <Account />
            </Link>
          </>}

          {isDoctor(auth.role) && (
          <>
            <Link
              to={"/my-patients"}
              title="عرض المواعيد"
              className={`shadow-md p-4 z-20 rounded-full right-full text-2xl absolute m-1 duration-500 hover:scale-105 font-medium text-white bg-gradient-to-l from-blue-800 to-blue-700 ${
                isOpenNavigation && "!right-0"
              }`}
            >
              <FaRegCalendarAlt />
            </Link>{" "}
          </>
        )}

        {isPatient(auth.role) && (
          <>
            <Link
              to={"/my-appointments"}
              title="عرض المواعيد"
              className={`shadow-md p-4 z-20 rounded-full right-full text-2xl absolute m-1 duration-500 hover:scale-105 font-medium text-white bg-gradient-to-l from-blue-800 to-blue-700 ${
                isOpenNavigation && "!right-0"
              }`}
            >
              <FaRegCalendarAlt />
            </Link>{" "}
          </>
        )}
        {isAdmin(auth.role) || isStaff(auth.role) ? (
          <>
            <Link
              to={"/dashboard"}
              title="لوحة التحكم"
              className={`shadow-md p-4 z-0 bottom-full right-0 m-1 absolute rounded-full text-2xl duration-500 hover:scale-105 font-medium text-white bg-gradient-to-l from-blue-800 to-blue-700 ${
                isOpenNavigation && "!bottom-0"
              } `}
            >
              <LuLayoutDashboard />
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}
