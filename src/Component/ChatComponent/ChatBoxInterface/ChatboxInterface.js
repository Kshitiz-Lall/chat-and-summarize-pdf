import React, { useState } from "react";
import ChatBar from "../ChatBar/ChatBar";
import Messages from "../ChatBox/Messages";
import "./ChatboxInterface.css";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PDFDownloader from "../../PDFGenerator/PDFDownloader";

const ChatboxInterface = () => {
  const [messages, setMessages] = useState([]);

  const addMessageToConversation = async (message) => {
    const userMessage = { id: message.id, text: message.text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        "http://20.57.137.42:8090/openai/get_answer",
        {
          query: message.text,
        }
      );

      if (response.data) {
        const backendResponse = {
          id: "backend",
          text: response.data,
        };
        setMessages((prevMessages) => [...prevMessages, backendResponse]);
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      console.error("Error fetching response from backend:", error);
    }
  };

  return (
    <Grid container className="chatbox-interface__container">
      <Grid
        item
        xs={12}
        className={`chatbox-interface__messages-container ${
          messages.length > 0 ? "has-messages" : ""
        }`}
      >
        <Messages messages={messages} />
      </Grid>

      <Grid item xs={12} className="chatbox-interface__chat-bar">
        <ChatBar onSendMessage={addMessageToConversation} />
        <PDFDownloader messages={messages} />
      </Grid>
    </Grid>
  );
};

export default ChatboxInterface;
