// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io(import.meta.env.VITE_SERVER_URL);

// const Chat = ({ senderName, jobId }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [typing, setTyping] = useState("");
//   const [typingTimeout, setTypingTimeout] = useState(null);

//   useEffect(() => {
//     socket.on("recieveMsg", (msg) => {
//       // console.log("Message received:", msg); // Debugging statement
//       setMessages((prevMessages) => [...prevMessages, msg]);
//       setTyping("");
//     });

//     socket.on("typing", (user) => {
//       console.log("User typing:", user); // Debugging statement
//       setTyping(user);
//       clearTimeout(typingTimeout);
//       setTypingTimeout(setTimeout(() => setTyping(""), 2000));
//     });

//     return () => {
//       socket.off("recieveMsg");
//       socket.off("typing");
//       clearTimeout(typingTimeout);
//     };
//   }, [typingTimeout]);

//   const sendMsg = () => {
//     if (message.trim()) {
//       const msg = { jobId, senderName, text: message };
//       console.log("Sending message:", msg); // Debugging statement
//       socket.emit("sendMsg", msg);
//       setMessage(""); // Clear the input field after sending the message
//     }
//   };

//   const handleTyping = () => {
//     socket.emit("typing", senderName);
//     clearTimeout(typingTimeout);
//     setTypingTimeout(setTimeout(() => setTyping(""), 2000));
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderName}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       {typing && <div>{typing} is typing...</div>}
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyUp={handleTyping}
//       />
//       <button onClick={sendMsg}>Send</button>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chat = ({ senderName, jobId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

    socket.on("receiveMsg", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setTyping("");
    });

    socket.on("typing", (user) => {
      setTyping(user);
      clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => setTyping(""), 2000));
    });

    return () => {
      socket.off("receiveMsg");
      socket.off("typing");
      clearTimeout(typingTimeout);
      socket.disconnect();
    };
  }, [typingTimeout]);

  const sendMsg = () => {
    if (message.trim()) {
      const msg = { jobId, senderName, text: message };
      socket.emit("sendMsg", msg);
      setMessage(""); // Clear the input field after sending the message
    }
  };

  const handleTyping = () => {
    socket.emit("typing", senderName);
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