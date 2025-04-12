import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const cat = [
    {
      name: "Academics",
      to: "/academics",
      bg: "bg-orange-200",
    },
    {
      name: "Internships",
      to: "/internships",
      bg: "bg-indigo-200",
    },
  ];
  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4 ">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cat.map((items, i) => (
          <Link
            key={i}
            className={`me-4 px-4 py-2 text-center text-normal md:text-xl font-semibold ${items.bg} rounded`}
            to={items.to}
          >
            {items.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
