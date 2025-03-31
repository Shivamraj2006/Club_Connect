import React, { useState, useRef, useEffect } from "react";
import peopleData from "./ComponentBlog";
import { ArrowLeft } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaCopy, FaEnvelope } from "react-icons/fa";
import { useBlogContext } from "../Context/BlogContext";

function Blog() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const sidebarRef = useRef(null);
    const postRefs = useRef({});

    const {
        savedPosts,
        likedPosts,
        commentedPosts,
        loading: contextLoading,
        error: contextError,
        toggleSavePost,
        toggleLikePost,
        addCommentedPost
    } = useBlogContext();

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    const scrollToPost = (postId) => {
        if (postRefs.current[postId]) {
            postRefs.current[postId].scrollIntoView({ behavior: "smooth", block: "start" });
            setMenuOpen(false);
        }
    };

    return (
        <div className="relative">
            {/* Navbar */}
            <div className="nav-bar flex justify-between items-center p-6 bg-gray-900 text-white">
                <h1 className="text-3xl font-serif justify-center m-auto">Blogs!</h1>
                <button 
                    className="text-white text-3xl hover:text-gray-400 transition" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Sidebar Menu */}
            {menuOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-blue-950 shadow-lg p-4 overflow-y-auto" ref={sidebarRef}>
                    <div className="justify-between">
                        <button 
                            className="flex items-center text-white hover:text-gray-400 transition" 
                            onClick={() => setMenuOpen(false)}
                        >
                            <ArrowLeft size={30} className="mr-2" /> 
                            <span className="text-2xl py-5 font-semibold">Activity</span>
                        </button>
                    </div>

                    {/* Saved Blogs Section */}
                    <h2
                        className={`text-xl font-bold text-white cursor-pointer ${activeSection === "saved" ? "underline" : ""}`}
                        onClick={() => setActiveSection(activeSection === "saved" ? null : "saved")}
                    >
                        📌 Saved Blogs
                    </h2>
                    {activeSection === "saved" && savedPosts.length > 0 ? (
                        <ul className="mt-2">
                            {savedPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="cursor-pointer text-white hover:underline p-2"
                                    onClick={() => scrollToPost(post.id)}
                                >
                                    {post.title}
                                </li>
                            ))}
                        </ul>
                    ) : activeSection === "saved" && savedPosts.length === 0 ? (
                        <p className="text-gray-500 mt-2">No saved blogs.</p>
                    ) : null}

                    {/* Liked Blogs Section */}
                    <h2
                        className={`text-xl font-bold text-white mt-4 cursor-pointer ${activeSection === "liked" ? "underline" : ""}`}
                        onClick={() => setActiveSection(activeSection === "liked" ? null : "liked")}
                    >
                        ❤️ Liked Blogs
                    </h2>
                    {activeSection === "liked" && likedPosts.length > 0 ? (
                        <ul className="mt-2">
                            {likedPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="cursor-pointer text-white hover:underline p-2"
                                    onClick={() => scrollToPost(post.id)}
                                >
                                    {post.title}
                                </li>
                            ))}
                        </ul>
                    ) : activeSection === "liked" && likedPosts.length === 0 ? (
                        <p className="text-gray-500 mt-2">No liked blogs.</p>
                    ) : null}

                    {/* Commented Blogs Section */}
                    <h2
                        className={`text-xl font-bold text-white mt-4 cursor-pointer ${activeSection === "commented" ? "underline" : ""}`}
                        onClick={() => setActiveSection(activeSection === "commented" ? null : "commented")}
                    >
                        💬 Commented Blogs
                    </h2>
                    {activeSection === "commented" && commentedPosts.length > 0 ? (
                        <ul className="mt-2">
                            {commentedPosts.map((post) => (
                                <li
                                    key={post.id}
                                    className="cursor-pointer text-white hover:underline p-2"
                                    onClick={() => scrollToPost(post.id)}
                                >
                                    {post.title}
                                </li>
                            ))}
                        </ul>
                    ) : activeSection === "commented" && commentedPosts.length === 0 ? (
                        <p className="text-gray-500 mt-2">No commented blogs.</p>
                    ) : null}
                </div>
            )}

            {/* Blog Posts */}
            {peopleData.map((person) => (
                <BlogPost
                    key={person.id}
                    post={person}
                    ref={(el) => (postRefs.current[person.id] = el)}
                />
            ))}
        </div>
    );
}

const BlogPost = React.forwardRef(({ post }, ref) => {
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
        addCommentedPost
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
            <h2 className="text-2xl pl-10 text-green-500 font-monospace">{post.title}</h2>

            <div className={`border ml-10 mr-10 p-4 w-auto bg-gray-100 border-black rounded-md overflow-hidden`}>
                <div ref={descriptionRef} className={showFull ? "h-auto" : "h-[143px] overflow-hidden"}>
                    {post.description}
                </div>
                {showReadMore && (
                    <button 
                        className="text-blue-500 mt-2 inline" 
                        onClick={() => setShowFull(!showFull)}
                    >
                        {showFull ? "Read Less" : "Read More"}
                    </button>
                )}
            </div>

            <div className="flex items-center ml-10 mt-4 space-x-4">
                <button
                    className={`text-red-500 hover:text-red-700 ${
                        likedPosts.some((p) => p.id === post.id) ? "font-bold" : ""
                    }`}
                    onClick={() => toggleLikePost(post)}
                >
                    ❤️ {likedPosts.some((p) => p.id === post.id) ? "Liked" : "Like"}
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`text-blue-500 hover:text-blue-700 ${commentsList.length > 0 ? "font-bold" : ""}`}
                >
                    💬 Comment
                </button>

                <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className={`text-green-500 hover:text-green-700`}
                >
                    🔗 Share
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

            {showComments && (
                <div className="mt-4 ml-10">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="border p-2 rounded-md w-full"
                    />
                    <button 
                        onClick={handleAddComment} 
                        className="bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-700"
                    >
                        Post Comment
                    </button>

                    {commentsList.length > 0 && (
                        <div className="mt-4">
                            {commentsList.map((cmt, index) => (
                                <p key={index} className="text-gray-700 border-b p-1">{cmt}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showShareOptions && (
                <div className="share-button mt-2 ml-10 bg-gray-100 p-3 rounded-md w-max shadow-md">
                    <p className="font-semibold">Share via:</p>
                    <div className="flex space-x-4 mt-2">
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-green-600 hover:text-green-800"
                        >
                            <FaWhatsapp className="mr-1" /> WhatsApp
                        </a>

                        <a
                            href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-pink-500 hover:text-pink-700"
                        >
                            <FaInstagram className="mr-1" /> Instagram
                        </a>

                        <a
                            href={`mailto:?subject=Check this out&body=${encodeURIComponent(window.location.href)}`}
                            className="flex items-center text-blue-500 hover:text-blue-700"
                        >
                            <FaEnvelope className="mr-1" /> Email
                        </a>

                        <button
                            className="flex items-center text-gray-700 hover:text-black"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert("🔗 Link copied to clipboard!");
                            }}
                        >
                            <FaCopy className="mr-1" /> Copy Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Blog;