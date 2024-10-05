import axiosErrorHandler from "components/axiosErrorHandler";
import InputField from "components/InputField/InputField";
import { api_host } from "config/api_host";
import { useState } from "react";
import axiosInstance from "services/axiosClient";


export default function VerificationCodes() {
    const [ssn, setSsn] = useState("");
    const [code, setCode] = useState("0000000000");

    const getCode = () => {
        axiosInstance.post(`${api_host}/verify_tokens/search/` , {
            ssn
        }).then(response => {
            setCode(response.data.verify_token);
        }).catch(error => {
            axiosErrorHandler(error);
        });
    }

    return (
        <>
            <section className="w-full max-w-7xl p-6 mx-auto bg-white md:rounded-md shadow-md dark:bg-gray-800 my-auto md:my-6">
                <div className="flex flex-col gap-7">
                    <div>
                        <h3 className="text-gray-500 text-sm md:text-lg">أدخل الرقم الوطني الخاص بالمريض بشكل كامل:</h3>
                    </div>
                    <div className="flex justify-center items-end gap-7">
                        <div>
                            <InputField
                            title={"الرقم الوطني"}
                            required={true}
                            value={ssn}
                            onChange={event => setSsn(event.value)}
                            />
                        </div>
                        <div>
                            <button 
                            onClick={getCode}
                            className="bg-blue-600 px-5 py-2 rounded-lg text-white">البحث</button>
                        </div>
                    </div>
                    <div>
                        <p  className="text-center text-gray-500">كود التوثيق: <span className="text-blue-500">{code}</span></p>
                    </div>
                </div>
            </section>
        </>
    );
}