import express from "express";
import cors from "cors";


export const app = express();
app.use(express.json());
app.use(cors());

// app.use("/chat-room", chatRoom);
// app.use("/message", message);
