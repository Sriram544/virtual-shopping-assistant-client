// client/src/Chatbot.js
import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">🛍️ ShopBot</div>
      <div className="chat-messages">
        {/* Messages handled in parent App */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Ask me anything about products..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
