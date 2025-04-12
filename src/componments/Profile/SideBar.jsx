import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaHeart, FaThumbsUp } from "react-icons/fa";

const SideBar = () => {
  const SideBarlinks = [
    {
      name: "Dashboard",
      to: "/profile",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Favorites",
      to: "/profile/favorites",
      icon: <FaHeart />,
    },
    {
      name: "Liked Blogs",
      to: "/profile/liked-blogs",
      icon: <FaThumbsUp />,
    },
  ];

  return (
    <div className="w-full border-r flex flex-col gap-4 pr-4 bg-white rounded-lg shadow-md p-4">
      {SideBarlinks.map((item, i) => (
        <Link to={item.to} className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded transition-all duration-300" key={i}>
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
      <button className="bg-red-600 hover:bg-red-500 text-white rounded w-full text-center py-2 transition-all duration-300">
        LogOut
      </button>
    </div>
  );
};

export default SideBar;