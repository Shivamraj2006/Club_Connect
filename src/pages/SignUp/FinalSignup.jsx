import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUp, useUser, useAuth } from "@clerk/clerk-react";

const SignUpPage = () => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Standard user sync to backend
  const syncUser = async () => {
    const token = await getToken();
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress, // Fixed email access
        username: user.username || user.firstName,
        profilePic: user.imageUrl
      })
    });
  };

  // Handle post-signup flow
  useEffect(() => {
    if (isSignedIn) {
      syncUser();
      navigate('/'); // Standard redirect
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="auth-container">
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/login" // Standard sign-in link
        fallbackRedirectUrl="/" // Required for OAuth flows
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
            socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50'
          }
        }}
      />
      <p className="auth-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUpPage;