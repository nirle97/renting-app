import { app } from "./app";
import mongoose from "mongoose";
import { IMessage } from "./interfaces/interface";

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST", "PUT"] },
});
const PORT = 5000;
mongoose
  .connect("mongodb://localhost:27017/rent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("server connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
  });

io.on("connection", (socket: any) => {
  console.log("connected socket");

  socket.on("join-chat", (roomsIdArray: string[]) => {
    socket.join(roomsIdArray);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });

  socket.on("send-msg", (message: IMessage) => {
    socket.broadcast.to(message.chatRoomId).emit("message", message);
  });
});
server.listen(PORT, () => console.log(`app is listening on port ${PORT}`));

module.exports = app;
