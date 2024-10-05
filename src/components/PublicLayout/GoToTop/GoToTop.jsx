import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
export default function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top p-4 fixed bottom-4 z-40 left-4 rounded-full text-2xl m-1 duration-500 hover:scale-105 font-medium_ shadow-md text-white bg-gradient-to-r from-blue-800 to-blue-700"
        >
          <IoIosArrowUp />
        </button>
      )}
    </>
  );
}
