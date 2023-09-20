import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./PDFDownloader.css";

const PDFDownloader = ({ messages }) => {
  const downloadPDF = () => {
    if (!messages || messages.length === 0) {
      console.warn("No messages to generate PDF.");
      return;
    }
    const doc = new jsPDF();

    // Set default font size and font style
    doc.setFontSize(12);
    doc.setFont("titillium", "normal");
    doc.setTextColor(0, 0, 0); // Reset to black

    let y = 10;

    // Add title
    doc.text("Chat Conversation", 10, y);
    y += 10;

    // Process messages to create pairs of user questions and backend answers
    let i = 0;
    const conversationArray = [];
    while (i < messages.length) {
      let userMessage = "N/A";
      let backendMessage = "N/A";

      if (messages[i].id === "user") {
        userMessage = messages[i].text;
        i++;
      }

      if (i < messages.length && messages[i].id === "backend") {
        backendMessage = messages[i].text;
        i++;
      }

      conversationArray.push([userMessage, backendMessage]);
    }

    doc.autoTable({
      startY: y,
      head: [["Field", "Value"]],
      body: conversationArray,
      theme: "striped",
      align: "left",
      valign: "middle",
    });

    doc.save("Chat-Conversation.pdf");
  };

  return <button onClick={downloadPDF}>DOWNLOAD PDF</button>;
};

export default PDFDownloader;
