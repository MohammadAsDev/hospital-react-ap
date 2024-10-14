import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LayoutPage, Spinner } from "../../components";
import { useSelector } from "react-redux";
import { isDoctor , isAdmin , isStaff } from "store/reducers/authReducer";
import VerificationCodes from "./VerificationCodes/VerificationCodes";

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

const Doctors = lazy(() => import("./Doctors/Doctors"));
const AddDoctor = lazy(() => import("./Doctors/AddDoctor/AddDoctor"));
const EditDoctor = lazy(() => import("./Doctors/EditDoctor/EditDoctor"))

const Nurses = lazy(() => import("./Nurses/Nurses"));
const AddNurse = lazy(() => import("./Nurses/AddNurse/AddNurse"));
const EditNurse = lazy(() => import("./Nurses/EditNurse/EditNurse"));

const Patients = lazy(() => import("./Patients/Patients"));

const Clinics = lazy(() => import("./Clinics/Clinics"));
const AddClinic = lazy(() => import("./Clinics/AddClinic/AddClinic"));
const EditClinic = lazy(() => import("./Clinics/EditClinic/EditClinic"))

const Sections = lazy(() => import("./Sections/Sections"));
const AddSection = lazy(() => import("./Sections/AddSection/AddSection"));
const EditSection = lazy(() => import("./Sections/EditSection/EditSection"));

const Error404 = lazy(() => import("../errors/Error404/Error404"));


export default function DashboardRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  const authorized = isAdmin(auth.role) || isDoctor(auth.role) || isStaff(auth.role)

  useEffect(() => {
    if (!authorized) {
      navigate("/unauthorized");
    }
  }, [location]);

  if (!authorized) {
    return null;
  }

  return (
    <LayoutPage>
      <Suspense fallback={<Spinner page />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />}/>
          <Route path="/doctors/:id/edit" element={<EditDoctor />} />
          <Route path="/doctors/add" element={<AddDoctor />} />

          <Route path="/nurses" element={<Nurses />} />
          <Route path="/nurses/add" element={<AddNurse />} />
          <Route path="/nurses/:id/edit" element={<EditNurse />} />

          <Route path="/sections" element={<Sections />} />
          <Route path="/sections/add" element={<AddSection />} />
          <Route path="/sections/:id/edit" element={<EditSection />} />
          <Route path="/sections/:department_id/doctors" element={<Doctors />} />

          <Route path="/patients" element={<Patients />} />

          <Route path="/clinics" element={<Clinics />} />
          <Route path="/clinics/add" element={<AddClinic />} />
          <Route path="/clinics/:id/edit" element={<EditClinic />} />
          
          <Route path="/verification_codes" element={<VerificationCodes />} />

          <Route path="*" element={<Error404 navigateTo={"/dashboard"} timer={10000} />} />

        </Routes>

      </Suspense>
    </LayoutPage>
  );
}
