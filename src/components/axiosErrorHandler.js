// axiosErrorHandler.js

import { useNavigate } from "react-router-dom";
import { createAlert } from "./Alert/Alert";

const axiosErrorHandler = (error) => {


  if (error) {
    console.log("-=-=- axios handler start work -=-=-");
    console.log("=_= from axios handler =>", error.response);
    if (error.response.status === 401) {
      createAlert("Error", "مستخدم غير مصرح به");
      // window.location.href = "/forbidden";
      // alert("Authentication not allowed");
    } else if (error.response.status === 422) {
      Object.values(error.response.data.errors).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          createAlert("Warning", errorMessage);
        });
      });
    } else if (error.response.status === 400) {
      const detailsMsg = error.response.data.details;
      createAlert("Error" , detailsMsg);
    } else {
      if (error.response.data.type) {
        createAlert(error.response.data.type, error.response.data.message);
      }
    }
    console.log(error);
    console.log("-=-=- axios handler end work -=-=-");
  }
};

export default axiosErrorHandler;
