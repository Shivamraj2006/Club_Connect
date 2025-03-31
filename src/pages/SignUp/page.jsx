// import React from "react";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   const [Inputs, setInputs] = React.useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const change = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...Inputs, [name]: value });
//   };
//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div className="lg:w-[40%] md:w-[60%] w-[80%] p-12 shadow-2xl rounded flex flex-col items-center justify-center">
//         <div className="text-2xl flex flex-col lg:flex-row  gap-2 text-center">
//           <h1 className="font-bold">Welcome!</h1>
//           <span>SignUp as New User</span>
//         </div>
//         <form action="" className="flex flex-col w-[100%] mt-8">
//           <div className="flex flex-col mb-4">
//             <label>UserName</label>
//             <input
//               type="text"
//               value={Inputs.username}
//               name="username"
//               className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
//               required
//               onChange={change}
//             />
//           </div>
//           <div className="flex flex-col mb4">
//             <label>Email</label>
//             <input
//               type="email"
//               value={Inputs.email}
//               name="email"
//               className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
//               required
//               onChange={change}
//             />
//           </div>
//           <div className="flex flex-col mb4">
//             <label>Password</label>
//             <input
//               type="password"
//               value={Inputs.password}
//               name="password"
//               className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
//               required
//               onChange={change}
//             />
//           </div>
//           <div className="flex mt-4">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-[100%]">
//               SignUp
//             </button>
//           </div>
//         </form>
//         <h4 className="mt-8">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-blue-600 hover:text-blue-700 font-semibold"
//           >
//             Login
//           </Link>
//         </h4>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

/*
import React from "react";
import { Link } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react"; 
import { SignIn, useUser } from "@clerk/clerk-react";

const SignUpPage = () => {
  const { isSignedIn } = useUser();
    if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="w-full max-w-md p-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Club<span className="text-blue-600">Connect</span>
          </h1>
            <SignIn />
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="lg:w-[40%] md:w-[60%] w-[90%] p-8 md:p-12 shadow-lg rounded-xl bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Join <span className="text-blue-600">ClubConnect</span>
          </h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="mb-6">
          <SignUp 
            path="/sign-up"
            routing="path"
            signInUrl="/login"
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none border-none bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
                socialButtonsBlockButtonText: 'text-gray-700',
                dividerLine: 'bg-gray-300',
                dividerText: 'text-gray-500',
                formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                footerActionText: 'text-gray-600',
                footerActionLink: 'text-blue-600 hover:text-blue-700'
              }
            }}
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

*/



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignUp, SignIn, useUser } from "@clerk/clerk-react";

const SignUpPage = () => {
  const { isSignedIn, user } = useUser();

  const syncUserToBackend = async (user) => {
    try {
      const res = await fetch("http://localhost:5174/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress,
          username: user.username || user.firstName,
          profilePic: user.imageUrl,
        }),
      });

      if (!res.ok) {
        console.error("Error syncing user to backend");
      }
    } catch (error) {
      console.error("Failed to sync user:", error);
    }
  };


  useEffect(() => {
    if (isSignedIn && user) {
      syncUserToBackend(user);
    }
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="w-full max-w-md p-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Club<span className="text-blue-600">Connect</span>
          </h1>
          <SignIn />
        </div>
      </div>
    );
  }


  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="lg:w-[40%] md:w-[60%] w-[90%] p-8 md:p-12 shadow-lg rounded-xl bg-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Join <span className="text-blue-600">ClubConnect</span>
          </h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="mb-6">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/login"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-none bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border border-gray-300 hover:bg-gray-50",
                socialButtonsBlockButtonText: "text-gray-700",
                dividerLine: "bg-gray-300",
                dividerText: "text-gray-500",
                formFieldInput:
                  "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                footerActionText: "text-gray-600",
                footerActionLink: "text-blue-600 hover:text-blue-700",
              },
            }}
          />
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Log in instead
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
