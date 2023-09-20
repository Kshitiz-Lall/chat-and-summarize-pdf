import React, { useRef, useEffect, useState } from "react";
import "./GeneratedMessage.css";

export default function GenMessage(props) {
  const ref = useRef();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    // Generate timestamp
    const date = new Date();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    setTimestamp(`${String(hours).padStart(2, "0")}:${minutes} ${ampm}`);
  }, [props.message, props.typing]);

  let messageContent;
  if (props.typing) {
    messageContent = (
      <div className={`typing-indicator ${props.typing ? "show" : ""}`} />
    );
  } else if (props.message.trim().includes("I don't know")) {
    messageContent = (
      <p className="gen_message-p">
        We apologize, but we couldn't find the information you're looking for at
        the moment. It's possible that the information may not be available in
        our database or there was a problem with your search query. Please
        contact info@genzeon.com for further assistance.
      </p>
    );
  } else {
    messageContent = <p className="gen_message-p">{props.message}</p>;
  }

  return (
    <div className="responsiveContainer">
      <div className="messageContainer">
        <div className="messageBox">
          <div className="messageContent">
            <div className="message" ref={ref}>
              {messageContent}
              <div className="messageActions">
                <span className="timestamp">{timestamp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
