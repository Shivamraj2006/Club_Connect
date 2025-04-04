import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane, FaPaperclip } from "react-icons/fa";

const clubData = {
  acm: { name: "ACM", logo: "/images/acm.png", announcements: [] },
  ids: { name: "IDS", logo: "/images/ids.png", announcements: [] },
  ivee: { name: "IVEE", logo: "/images/ivee.png", announcements: [] },
  axis: { name: "AXIS", logo: "/images/axis.png", announcements: [] },
  aac: { name: "AAC", logo: "/images/aac.png", announcements: [] },
  magcom: { name: "MagCom", logo: "/images/magcom.png", announcements: [] },
};

const ClubPage = () => {
  const { clubSlug } = useParams();
  const club = clubData[clubSlug.toLowerCase()];

  const [messages, setMessages] = useState(club?.announcements || []);
  const [inputText, setInputText] = useState("");
  const [image, setImage] = useState(null);

  if (!club) {
    return <h2 className="text-center text-red-500 text-3xl mt-10">Club Not Found!</h2>;
  }

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = () => {
    if (inputText.trim() || image) {
      setMessages([...messages, { sender: "Admin", text: inputText, image, time: getCurrentTime() }]);
      setInputText("");
      setImage(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white flex items-center p-4 shadow-lg">
        <img src={club.logo} alt={club.name} className="w-12 h-12 rounded-full mr-4 border-2 border-white" />
        <h2 className="text-xl font-semibold">{club.name} Announcements</h2>
      </div>

      {/* Announcements (Chat Section) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="bg-white shadow-md p-3 rounded-lg max-w-md">
            {/* Sender Name & Time */}
            <div className="text-gray-600 text-xs mb-1">
              <strong>{msg.sender}</strong> • {msg.time}
            </div>
            {/* Message Content */}
            {msg.image && <img src={msg.image} alt="attachment" className="w-full h-40 object-cover mb-2 rounded-lg" />}
            {msg.text && <p className="text-gray-800">{msg.text}</p>}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white flex items-center shadow-md">
        <label className="cursor-pointer">
          <FaPaperclip className="text-gray-600 text-xl mr-3" />
          <input type="file" className="hidden" onChange={handleImageUpload} />
        </label>

        <input
          type="text"
          className="flex-1 border rounded-lg p-2 focus:outline-none"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />

        <button
          className="ml-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ClubPage;
