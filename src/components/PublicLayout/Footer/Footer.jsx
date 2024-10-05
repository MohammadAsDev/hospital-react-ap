import logo from "./../../../assets/images/logo2.png";

import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { MdLocalPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-blue-800 to-blue-700 mt-36">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col gap-12 md:flex-row-reverse md:justify-between">
          <div className="flex flex-row-reverse justify-center md:justify-end items-center ">
            <img src={logo} alt="logo" className="w-16 md:w-20 " />
            <div className="font-bold  md:text-md text-gray-100/95">
              <span>مستشفى الدكتور</span>
              <hr className="mb-1 border-gray-100/95" />
              <span>فرزات أيوب الجامعي</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 text-center md:text-right gap-8 sm:gap-6 sm:grid-cols-1">
            <div>
              <h2 className="mb-6 text-sm text-white font-bold uppercase ">
                الأقسام
              </h2>
              <ul className="text-gray-300/75 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    العناية المركزة
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    الصيدلية
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm text-white font-bold uppercase ">
                خدماتنا
              </h2>
              <ul className="text-gray-300/75  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    تحاليل مخبرية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    خدمات على مدار الساعة
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm text-white font-bold uppercase ">
                التواصل
              </h2>
              <ul className="text-gray-300/75  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline flex items-center gap-4 justify-center md:justify-start">
                    <FaFacebookF />
                    <p>فيسبوك</p>
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline flex items-center gap-4 justify-center md:justify-start">
                    <FaWhatsapp />
                    <p>واتساب</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline flex items-center gap-4 justify-center md:justify-start">
                    <MdLocalPhone />
                    <p>اتصال</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <div className="flex justify-center items-center">
          <span className="text-sm text-gray-300 sm:text-center ">
            <a href="#" className="hover:underline">
              مستشفى الدكتور فرزات أيوب الجامعي
            </a>
            . جميع الحقوق محفوظة. © 2024{" "}
          </span>
        </div>
      </div>
    </footer>
  );
}
