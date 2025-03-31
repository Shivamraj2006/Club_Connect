import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Standard session persistence
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/welcome'); // Public landing
    }
  }, [isLoaded, isSignedIn]);

  // Auto-sync user to backend (industry standard)
  useEffect(() => {
    if (isSignedIn) {
      const syncUser = async () => {
        const token = await getToken();
        fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            clerk_id: user.id,
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName,
            image_url: user.imageUrl
          })
        });
      };
      syncUser();
    }
  }, [isSignedIn, user]);

  return children;
};