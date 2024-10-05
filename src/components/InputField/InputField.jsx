import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function InputField({
  title,
  id,
  value,
  onClick,
  placeholder,
  onChange,
  pull = false,
  type = "text",
  direction = "rtl",
  required = false,
  isDisabled = false,
  autocomplete = "new-password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (type == "textarea") {
    return (
    <div>
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
        {required ? (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        ) : (
          ""
        )}
      </label>
      <textarea
      id={id} 
      name={id}
      rows="4" 
      value={value}
      onChange={event => onChange(event.target)}
      required={required}
      style={{ direction: direction }}
      isDisabled={isDisabled}
      placeholder={placeholder}
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    </div>
    

    )
  }

  else if (type == "date")
    return (
      <div className={pull ? "md:col-span-2" : ""}>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {title}
        </label>
        {required ? (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        ) : (
          ""
        )}
        <input
          id={id}
          name={id}
          type={type}
          placeholder={title}
          required={required}
          autoComplete={autocomplete}
          onChange={(e) => onChange(e.target)}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
      </div>
    );

  if (type == "select")
    return (
      <div className={pull ? "md:col-span-2" : ""}>
        <label className="text-sm font-medium dark:text-white text-gray-700">
          {title}
        </label>
        {required ? (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        ) : (
          ""
        )}
        <select
          className="block disabled:bg-gray-200 w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          id={id}
          name={id}
          onChange={(e) => onChange(e.target)}
        >
          {Object.entries(value).map((entry) => {
            return <option id={entry[0]}>{entry[1]}</option>;
          })}
        </select>
      </div>
    );

  if (type == "file")
    return (
      <div className={pull ? "md:col-span-2" : ""}>
        <label className="text-sm font-medium dark:text-white text-gray-700">
          {title}
        </label>
        {required ? (
          <span className="text-red-600 font-bold dark:text-green-600">*</span>
        ) : (
          ""
        )}
        <input
          className=" w-full mt-2 file:outline-none file:border-0 file:dark:bg-gray-800 file:bg-gray-50  file:py-1 file:px-2 file:rounded-full file:dark:text-white file:text-gray-700 file:mr-3 file:shadow-none file:cursor-pointer bg-gray-200 dark:bg-gray-600 px-5 py-3 rounded-lg  cursor-pointer hover:bg-slate-300 hover:dark:bg-slate-500 "
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          autoComplete={autocomplete}
          onChange={(e) => onChange(e.target.files[0])}
          required={required}
        />
      </div>
    );
  return (
    <div className={pull ? "md:col-span-2 relative" : "relative"}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {title}
      </label>
      {required ? (
        <span className="text-red-600 font-bold dark:text-green-600">*</span>
      ) : (
        ""
      )}
      <input
        id={id}
        name={id}
        type={type == "password" ? (!showPassword ? "password" : "text") : type}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300
         rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500
          dark:focus:border-blue-500 focus:outline-none focus:ring
          disabled:bg-gray-200 "
        style={{ direction: direction }}
        value={value}
        autoComplete={autocomplete}
        onChange={(e) => onChange(e.target)}
        required={required}
        disabled={isDisabled}
      />
      {type == "password" ? (
        <span
          title="عرض/اخفاء كلمة المرور"
          onClick={() => setShowPassword((prev) => !prev)}
          className="hover:bg-slate-300 p-2 rounded-md absolute cursor-pointer bottom-[5px] right-[5px]"
        >
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      ) : null}
    </div>
  );
}
