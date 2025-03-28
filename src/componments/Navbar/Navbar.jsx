import React from "react";
import { Link } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

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
  {
    name: "Login",
    to: "/login",
  },
];

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState(false);
  return (
    <nav className="relative flex items-center justify-between py-4 border-b border-zinc-200">
      <div className=" w-3/6 lg:w-2/6 brandName">
        <Link to="/" className="text-xl font-bold">
          ClubConnect
        </Link>
      </div>
      <div className="w-4/6 hidden lg:flex items-center justify-end ">
        {links.map((items, i) => (
          <Link
            to={items.to}
            className="ms-4 hover:text-blue-600 transition-all duration-300"
            key={i}
          >
            {items.name}
          </Link>
        ))}
        <Link
          to="/signup"
          className="ms-4 bg-black rounded px-4 py-1 text-zinc-100  hover:bg-blue-600 transition-all duration-300"
        >
          SignUp
        </Link>
      </div>
      <div className="w-3/6 lg:hidden flex items-center justify-end ">
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
            >
              {items.name}
            </Link>
          ))}
          <Link
            to="/signup"
            className="text-4xl bg-black rounded px-8 py-4 text-zinc-100  hover:bg-blue-600 transition-all duration-300"
          >
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
