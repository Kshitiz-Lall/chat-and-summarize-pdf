import React, { useState } from "react";
import "./App.css";
import ChatboxInterface from "./Component/ChatComponent/ChatBoxInterface/ChatboxInterface";
import SectionsList from "./Component/SectionList/SectionList";

function App() {
  const [showChatInterface, setShowChatInterface] = useState(false);

  const handleSectionSubmit = (selectedSection) => {
    // You can use the 'selectedSection' if needed
    setShowChatInterface(true);
  };

  return (
    <div className="App">
      <SectionsList onSectionSubmit={handleSectionSubmit} />
      {showChatInterface && <ChatboxInterface />}
    </div>
  );
}

export default App;
