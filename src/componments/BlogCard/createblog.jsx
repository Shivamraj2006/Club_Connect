// import { useState } from 'react';

// function AddBlog() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);

//   function addTitle(e) {
//     setTitle(e.target.value);
//   }

//   function addDescription(e) {
//     setDescription(e.target.value);
//   }

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (files.length + images.length > 15) {
//       alert("You can upload a maximum of 15 images.");
//       return;
//     }

//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file), // Create preview URLs
//     }
//   ));
//   console.log(newImages)



//     setImages((prevImages) => [...prevImages, ...newImages]); // Append new images to the existing ones

//     // Clear the file input field
//     e.target.value = "";
//   };

//   const removeImage = (index) => {
//     if (window.confirm("Are you sure you want to delete this image?")) {
//       setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };

//   const handleSubmit = () =>{
//     if (!title.trim()) {
//       alert("Title is required!");
//       return;
//     }
  
//     if (description.trim().length < 20) {
//       alert("Description must be at least 20 characters long!");
//       return;
//     }

//     console.log("Blog Title:", title);
//     console.log("Blog Description:", description);
//     console.log("Uploaded Images:", images);

//     alert("Blog submitted successfully!");

//     // Clear fields after submission
//     setTitle("");
//     setDescription("");
//     setImages([]);
//   }

//   return (
//     <div className="whole-block p-6">

//       <div className="header-block text-center">
//         <h1 className="text-3xl font-bold underline text-red-500 animate-expandShrink">My Blog!</h1>
//         <h2 className="animate-pulse">Create your own blog!</h2>
//       </div>

//       <div className="title-block mt-6">
//         <h2 className="text-2xl font-semibold text-left">Title*</h2>
//         <input
//           type="text"
//           className="mt-2 p-2 border border-gray-400 rounded w-full"
//           placeholder="Enter your blog title..."
//           value={title}
//           onChange={addTitle}
//         />
//       </div>

//       <div className="description-block mt-6">
//         <h2 className="text-2xl font-semibold text-left">Description*</h2>
//         <textarea
//           className="mt-2 p-2 border border-gray-400 rounded w-full"
//           placeholder="Provide a description for your blog entry..."
//           value={description}
//           onChange={addDescription}
//         />
//       </div>

//       <div className="image-block mt-6">
//         <h2 className="text-2xl font-semibold text-left">Upload Images (Max 15)</h2>

//           <input
//             type="file"
//             id="fileInput"
//             className="hidden"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//         />

//             <label
//               htmlFor="fileInput"
//               className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
//             >
//               Choose Images
//             </label>

//             <div className="mt-4 grid grid-cols-3 gap-4">
//               {images.map((img, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={img.preview}
//                     alt={`Uploaded ${index + 1}`}
//                     className="w-32 h-32 object-cover border rounded cursor-pointer"
//                     onDoubleClick={() => removeImage(index)} // Double-click to remove
//                   />
//                 </div>
//           ))}
//       </div>

//         <p className="mt-2 text-sm text-gray-500">{images.length} / 15 images uploaded</p>
//       </div>

//       <button
//         className=" submit-block text-2.5xl mt-6 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>

//     </div>
//   );
// }

// export default AddBlog;


import { useState } from 'react';
import axios from 'axios';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function addTitle(e) {
    setTitle(e.target.value);
    setError(null); // Clear error when user types
  }

  function addDescription(e) {
    setDescription(e.target.value);
    setError(null); // Clear error when user types
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 15) {
      setError("You can upload a maximum of 15 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(images[index].preview);
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    
    if (!title.trim()) {
      setError("Title is required!");
      return;
    }
  
    if (description.trim().length < 20) {
      setError("Description must be at least 20 characters long!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      // Append each image file
      images.forEach((image) => {
        formData.append('images', image.file);
      });

      // Send to backend
      const response = await axios.post('/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Blog created successfully:", response.data);
      setSuccess(true);
      
      // Clear form
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(err.response?.data?.message || "Failed to create blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="header-block text-center mb-8">
        <h1 className="text-4xl font-bold text-red-500 mb-2 animate-bounce">
          Create Your Blog!
        </h1>
        <h2 className="text-xl text-gray-600">
          Share your thoughts and experiences with the community
        </h2>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>Blog created successfully!</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Title Field */}
        <div className="title-block">
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Title*
          </label>
          <input
            type="text"
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your blog title..."
            value={title}
            onChange={addTitle}
          />
        </div>

        {/* Description Field */}
        <div className="description-block">
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Description*
          </label>
          <textarea
            className="mt-1 p-3 border border-gray-300 rounded-lg w-full h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your blog content here..."
            value={description}
            onChange={addDescription}
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 20 characters required
          </p>
        </div>

        {/* Image Upload */}
        <div className="image-block">
          <label className="block text-xl font-semibold text-gray-700 mb-2">
            Upload Images (Max 15)
          </label>
          
          <div className="flex items-center space-x-4">
            <label
              htmlFor="fileInput"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose Images
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <span className="text-gray-600">
              {images.length} / 15 images selected
            </span>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                    {img.file.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg mt-6 transition-colors ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Publish Blog'
          )}
        </button>
      </div>
    </div>
  );
}

export default AddBlog;