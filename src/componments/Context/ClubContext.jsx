import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // or your preferred HTTP client

const ClubsContext = createContext();

export const ClubsProvider = ({ children }) => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('/api/clubs'); // Replace with your API endpoint
        setClubs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  return (
    <ClubsContext.Provider value={{ clubs, loading, error }}>
      {children}
    </ClubsContext.Provider>
  );
};

export const useClubs = () => useContext(ClubsContext);