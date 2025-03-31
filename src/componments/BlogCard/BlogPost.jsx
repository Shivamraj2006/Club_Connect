import React, { useState, useRef, useEffect, forwardRef } from "react";
import { FaWhatsapp, FaInstagram, FaCopy, FaEnvelope } from "react-icons/fa";
import { useBlogContext } from "../Context/BlogContext";

const BlogPost = forwardRef(
  ({ post }, ref) => {
    const [showFull, setShowFull] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const descriptionRef = useRef(null);
    const [showReadMore, setShowReadMore] = useState(false);

    const {
      savedPosts,
      likedPosts,
      toggleSavePost,
      toggleLikePost,
      addCommentedPost,
    } = useBlogContext();

    useEffect(() => {
      const descriptionElement = descriptionRef.current;
      if (descriptionElement) {
        setShowReadMore(descriptionElement.scrollHeight > descriptionElement.clientHeight);
      }
    }, [post.description]);

    const handleAddComment = () => {
      if (comment.trim() !== "") {
        setCommentsList([...commentsList, comment]);
        addCommentedPost(post);
        setComment("");
      }
    };

    return (
      <div id={`post-${post.id}`} ref={ref} className="details p-4 border-b border-gray-300">
        {/* ... rest of your BlogPost component remains the same ... */}
        {/* Just update the like/save buttons to use the context functions */}
        <button
          className={`text-red-500 hover:text-red-700 ${
            likedPosts.some((p) => p.id === post.id) ? "font-bold" : ""
          }`}
          onClick={() => toggleLikePost(post)}
        >
          ❤️ {likedPosts.some((p) => p.id === post.id) ? "Liked" : "Like"}
        </button>

        <button
          className={`text-yellow-500 hover:text-yellow-700 ml-auto ${
            savedPosts.some((p) => p.id === post.id) ? "font-bold" : ""
          }`}
          onClick={() => toggleSavePost(post)}
        >
          {savedPosts.some((p) => p.id === post.id) ? "✅ Saved" : "🔖 Save"}
        </button>
      </div>
    );
  }
);

export default BlogPost;