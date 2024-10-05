import InputField from "components/InputField/InputField";
import {ReactComponent as VerifyImg}   from "../../../assets/images/verify.svg"
import { useState } from "react";
import axiosInstance from "services/axiosClient";
import { api_host } from "config/api_host";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "store/reducers/authReducer";
import axiosErrorHandler from "components/axiosErrorHandler";

export default function Verify() {

    const dispatch = useDispatch();
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    const handleVerify = (event) => {
        event.preventDefault();
        const verifyForm = new FormData();
        verifyForm.append("token" , verificationCode);
        axiosInstance.post(`${api_host}/patients/confirm/` , verifyForm)
        .then(() => {
            dispatch(logout());
            navigate("/login")
        }).catch((error) => {
            axiosErrorHandler(error)
        });
    }

    return (
        <>
            <div className="p-5 flex flex-col items-center gap-9">
                <VerifyImg className=""/>
                <h2 className="text-center font-bold text-gray-600 text-5xl">قم بتأكيد حسابك</h2>
                <form className="flex flex-col items-center gap-10">
                    <InputField 
                    value={verificationCode}
                    onChange={(event) => setVerificationCode(event.value)}
                    direction="ltr"
                    title={"كود التأكيد"}
                    required={true}
                    />
                    <div>
                        <button
                        onClick={handleVerify}
                        className="text-center w-full px-5 py-3 bg-blue-600 text-white text-lg rounded-xl ">تأكيد</button>
                    </div>
                </form>
            </div>
        </>
    );
}