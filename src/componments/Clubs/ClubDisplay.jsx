import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClubDropdown = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const res = await fetch("http://localhost:5174/clubs/getClubs"); 
      const data = await res.json();
      setClubs(data);
    } catch (error){
      console.error("Error fetching clubs:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <div className="relative group">
      <button className="px-4 py-2 text-white hover:bg-blue-700 rounded transition-all">
        Clubs
      </button>
      <div className="absolute hidden group-hover:block bg-white text-black shadow-lg mt-2 rounded z-10 min-w-[150px]">
        {clubs.map((club) => (
          <Link
            key={club._id}
            to={`/club/${club.clubID}`}
            className="block px-4 py-2 hover:bg-gray-100"
          >
            {club.clubName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClubDropdown;
