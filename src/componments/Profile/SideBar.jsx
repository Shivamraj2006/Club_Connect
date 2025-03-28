import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const SideBarlinks = [
    {
      name: "Dashboard",
      to: "/profile",
    },
    {
      name: "Favorites",
      to: "/profile/favorites",
    },
    {
      name: "Liked Blogs",
      to: "/profile/liked-blogs",
    },
  ];
  return (
    <div className="w-[100%] border-r flex flex-col gap-4 pr-4">
      {SideBarlinks.map((items, i) => (
        <Link to={items.to} className="hover:font-semibold" key={i}>
          {items.name}
        </Link>
      ))}
      <button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded w-[100%] text-center py-2 transition-all duration-300">
        LogOut
      </button>
    </div>
  );
};

export default SideBar;
