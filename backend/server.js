import express from "express";
// const dotenv = require("dotenv");
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/config.js"

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();