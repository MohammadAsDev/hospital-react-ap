import axios from "axios";
import { Spinner } from "components";
import { createAlert } from "components/Alert/Alert";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import fingerprint from "./../../../assets/images/fingerprent.png";
import { api_host } from "./../../../config/api_host";
import { isAnonymous, login } from "./../../../store/reducers/authReducer";
import axiosErrorHandler from "components/axiosErrorHandler";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  // axios.interceptors.response.use((response) => response, axiosErrorHandler);
  const dispatch = useDispatch();
  const [onSendRequest, setOnSendRequest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const getTokenRole = (token) => {
    const claims = jwtDecode(token);
    return claims.role;
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (onSendRequest) return;
    setOnSendRequest(true);

    if (email === "" || password === "") {
      createAlert("Warning", "يرجى ادخال جميع الحقول");
      setOnSendRequest(false);
      return;
    }

    if (password.length < 8) {
      createAlert(
        "Warning",
        "يجب ان تكون كلمة المرور مكونة من 8 محارف او أكثر"
      );
      setOnSendRequest(false);
      return;
    }

    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);

    await axios
      .post(`${api_host}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          createAlert("Success", "تم تسجيل الدخول");
          dispatch(login(response.data)); 
          const role = getTokenRole(response.data.access_token);
          if (isAnonymous(role)) {
            navigate("/verify");
          } else {
            navigate("/")
          }
        }
      })
      .catch((error) => {
        axiosErrorHandler(error)
      });

    
    setOnSendRequest(false);
  };

  return (
    <div
      className="flex justify-center items-center w-full md:p-2 mt-28 overflow-auto"
      id="login-page"
    >
      <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          تسجيل الدخول
        </h2>
        <div className="md:grid grid-cols-2 gap-4">
          <form onSubmit={handleSubmitLogin}>
            <div className="flex flex-col gap-6 mt-4">
              <div>
                <label className="text-gray-700 dark:text-gray-200">
                  البريد الالكتروني
                </label>
                <input
                  id="emailAddress"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ direction: "ltr" }}
                />
              </div>

              <div className="relative">
                <label className="text-gray-700 dark:text-gray-200">
                  كلمة المرور
                </label>
                <input
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ direction: "ltr" }}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="hover:bg-slate-300 p-2 rounded-md absolute cursor-pointer bottom-[5px] right-[5px]"
                >
                  {!showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <h1 className="text-xs mt-6 text-center cursor-context-menu dark:text-white">
              ليس لديك حساب؟{" "}
              <Link to={"/register"} className="text-blue-500 font-semibold">
                سجل الأن
              </Link>
            </h1>

            <div className="flex justify-end mt-6">
              {!onSendRequest ? (
                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  دخول
                </button>
              ) : (
                <Spinner />
              )}
            </div>
          </form>
          <div className="hidden md:block">
            <img src={fingerprint} alt="" className="m-auto max-w-72" />
          </div>
        </div>
      </section>
    </div>
  );
}
