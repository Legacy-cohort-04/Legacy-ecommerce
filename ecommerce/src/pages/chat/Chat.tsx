// // src/components/Chat.tsx
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3002"); // Remplacez par l'URL de votre serveur si nécessaire

// const Chat: React.FC = () => {
//   const [name, setName] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     // Écouter les messages entrants
//     socket.on("chat message", (msg: string) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     // Nettoyer l'écouteur d'événements lors du démontage
//     return () => {
//       socket.off("chat message");
//     };
//   }, []);

//   const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (message && name) {
//       const formattedMessage = `${name}: ${message}`;
//       socket.emit("chat message", formattedMessage);
//       setMessage(""); // Effacer l'entrée
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           id="name"
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ marginLeft: "10px", marginBottom: "10px" }}
//         />
//       </div>

//       <ul id="messages" style={{ listStyleType: "none", padding: "0" }}>
//         {messages.map((msg, index) => (
//           <li key={index} style={{ margin: "5px 0" }}>
//             {msg}
//           </li>
//         ))}
//       </ul>

//       <form id="form" onSubmit={handleSendMessage} style={{ marginTop: "10px" }}>
//         <input
//           id="input"
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           style={{ marginRight: "10px", width: "70%" }}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;