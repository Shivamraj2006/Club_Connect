import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/onboarding" // Standard post-signup flow
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
            socialButtonsBlockButton: 'border-gray-300 hover:bg-gray-50'
          }
        }}
      />
    </div>
  );
}