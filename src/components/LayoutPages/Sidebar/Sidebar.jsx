import { CgMenuLeft } from "react-icons/cg";
import { FiBell } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

import { useSelector } from "react-redux";
import "./Sidebar.scss";
import GroupLinks from "./sidebarCompo/SidebarGroupLinks/SidebarGroupLinks.component";

const listLinks = [
  { title: "الرئيسية", url: "/dashboard", icon: LuLayoutDashboard },
  { title: "الأقسام", url: "/dashboard/sections", icon: LuLayoutDashboard },
  { title: "الأطباء", url: "/dashboard/doctors", icon: LuLayoutDashboard },
  { title: "الغرف الداخليّة", url: "/dashboard/clinics", icon: LuLayoutDashboard },
  { title: "المرضى", url: "/dashboard/patients", icon: LuLayoutDashboard },
  { title: "الممرضين", url: "/dashboard/nurses", icon: LuLayoutDashboard },
  { title: "رموز التوثيق", url: "/dashboard/verification_codes", icon: LuLayoutDashboard },
];

const listLinks2 = [
  { title: "خروج", url: "/", icon: MdLogout },
];

export default function Sidebar({ handleStateSidebar }) {
  const sidebarState = useSelector((state) => state.layout.layoutState);

  return (
    <>
      {sidebarState == "openSmall" ? (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-gray-900/50 right-0"
          onClick={() => handleStateSidebar()}
        ></div>
      ) : null}
      <aside
        className={`${sidebarState} fixed top-0 ltr:left-0 rtl:right-0-0 z-40 lg:w-64 md:w-16 w-0 h-full duration-150 sidebar`}
      >
        <div
          className="grid grid-cols-1 h-full md:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 sidebar-content"
          style={{ gridTemplateRows: "min-content auto min-content" }}
        >
          <div
            className={`w-full flex md:flex-col lg:flex-row items-center justify-between overflow-hidden  sidebar-head`}
          >
            <button
              className="text-xl hover:bg-blue-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
              onClick={handleStateSidebar}
            >
              <CgMenuLeft />
            </button>
            <h1 className="font-bold  md:text-md text-blue-950">
              <span>مستشفى الدكتور</span>
              <hr className="mb-1" style={{ borderColor: "rgb(22 101 175)" }} />
              <span>فرزات أيوب الجامعي</span>
            </h1>
            <button
              className={`relative invisible_ lg:visible text-xl hover:bg-red-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600 notification`}
            >
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 border-2 border-white rounded-full -top-[2px] -left-[2px] dark:border-gray-900 dark:bg-blue-600">
                2
              </div>
              <FiBell />
            </button>
          </div>
          <GroupLinks list={listLinks} />
          <GroupLinks list={listLinks2} />
        </div>
      </aside>
    </>
  );
}
