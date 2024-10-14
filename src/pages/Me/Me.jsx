import { Spinner } from "components";
import axiosErrorHandler from "components/axiosErrorHandler";
import { DOCTOR_RATE, DOCTOR_SPECIALIZATION } from "components/Doctor/Doctor";
import { api_host } from "config/api_host";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "services/axiosClient";
import { isDoctor, isNurse } from "store/reducers/authReducer";

const ProfileElement = ({type , data}) => {
    console.log(data);
    return (
        <>
            <div className="flex flex-col items-center p-4 divide-y-4 divide-gray-400 gap-2">
                <div className="w-48 text-center">
                    <img src={data.profile_picture_path}></img>
                    <h2 className="text-3xl font-bold">مرحباً {data.first_name}!</h2>
                </div>
                <div className="md:flex md:items-start justify-center p-5 gap-2 h-full">
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-500 text-2xl">المعلومات الشّخصيّة:</h3>
                        <div className="flex flex-col gap-1">
                            <p>الاسم الأول: {data.first_name}</p>
                            <p>الاسم الأخير: {data.last_name}</p>
                            <p>تاريخ الميلاد: {data.birth_date}</p>
                            <p>العنوان: {data.address}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-500 text-2xl">المعلومات التواصل:</h3>
                        <div className="flex flex-col gap-1 px-5">
                            <p>البريد الإلكتروني: {data.email}</p>
                            <p>رقم الهاتف: {data.phone_number}</p>
                        </div>
                    </div>
                </div>

                {(isDoctor(type) || isNurse(type)) && (
                        <div className="text-center">
                        <h3 className="font-bold text-blue-600 text-2xl p-3">معلومات متعلّقة بالعمل:</h3>
                        <div className="md:flex md:items-start md:justify-center p-5 h-full text-center">
                            <div>
                                <div className="flex flex-col gap-2 px-5">
                                    <p>الإختصاص: {DOCTOR_SPECIALIZATION[data.specialization]}</p>
                                    <p>التقيم: {DOCTOR_RATE[data.specialization]}</p>
                                </div>
                            </div>

                            {
                                data.departement && (
                                <div>
                                    <div className="flex flex-col gap-2 px-5">
                                        <p>القسم: {data.departement.departement_name}</p>
                                        <p>إختصاص القسم: {DOCTOR_SPECIALIZATION[data.departement.specialization]}</p>
                                    </div>
                                </div>
                                )
                                
                            }
                        </div>
                        </div>
                    )}
            </div>
        </>
    )
}

export default function MyAccount() {
    const { auth } = useSelector(state => state.auth);
    const [currentUser, setCurrentUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(true);

    const resource = 
        isDoctor(auth.role) ? 
        "doctors" : 
        isNurse(auth.role) ? 
        "nurses" :
        "patients";
    
    useEffect(() => {
        axiosInstance.get(`${api_host}/${resource}/me/`)
        .then(response => {
            setCurrentUser(response.data);
            setIsLoaded(false);
        })
        .catch(error => {
            axiosErrorHandler(error);
        });
    }, [])

    return (
        <>
            {isLoaded ? (
                <Spinner/>
            ) : <ProfileElement type={auth.role} data={currentUser}/>}
        </>
    );
}