// import React from "react";
// import { SignIn, useUser } from "@clerk/clerk-react";
// import Header from "../../componments/Home/Header";
// import Categories from "../../componments/Home/Categories";
// import RecentBlogs from "../../componments/Home/RecentBlogs";

// const Home = () => {
//   const { isSignedIn } = useUser();
  
//   if (!isSignedIn) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
//         <div className="w-full max-w-md p-6">
//           <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
//             Club<span className="text-blue-600">Connect</span>
//           </h1>
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200">
//             <SignIn />
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <Header />
//       <Categories />
//       <RecentBlogs />
//     </div>
//   );
// };

// export default Home;


// src/pages/Home/page.jsx
import React from "react";
import Header from "../../componments/Home/Header";
import Categories from "../../componments/Home/Categories";
import RecentBlogs from "../../componments/Home/RecentBlogs";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Categories />
      <RecentBlogs />
    </div>
  );
};

export default Home;