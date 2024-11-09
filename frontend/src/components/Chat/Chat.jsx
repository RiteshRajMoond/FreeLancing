import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_URL);

const Chat = ({ userRole }) => {
  const [message, setMessage] = useState("");
  const [messages, setMesssages] = useState([]);

  useEffect(() => {
    socket.on("recieveMsg", (msg) => {
      setMesssages([...messages, msg]);
    });

    return () => {
      socket.off("recieveMsg");
    };
  }, []);

  const sendMsg = () => {
    if (message.trim()) {
      socket.emit("sendMsg", { userRole, text: message });
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.userRole}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
};

export default Chat;
