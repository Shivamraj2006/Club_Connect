import React from "react";
import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="auth-container">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/signup" 
        fallbackRedirectUrl="/" 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          }
        }}
      />
      <p className="auth-footer">
        New user? <Link to="/sign-up">Create account</Link>
      </p>
    </div>
  );
};

export default Login;