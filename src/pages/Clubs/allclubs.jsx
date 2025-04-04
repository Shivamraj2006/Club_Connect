import React from "react";
import { Link } from "react-router-dom";

const clubsList = [
  { name: "ACM", slug: "acm", logo: "/images/acm.png" },
  { name: "IDS", slug: "ids", logo: "/images/ids.png" },
  { name: "IVEE", slug: "ivee", logo: "/images/ivee.png" },
  { name: "AXIS", slug: "axis", logo: "/images/axis.png" },
  { name: "AAC", slug: "aac", logo: "/images/aac.png" },
  { name: "MagCom", slug: "magcom", logo: "/images/magcom.png" },
];

const AllClubs = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Explore Our Clubs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {clubsList.map((club, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center 
                       transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={club.logo}
              alt={`${club.name} Logo`}
              className="w-24 h-24 object-contain mb-4"
              onError={(e) => (e.target.style.display = "none")}
            />

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{club.name}</h2>

            <Link
              to={`/clubs/${club.slug}`}
              className="mt-auto bg-blue-500 text-white px-5 py-2 rounded-lg text-lg font-medium
                         hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Visit Club
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClubs;
