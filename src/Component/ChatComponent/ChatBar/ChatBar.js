import React, { useState, useRef } from "react";
import "./ChatBar.css";

const ChatBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (message.trim() !== "") {
      onSendMessage({
        id: "user",
        text: message,
      });
      setMessage("");
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="center-container">
      <form
        id="chat-form"
        className="chat-bar"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyPress={handleInputKeyPress}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatBar;
