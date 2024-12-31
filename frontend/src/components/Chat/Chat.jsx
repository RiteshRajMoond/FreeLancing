import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

const Chat = ({ senderName, jobId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    socket.current.on("receiveMsg", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTyping("");
    });

    socket.current.on("typing", (user) => {
      setTyping(user);
      clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => setTyping(""), 2000));
    });

    return () => {
      socket.current.off("receiveMsg");
      socket.current.off("typing");
      clearTimeout(typingTimeout);
      socket.current.disconnect();
    };
  }, [typingTimeout]);

  const sendMsg = () => {
    if (message.trim()) {
      const msg = { jobId, senderName, text: message };
      socket.current.emit("sendMsg", msg);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  const handleTyping = () => {
    socket.current.emit("typing", senderName);
    clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => setTyping(""), 2000));
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderName}:</strong> {msg.text}
          </div>
        ))}
      </div>
      {typing && <div>{typing} is typing...</div>}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={handleTyping}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
};

export default Chat;