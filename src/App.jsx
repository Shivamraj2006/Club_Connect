import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/page";
import MainLayout from "./Layout/MainLayout";
import OtherLayout from "./Layout/OtherLayout";
import Login from "./pages/Login/page";
import SignUp from "./pages/SignUp/page";
import Profile from "./pages/Profile/page";
import AllBlogs from "./pages/All Blogs/page";
import DashboardProfile from "./componments/Profile/DashboardProfile";
import Favorites from "./componments/Profile/Favorites";
import LikedBlogs from "./componments/Profile/LikedBlogs";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-blogs" element={<AllBlogs />} />

          <Route path="/profile" element={<Profile />}>
            <Route index element={<DashboardProfile />} />
            <Route path="/profile/favorites" element={<Favorites />} />
            <Route path="/profile/liked-blogs" element={<LikedBlogs />} />
          </Route>
        </Route>

        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
