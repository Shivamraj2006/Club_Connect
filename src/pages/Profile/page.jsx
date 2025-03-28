import React from "react";
import SideBar from "../../componments/Profile/SideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="mb-4 py-4 flex items-start justify-between gap-8">
      <div className="w-1/6">
        <SideBar />
      </div>
      <div className="w-5/6 max-h-auto min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
