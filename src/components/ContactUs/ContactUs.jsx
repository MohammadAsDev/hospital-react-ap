import { createAlert } from "components/Alert/Alert";
import InputField from "components/InputField/InputField";
import Map from "components/Map/Map";
import React, { useState } from "react";

const messageTemplate = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactUs() {
  const [messageForSend, setMessageForSend] = useState(messageTemplate);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (
      messageForSend.name === "" ||
      messageForSend.email === "" ||
      messageForSend.phone === "" ||
      messageForSend.message === ""
    ) {
      createAlert("warning", "جميع الحقول مطلوبة");
      return;
    }
  };

  const handleEditInput = (e) => {
    setMessageForSend({
      ...messageForSend,
      [e.name]: e.value,
    });
  };

  return (
    <div className="md:mt-52_ mt-24 md:mt-36 w-full max-w-7xl mx-auto py-4 px-8">
      <div className="flex mb-12 md:mb-16 justify-between items-center">
        <div className="flex items-end gap-3 ">
          <h5 className="text-blue-800 font-extrabold text-3xl md:text-4xl">
            {"تواصل معنا"}
          </h5>
          <div className=" w-10 h-fit mb-2 border md:border-[2px] border-gray-400"></div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 space-y-7 md:gap-4 ">
        <form
          className="md:max-w-80 flex flex-col gap-4 "
          onSubmit={handleSendMessage}
        >
          <InputField
            title={"الاسم"}
            id={"name"}
            value={messageForSend.name}
            onChange={handleEditInput}
          />
          <InputField
            title={"البريد الالكتروني"}
            id={"email"}
            value={messageForSend.email}
            onChange={handleEditInput}
          />
          <InputField
            title={"رقم الهاتف"}
            id={"phone"}
            value={messageForSend.phone}
            onChange={handleEditInput}
          />
          <div>
            {" "}
            <label className="text-sm font-medium dark:text-white text-gray-700">
              الرسالة
            </label>
            <textarea
              value={messageForSend.message}
              onChange={(e) => handleEditInput(e.target)}
              id="message"
              name="message"
              placeholder="اكتب الرسالة هنا ..."
              className="w-full h-48 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="btn btn-primary">ارسال</button>
        </form>
        <Map />
      </div>
    </div>
  );
}
