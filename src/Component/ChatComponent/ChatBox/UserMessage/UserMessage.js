import React, { useRef, useEffect, useState } from "react";
import "./UserMessage.css";

export default function UserMessage(props) {
  const ref = useRef();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });

    const date = new Date();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    setTimestamp(`${String(hours).padStart(2, "0")}:${minutes} ${ampm}`);
  }, [props.message]);

  return (
    <div className="userMsgContainer" ref={ref}>
      <div className="userMsgBox">
        <div className="userMsgContent">
          <p className="userMsgText">{props.message}</p>
        </div>
        <span className="userMsgTimestamp">{timestamp}</span>
      </div>
    </div>
  );
}
