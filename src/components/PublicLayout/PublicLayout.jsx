import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";
import GoToTop from "./GoToTop/GoToTop";

export default function PublicLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Navigation/>
      <GoToTop/>
      <Footer />
    </div>
  );
}
