import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Link as RLink } from "react-router-dom";
import { logout } from "store/reducers/authReducer";
import { isPatient , isDoctor } from "store/reducers/authReducer";
import logo from "./../../../assets/images/logo2.png";
import { api_host } from "config/api_host";
import axiosInstance from "services/axiosClient";

const mainNavbarItems = [
  {
    title: "الرئيسية",
    url: "section1",
  },
  {
    title: "الخدمات",
    url: "section2",
  },
  {
    title: "أطبائنا",
    url: "section3",
  },
  {
    title: "حول",
    url: "section4",
  },
  {
    title: "اقسامنا",
    url: "section5",
  },
  {
    title: "النصائح",
    url: "section6",
  },
  {
    title: "تواصل معنا",
    url: "/contact",
    is_external : true
  },
];

const patientLinks = [
  {
    title: "الرئيسية",
    url: "/",
  },
  {
    title: "مواعيدي",
    url: "/my-appointments",
  },
];

const doctorLinks = [
  {
    title: "الرئيسية",
    url: "/",
  },
  {
    title: "المرضى",
    url: "/my-patients",
  },
]

const registrationNavbarItems = [
  {
    title: "تسجيل الدخول",
    url: "/login",
  },
  {
    title: "تسجيل مريض جديد",
    url: "/register",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { auth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toggleNavbar = () => setIsOpen(!isOpen);
  const closeNavbar = () => setIsOpen(false);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  // need to be handled
  const handleLogout = () => {
    axiosInstance.post(
      `${api_host}/auth/logout`,{} , {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${auth.token}`
        },
      }
    )
    .then(() => {
      dispatch(logout())
      navigate("/login");
    })
    .catch(err => console.log(err))
  };

  return (
    <>

      <div className="sticky md:relative top-0 z-50 py-2 h-20 md:h-28 bg-gray-100 flex">
        
        <div className="max-w-7xl w-full flex-row-reverse mx-auto flex justify-between md:justify-start items-center">
          
          {/* Large screen navbar */}
          <div className="flex flex-row-reverse items-center ">
            
            <img src={logo} alt="logo" className="w-16 md:w-20 " />
            
            <div className="font-bold  md:text-md text-blue-950">
              <span>مستشفى الدكتور</span>
              <hr className="mb-1" style={{ borderColor: "rgb(22 101 175)" }} />
              <span>فرزات أيوب الجامعي</span>
            </div>
          
          </div>
          
          {/* Mobile interface navbar */}
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center m-6 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-multi-level"
            aria-expanded={isOpen}>
            {isOpen ? (
              <AiOutlineClose className="text-xl" />
            ) : (
              <AiOutlineMenu className="text-xl" />
            )}
          </button>

        </div>
      
      </div>

      {/* Closing button */}
      {
        isOpen && 
        (
          <div
            onClick={closeNavbar}
            className="h-dvh w-dvw fixed top-0 bottom-0 ring-0 left-0 bg-transparent z-40">
          </div>
        )
      }

      {/* Navigation Bar */}
      <nav className=" bg-gray-100 fixed w-full shadow-sm md:sticky top-20 md:top-0 border-gray-200 z-50">
        
        <div
          className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ${
            isOpen && "py-4"
          } md:py-4 px-6`}
        >

          <div
            className={`w-full md:w-auto ${isOpen ? "" : "hidden"} md:block`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent gap-1">
              {location.pathname == "/" ? (
                mainNavbarItems.map((item, index) => (
                  <li
                    key={index}
                    className={`md:pb-[2px] cursor-pointer md:hover:bg-gradient-to-l from-blue-800 to-blue-700 bg-clip-padding
                      ${activeIndex == index && "md:bg-gradient-to-r"}
                    `}
                  >
                    {
                      item.is_external ?
                      <RLink
                      to={item.url}
                      smooth={true}
                      duration={500}
                      className={`block py-2 px-3 bg-gray-100 hover:bg-gray-200 md:hover:bg-gray-100 text-black  rounded md:rounded-none md:p-0 `}
                      onClick={() => {
                        setActiveIndex(index);
                        if (location.pathname != "/") navigate("/");
                      }}
                    >
                      {item.title}
                    </RLink>
                    :
                    <Link
                      to={item.url}
                      smooth={true}
                      duration={500}
                      className={`block py-2 px-3 bg-gray-100 hover:bg-gray-200 md:hover:bg-gray-100 text-black  rounded md:rounded-none md:p-0 `}
                      onClick={() => {
                        setActiveIndex(index);
                        if (location.pathname != "/") navigate("/");
                      }}
                    >
                      {item.title}
                    </Link>
                    }
                    
                  </li>
                ))
              ) : isPatient(auth.role) ? (
                patientLinks.map((item, index) => (
                  <li
                    key={index}
                    className={`md:pb-[2px] cursor-pointer md:hover:bg-gradient-to-l from-blue-800 to-blue-700 bg-clip-padding
                 ${location.pathname == item.url && "md:bg-gradient-to-r"}
                `}
                  >
                    <RLink
                      to={item.url}
                      className={`block py-2 px-3 bg-gray-100 hover:bg-gray-200 md:hover:bg-gray-100 text-black  rounded md:rounded-none md:p-0  
                        `}
                    >
                      {item.title}
                    </RLink>
                  </li>
                ))
              ) : isDoctor(auth.role) ? 
                
                doctorLinks.map((item, index) => (
                  <li
                    key={index}
                    className={`md:pb-[2px] cursor-pointer md:hover:bg-gradient-to-l from-blue-800 to-blue-700 bg-clip-padding
                 ${location.pathname == item.url && "md:bg-gradient-to-r"}
                `}
                  >
                    <RLink
                      to={item.url}
                      className={`block py-2 px-3 bg-gray-100 hover:bg-gray-200 md:hover:bg-gray-100 text-black  rounded md:rounded-none md:p-0  
                        `}
                    >
                      {item.title}
                    </RLink>
                  </li>
                ))
              
              : (
                <li
                  className={`md:pb-[2px] cursor-pointer md:hover:bg-gradient-to-l from-blue-800 to-blue-700 bg-clip-padding`}
                >
                  <RLink
                    to={"/"}
                    className={`block py-2 px-3 bg-gray-100 hover:bg-gray-200 md:hover:bg-gray-100 text-black  rounded md:rounded-none md:p-0  
                    `}
                  >
                    الرئيسية
                  </RLink>
                </li>
              )}
            </ul>
          </div>

          <div
            className={`w-full md:w-auto ${isOpen ? "" : "hidden"} md:block`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent gap-1">
              {!auth.isLoggedIn ? (
                registrationNavbarItems.map((item, index) => (
                  <li key={index}>
                    <RLink
                      to={item.url}
                      className={`block py-2 px-3 text-nowrap md:text-center md:w-16_ md:py-1 md:bx-2 text-white bg-gradient-to-l from-blue-800 to-blue-700 rounded md:hover:bg-transparent md:hover:from-blue-700 md:hover:to-blue-600  
                        ${
                          location.pathname == item.url &&
                          "from-blue-700 to-blue-600 "
                        }
                       `}
                    >
                      {item.title}
                    </RLink>
                  </li>
                ))
              ) : (
                <li>
                  <button
                    onClick={() => handleLogout()}
                    className={`block py-2 px-3 md:text-center w-full md:w-16 md:py-1 md:bx-2 text-white bg-gradient-to-l from-blue-800 to-blue-700 rounded md:hover:bg-transparent md:hover:from-blue-700 md:hover:to-blue-600`}
                  >
                    خروج
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
