import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useClerk, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
  };

  const [MobileNav, setMobileNav] = useState(false);
  
  // All links now shown for authenticated users
  const links = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "All Blogs",
      to: "/all-blogs",
    },
    {
      name: "Profile",
      to: "/profile",
    },
  ];

  return (
    <nav className="relative flex items-center justify-between py-4 border-b border-zinc-200">
      <div className="w-3/6 lg:w-2/6 brandName">
        <Link to="/" className="text-xl font-bold">
          ClubConnect
        </Link>
      </div>
      <div className="w-4/6 hidden lg:flex items-center justify-end">
        {links.map((items, i) => (
          <Link
            to={items.to}
            className="ms-4 hover:text-blue-600 transition-all duration-300"
            key={i}
          >
            {items.name}
          </Link>
        ))}
        
        <button
          onClick={handleSignOut}
          className="ms-4 bg-red-500 rounded px-4 py-1 text-zinc-100 hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
      <div className="w-3/6 lg:hidden flex items-center justify-end">
        <button className="text-3xl" onClick={() => setMobileNav(!MobileNav)}>
          <VscThreeBars />
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 nav-bg backdrop-blur-md h-screen w-full p-8 ${
          MobileNav ? "flex flex-col translate-y-[0%]" : "translate-y-[-100%]"
        } transition-all duration-300`}
      >
        <div>
          <button className="text-3xl" onClick={() => setMobileNav(!MobileNav)}>
            <RxCross2 />
          </button>
        </div>
        <div className="h-[100%] flex flex-col items-center justify-center">
          {links.map((items, i) => (
            <Link
              to={items.to}
              className="mb-4 text-4xl hover:text-blue-600 transition-all duration-300"
              key={i}
              onClick={() => setMobileNav(false)}
            >
              {items.name}
            </Link>
          ))}
          
          <button
            onClick={() => {
              handleSignOut();
              setMobileNav(false);
            }}
            className="text-4xl bg-red-500 rounded px-8 py-4 text-zinc-100 hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;