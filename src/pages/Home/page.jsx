import React from "react";
import Header from "../../componments/Home/Header";
import Categories from "../../componments/Home/Categories";
import RecentBlogs from "../../componments/Home/RecentBlogs";

const Home = () => {
  return (
    <div>
      <Header />
      <Categories />
      <RecentBlogs />
    </div>
  );
};

export default Home;
