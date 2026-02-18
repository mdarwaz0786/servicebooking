import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL || "http://localhost:3000";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  reconnection: true
});

socket.on("connect", () => {
  console.log("✅ Backend connected to Socket Server:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Backend disconnected from Socket Server");
});

export default socket;
