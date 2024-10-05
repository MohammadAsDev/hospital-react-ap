import { createAlert } from "components/Alert/Alert";
import axiosErrorHandler from "components/axiosErrorHandler";
import InputField from "components/InputField/InputField";
import { api_host } from "config/api_host";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "services/axiosClient";


export default function RoutineTestForm() {

    const { id } = useParams();     // appointment's id

    const routineTestTemplate = {
        body_temperature : "",
        pulse_rate : "",
        breathing_rate : "",
        medical_notes : "",
        prescription : ""
    }

    const [test , setTest] = useState(routineTestTemplate);    

    const navigate = useNavigate();

    const handleInput = (event) => {
        setTest({
            ...test,
            [event.name] : event.value
        })
        console.log(event.name)
        console.log(event.value)
    }

    const handleCreateTest = (event) => {
        event.preventDefault();
        axiosInstance.post(`${api_host}/appointements/me/patients/${id}/tests` , test)
        .then(() => {
            createAlert("Success" , "تمّ إضافة إختبار جديد");
            navigate(`/my-patients/${id}`);
        }).catch(error => {
            axiosErrorHandler(error);
        })
    }

    return (
        <div className="flex flex-col p-5 gap-8">
            <h2 className="text-center text-3xl font-bold text-blue-600">إضافة إختبار دوري جديد:</h2>
            <form>
                <div className="flex flex-col items-center md:items-stretch md:p-5 gap-6">
                    <InputField 
                        title="درجة حرارة الجسم"
                        type="text"
                        id="body_temperature"
                        value={test.body_temperature}
                        direction="ltr"
                        onChange={handleInput}
                        required={true}
                    />
                    <InputField 
                        title="معدل ضربات القلب"
                        type="text"
                        id="pulse_rate"
                        value={test.pulse_rate}
                        direction="ltr"
                        onChange={handleInput}
                        required={true}
        
                    />
                    <InputField 
                        title="معدل التنفس"
                        type="text"
                        id="breathing_rate"
                        value={test.breathing_rate}
                        direction="ltr"
                        onChange={handleInput}
                        required={true}
                    />

                    <InputField
                        title={"الوصفة الدوائيّة"}
                        type="textarea"
                        placeholder={"أدخل الوصفة الدوائية هنا"}
                        id={"prescription"}
                        value={test.prescription}
                        onChange={handleInput}
                    />

                    <InputField
                        title={"الملاحظات الطبيّة"}
                        type="textarea"
                        placeholder={"أدخل الملاحظات الدوائية هنا"}
                        id={"medical_notes"}
                        value={test.medical_notes}
                        onChange={handleInput}
                    />

                    <button 
                    onClick={handleCreateTest}
                    className="text-white font-bold bg-blue-600 px-5 py-2 rounded-lg">إنشاء</button>
                </div>
            </form>
        </div>
    )
}