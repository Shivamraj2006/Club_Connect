import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componments/Navbar/Navbar";
import Footer from "../componments/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="px-12 md:px-32 lg:px-64">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
