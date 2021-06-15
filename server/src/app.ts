import express from "express";
import cors from "cors"
import {login} from "./routes/login"
export const app = express();
app.use(express.json())
app.use(cors())

app.use("login", login)