import Advice from "components/Advice/Advice";
import ContactUs from "components/ContactUs/ContactUs";
import OurDoctors from "components/OurDoctors/OurDoctors";
import OurSections from "components/OurSections/OurSections";
import OurServices from "components/OurServices/OurServices";
import { Element } from "react-scroll";
import welcome from "./../../assets/images/welcome.jpg";
import Welcome from "components/Welcome/Welcome";
import AboutUs from "components/AboutUs/AboutUs";

export default function Home() {
  return (
    <div>
      <Element name="section1">
        <div className="">
          <img src={welcome} alt="" className="w-full" />
        </div>
        <Welcome/>
      </Element>
      <Element name="section2" className="pt-1">
        <OurServices />
      </Element>
      <Element name="section3" className="pt-1">
        <OurDoctors />
      </Element>
      <Element name="section4" className="pt-1">
        <AboutUs />
      </Element>
      <Element name="section5" className="pt-1">
        <OurSections />
      </Element>
      <Element name="section6" className="pt-1">
        <Advice />
      </Element>
    </div>
  );
}
