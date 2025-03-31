// import React from "react";
// import { Link } from "react-router-dom";

// const BlogCard = ({ items }) => {
//   return (
//     <>
//       <div className="w-full lg:w-4/6">
//         <img src={items.img} alt="" className="rounded object-cover" />
//       </div>
//       <div className="w-full lg:w-4/6">
//         <h1 className="text-2xl font-semibold">{items.title}</h1>
//         <p className="mb-2">{items.description.slice(0, 170)}...</p>
//         <Link className="bg-blue-600 px-4 py-2 rounded text-white hiver:bg-blue-700 transition-all duration-300">
//           Read Blog
//         </Link>
//       </div>
//     </>
//   );
// };

// export default BlogCard;
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ items }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full mb-8 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {items.img && (
        <div className="w-full lg:w-2/5">
          <img 
            src={items.img} 
            alt={items.title} 
            className="w-full h-48 lg:h-64 object-cover rounded-lg"
          />
        </div>
      )}
      
      <div className={`${items.img ? 'w-full lg:w-3/5' : 'w-full'}`}>
        <h1 className="text-2xl font-semibold mb-2">{items.title}</h1>
        <p className="text-gray-700 mb-4">
          {items.description.length > 170
            ? `${items.description.slice(0, 170)}...`
            : items.description}
        </p>
        <Link 
          to={`/blog/${items.id}`} // Assuming you have a route for individual blogs
          className="inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition-all duration-300"
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;