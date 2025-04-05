import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/page";
import MainLayout from "./Layout/MainLayout";
import OtherLayout from "./Layout/OtherLayout";
import Login from "./pages/Login/page";
// import Login from "./pages/Login/login";

import SignUp from "./pages/SignUp/page";
// import SignUp from "./pages/SignUp/FinalSignup"
import Profile from "./pages/Profile/page";
// import AllBlogs from "./pages/All Blogs/page";
import AddBlog from "./componments/BlogCard/createblog";
import Blog from "./componments/BlogCard/Blog";

import DashboardProfile from "./componments/Profile/DashboardProfile";
import Favorites from "./componments/Profile/Favorites";
import LikedBlogs from "./componments/Profile/LikedBlogs";
import Cookies from "universal-cookie";
import LogoutPage from "./pages/SignUp/Signout";


const App = () => {
  const cookies = new Cookies();
  const [logined, setLogined] = useState(false);
  const [callCount, setCallCount] = useState(0);
  const [token, setToken] = useState(cookies.get("authToken"));
  const [user, setUser] = useState({
    isAdmin: false,
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout logined={logined} />}>
          <Route index element={<Home logined={logined} />} />
          <Route path="/all-blogs" element={<Blog />} />
          <Route path="/new-blog" element={<AddBlog />} />

          <Route path="/profile" element={<Profile />}>
            <Route index element={<DashboardProfile />} />
            <Route path="/profile/favorites" element={<Favorites />} />
            <Route path="/profile/liked-blogs" element={<LikedBlogs />} />
          </Route>
        </Route>

        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<LogoutPage />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
