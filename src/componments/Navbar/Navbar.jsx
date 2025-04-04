// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { VscThreeBars } from "react-icons/vsc";
// import { useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { useClerk, useUser } from "@clerk/clerk-react";

// const Navbar = ({logined}) => {
//   const { signOut } = useClerk();
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     await signOut();
//     navigate("/sign-in");
//   };

//   const [MobileNav, setMobileNav] = useState(false);

//   // All links now shown for authenticated users
//   const links = [
//     {
//       name: "Home",
//       to: "/",
//     },
//     {
//       name: "All Blogs",
//       to: "/all-blogs",
//     },
//     {
//       name: "Profile",
//       to: "/profile",
//     },
//   ];

//   return (
//     <nav className="relative flex items-center justify-between py-4 border-b border-zinc-200">
//       <div className="w-3/6 lg:w-2/6 brandName">
//         <Link to="/" className="text-xl font-bold">
//           ClubConnect
//         </Link>
//       </div>
//       <div className="w-4/6 hidden lg:flex items-center justify-end">
//         {links.map((items, i) => (
//           <Link
//             to={items.to}
//             className="ms-4 hover:text-blue-600 transition-all duration-300"
//             key={i}
//           >
//             {items.name}
//           </Link>
//         ))}
//         {
//           !logined && <Link
//           to="/new-blog"
//           className="ms-4 hover:text-blue-600 transition-all duration-300"
//         >
//           Add Blog
//         </Link>
//         }
//       {!logined && <Link
//         to="/login"
//         className="ms-4 bg-black rounded px-4 py-1 text-zinc-100  hover:bg-blue-600 transition-all duration-300"
//       >
//         Login
//       </Link>}

//       {!logined && <Link
//         to="/signup"
//         className="ms-4 bg-black rounded px-4 py-1 text-zinc-100  hover:bg-blue-600 transition-all duration-300"
//       >
//         SignUp
//       </Link>}

//         {logined && <button
//           onClick={handleSignOut}
//           className="ms-4 bg-red-500 rounded px-4 py-1 text-zinc-100 hover:bg-red-600 transition-all duration-300"
//         >
//           Logout
//         </button>}
//       </div>
//       <div className="w-3/6 lg:hidden flex items-center justify-end">
//         <button className="text-3xl" onClick={() => setMobileNav(!MobileNav)}>
//           <VscThreeBars />
//         </button>
//       </div>
//       <div
//         className={`fixed top-0 left-0 nav-bg backdrop-blur-md h-screen w-full p-8 ${
//           MobileNav ? "flex flex-col translate-y-[0%]" : "translate-y-[-100%]"
//         } transition-all duration-300`}
//       >
//         <div>
//           <button className="text-3xl" onClick={() => setMobileNav(!MobileNav)}>
//             <RxCross2 />
//           </button>
//         </div>
//         <div className="h-[100%] flex flex-col items-center justify-center">
//           {links.map((items, i) => (
//             <Link
//               to={items.to}
//               className="mb-4 text-4xl hover:text-blue-600 transition-all duration-300"
//               key={i}
//               onClick={() => setMobileNav(false)}
//             >
//               {items.name}
//             </Link>
//           ))}

//           <button
//             onClick={() => {
//               handleSignOut();
//               setMobileNav(false);
//             }}
//             className="text-4xl bg-red-500 rounded px-8 py-4 text-zinc-100 hover:bg-red-600 transition-all duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscThreeBars } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useClubs } from "../Context/ClubContext";

const Navbar = ({ logined, isOpen, setIsOpen }) => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [showClubs, setShowClubs] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
    setIsOpen(false);
  };

  const links = [
    { name: "Home", to: "/" },
    { name: "Clubs", to: "/clubs" },
    { name: "Profile", to: "/profile" },
    { name: "All Blogs", to: "/all-blogs" },
  ];

  // const clubsList = [
  //   { name: "ACM", to: "/clubs/acm" },
  //   { name: "IDS", to: "/clubs/ids" },
  //   { name: "IVEE", to: "/clubs/ivee" },
  //   { name: "AXIS", to: "/clubs/axis" },
  //   { name: "AAC", to: "/clubs/aac" },
  //   { name: "Mag.Com", to: "/clubs/mag" },
  // ];

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 hamburger-button p-2 rounded-md bg-white shadow-lg transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-0"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 size={24} /> : <VscThreeBars size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl z-40 transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold">ClubConnect</h1>
          </div>

          <div className="flex-1 flex flex-col space-y-1">
            {links.map((item, i) => (
              <Link
                to={item.to}
                key={i}
                className="p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {!logined && (
              <Link
                to="/new-blog"
                className="p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => setIsOpen(false)}
              >
                Add Blog
              </Link>
            )}

          </div>

          <div className="mt-auto space-y-4 pb-8">
            {!logined ? (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center bg-black text-white rounded px-4 py-2 hover:bg-blue-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-black text-white rounded px-4 py-2 hover:bg-blue-600 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="w-full bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;