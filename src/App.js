import Alert from "components/Alert/Alert";
import PublicLayout from "components/PublicLayout/PublicLayout";
import Home from "pages/Home/Home";
import MyAccount from "pages/Me/Me";
import Verify from "pages/auth/Verify/Verify";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner } from "./components";
import { Error401, Error404 } from "./pages/errors";
import { useSelector } from "react-redux";
import { isAdmin , isStaff , isAnonymous , isPatient, isDoctor } from "store/reducers/authReducer";

const DashboardRouter = lazy(() =>
  import("./pages/DashboardRouter/DashboardRouter")
);

const Login = lazy(() => import("./pages/auth/Login/Login"));
const Register = lazy(() => import("./pages/auth/Register/Register"));


const Reservation = lazy(() => import("./pages/Reservation/Reservation"));

const MyAppointments = lazy(() =>
  import("./pages/MyAppointments/MyAppointments")
);



const MyPatients = lazy(() => 
  import("pages/MyPatients/MyPatients")
);

const RoutineTestForm = lazy(() => 
  import("pages/RoutineTestForm/RoutineTestForm")
);

const AppointmentDetails = lazy(() => 
  import("pages/AppointmentDetails/AppointmentDetails")
);

const Contact = lazy(() => 
  import("pages/Contact/Contact")
);


const OurDoctors = lazy(() => import("./pages/OurDoctors/OurDoctors"));
const DoctorInfo = lazy(() =>
  import("./pages/OurDoctors/DoctorInfo/DoctorInfo")
);

function App() {
  
  const { auth } = useSelector(state => state.auth);

  const isAnonymousUser = isAnonymous(auth.role);
  const isVerifiedUser = !isAnonymousUser;

  return (
    <Suspense fallback={<Spinner page />}>
      <Routes>
        {
          (
            isAdmin(auth.role)    || 
            isStaff(auth.role)
          ) 
          &&
          <Route path="/dashboard/*" element={<DashboardRouter />} />
        }

        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <>
              <Route path="/" element={<Home />} />
              <Route path="/our-doctors" element={<OurDoctors />} />
              <Route path="/our-doctors/:id" element={<DoctorInfo />} />
          </>
          {
            isAnonymousUser && 
            <Route path="/verify" element={<Verify />} />
          }
          {
            isVerifiedUser && 
            <Route path="/me" element={<MyAccount />} />
          }
          {
            isPatient(auth.role) &&
            <>
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/my-appointments" element={<MyAppointments />} />
              <Route path="/my-appointments/:id" element={<AppointmentDetails />} />
            </>
          }
          {
            isDoctor(auth.role) &&
            <>
              <Route path="/my-patients" element={<MyPatients />} />
              <Route path="/my-patients/:id" element={<AppointmentDetails />} />
              <Route path="/my-patients/:id/tests" element={<RoutineTestForm/>}/>
            </>
          }
          <Route
            path="/unauthorized"
            element={<Error401 navigateTo={"/"} timer={10000} />}
          />
          <Route
            path="*"
            element={<Error404 navigateTo={"/"} timer={10000} />}
          />
        </Route>
      </Routes>
      <Alert />
    </Suspense>
  );
}

export default App;
