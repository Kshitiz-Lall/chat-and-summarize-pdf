import React from "react";
import "./Messages.css";
import UserMessage from "./UserMessage/UserMessage";
import GenMessage from "./GeneratedMessage/GeneratedMessage";

export default function Messages(props) {
  const { messages, isMessageLoading } = props;

  return (
    <div className="gen_messages">
      {messages.map((message, index) => {
        if (message.id === "user") {
          return <UserMessage key={index} message={message.text} />;
        } else if (message.id === "backend") {
          return <GenMessage key={index} message={message.text} />;
        }
        return null;
      })}
      {isMessageLoading && <div className="loading_container"></div>}
    </div>
  );
}
