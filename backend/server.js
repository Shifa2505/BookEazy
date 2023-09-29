import express from "express";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/config.js";

import { addServiceperson, addUser } from "./controllers/dbOps.js";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())
dotenv.config();

await connectDB(process.env.Database_URL);

app.get("/",(req, res)=>{
    res.send("Server is active.");
})

app.post("/sign-up/user", async (req,res)=>{
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    let location = req.body.location;
    let phone = req.body.phone;
    let image_url = req.body.image_url;

    if(username && password && name && email && location && phone){
        image_url ?
        await addUser(username,password, name, email, location, phone, image_url) :
        await addUser(username,password, name, email, location, phone)
        res.status(200).send("Created New User.")
    }
    else{
        res.status(400).send("Username or password missing.")
    }
})

app.post("/sign-up/serviceperson", async (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.name;
    let email = req.body.email;
    let location = req.body.location;
    let phone = req.body.phone;
    let qualification = req.body.qualification;
    let bio = req.body.bio;
    let servicesOffered = req.body.servicesOffered;
    let image_url = req.body.image_url;

    if(username && password && name && email && location && phone && qualification && bio && servicesOffered){
        image_url ?
        await addServiceperson(name, email, phone, location, qualification, bio, servicesOffered, username, password, image_url) :
        await addServiceperson(name, email, phone, location, qualification, bio, servicesOffered, username, password)
        res.status(200).send("Created New Serviceperson.")
    }
    else{
        res.status(400).send("Username or password missing.")
    }
})


app.listen(8000,()=>{
    console.log("Server active...")
})