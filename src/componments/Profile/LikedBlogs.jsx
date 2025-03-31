// import React from "react";
// import BlogCard from "../BlogCard/BlogCard";

// const LikedBlogs = () => {
//   const data = [
//     {
//       img: "../temp.jpg",
//       title: "Lorem Ipsum",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nihil ex cupiditate, neque inventore, suscipit expedita eaque tempora cum autem aliquid? Impedit, autem! Eligendi aliquam ratione totam reprehenderit necessitatibus quas veritatis fugit praesentium possimus magnam, quod veniam perferendis, quam consectetur nobis iusto et repellat labore atque ea recusandae debitis? Doloribus!",
//     },
//     {
//       img: "../temp.jpg",
//       title: "Lorem Ipsum",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nihil ex cupiditate, neque inventore, suscipit expedita eaque tempora cum autem aliquid? Impedit, autem! Eligendi aliquam ratione totam reprehenderit necessitatibus quas veritatis fugit praesentium possimus magnam, quod veniam perferendis, quam consectetur nobis iusto et repellat labore atque ea recusandae debitis? Doloribus!",
//     },
//     {
//       img: "../temp.jpg",
//       title: "Lorem Ipsum",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nihil ex cupiditate, neque inventore, suscipit expedita eaque tempora cum autem aliquid? Impedit, autem! Eligendi aliquam ratione totam reprehenderit necessitatibus quas veritatis fugit praesentium possimus magnam, quod veniam perferendis, quam consectetur nobis iusto et repellat labore atque ea recusandae debitis? Doloribus!",
//     },
//     {
//       img: "../temp.jpg",
//       title: "Lorem Ipsum",
//       description:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt nihil ex cupiditate, neque inventore, suscipit expedita eaque tempora cum autem aliquid? Impedit, autem! Eligendi aliquam ratione totam reprehenderit necessitatibus quas veritatis fugit praesentium possimus magnam, quod veniam perferendis, quam consectetur nobis iusto et repellat labore atque ea recusandae debitis? Doloribus!",
//     },
//   ];
//   return (
//     <div className="">
//       <h1 className="text-xl font-semibold mb-4 ">Liked Blogs</h1>
//       <div className="flex flex-col gap-8 lg:gap-4">
//         {data &&
//           data.map((items, i) => (
//             <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
//               <BlogCard items={items} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default LikedBlogs;


import React from "react";
import BlogCard from "../BlogCard/BlogCard";
import { useBlogContext } from "../Context/BlogContext";

const LikedBlogs = () => {
  const { likedPosts } = useBlogContext();

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4">Liked Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {likedPosts.length > 0 ? (
          likedPosts.map((post, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              <BlogCard items={post} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No liked posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default LikedBlogs;