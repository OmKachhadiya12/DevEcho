import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 2005;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/user",userRoutes);

app.listen(PORT,() => {
    console.log (`Server is listening on ${PORT}`);
});