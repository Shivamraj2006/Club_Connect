import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/" // Standard post-login redirect
      />
    </div>
  );
}