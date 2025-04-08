import React, { useState } from "react";
import Chatbot from "./Chatbot";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async (message) => {
    setChatHistory((prev) => [...prev, { user: message, bot: "Thinking..." }]);

    // Simulate AI response
    const response = await fetch("https://api.adviceslip.com/advice"); // or your own AI backend
    const data = await response.json();
    const botMessage = data.slip.advice;

    setChatHistory((prev) =>
      prev.map((msg, i) =>
        i === prev.length - 1 ? { ...msg, bot: botMessage } : msg
      )
    );
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🛒 Virtual Shopping Assistant</h1>
      {chatHistory.map((msg, index) => (
        <div key={index} style={{ padding: "10px" }}>
          <p><strong>You:</strong> {msg.user}</p>
          <p><strong>AI:</strong> {msg.bot}</p>
        </div>
      ))}
      <Chatbot onSend={handleSend} />
    </div>
  );
}

export default App;
