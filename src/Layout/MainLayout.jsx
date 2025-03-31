import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../componments/Navbar/Navbar";
import Footer from "../componments/Footer/Footer";

// const MainLayout = () => {
//   return (
//     <div className="px-12 md:px-32 lg:px-64">
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// };

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-300 ${
      isOpen ? "ml-64" : "ml-0"
    }`}>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <main className={`flex-1 transition-all duration-300 ${
        isOpen ? "pl-8" : "pl-0"
      } px-12 md:px-32 lg:px-64`}>
        <Outlet />
      </main>
      
      <Footer className={`transition-all duration-300 ${
        isOpen ? "pl-8" : "pl-0"
      } px-12 md:px-32 lg:px-64`} />
    </div>
  );
};

export default MainLayout;
