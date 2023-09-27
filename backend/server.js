import express from "express";
// const dotenv = require("dotenv");
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();