import React from "react";
import { SignOutButton } from "@clerk/clerk-react";

const LogoutPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Ready to log out?</h1>
        <SignOutButton redirectUrl="/login">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default LogoutPage;
