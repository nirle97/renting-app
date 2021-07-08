import { app } from "./app";
import axios from "axios";
require("dotenv").config();
interface IMessage {
  text: string;
  chatRoomId: string;
  senderId: string;
  createdAt: Date;
}

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST", "PUT"] },
});
const PORT = 5001;

io.on("connection", (socket: any) => {
  console.log("connected socket");

  socket.on("join-chat", (roomsIdArray: string[]) => {
    socket.join(roomsIdArray);
  });

  socket.on("disconnection", () => {
    console.log("disconnected");
    socket.removeAllListeners();
  });
  socket.on("send-msg", (message: IMessage) => {
    axios
      .post(`${process.env.BASE_URL}/message/create-message`, message)
      .catch((e) => console.error(e));
    socket.broadcast.to(message.chatRoomId).emit("message", message);
  });
});
server.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
