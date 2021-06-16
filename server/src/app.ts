import express from "express";
import cors from "cors"
import { login } from "./routes/login"
import { auth } from "./routes/auth"
import { apartment } from "./routes/apartment"
export const app = express();
app.use(express.json())
app.use(cors())

app.use("/login", login)
app.use("/auth", auth)
app.use("/apartment", apartment)