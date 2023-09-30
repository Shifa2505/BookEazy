import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/config.js";

import { addServiceperson, addUser, getServiceCategories, getServicepersonForCategories, userLogin } from "./controllers/dbOps.js";
import { isServiceperson, isUser } from "./middlewares/auth.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();

await connectDB(process.env.Database_URL);

app.get("/", (req, res) => {
  res.send("Server is active.");
});

app.post("/sign-up/user", async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let location = req.body.location;
  let phone = req.body.phone;
  let image_url = req.body.image_url;

  if (username && password && name && email && location && phone) {
    image_url
      ? await addUser(
          username,
          password,
          name,
          email,
          location,
          phone,
          image_url
        )
      : await addUser(username, password, name, email, location, phone);
    res.status(200).send("Created New User.");
  } else {
    res.status(400).send("Username or password missing.");
  }
});

app.post("/sign-up/serviceperson", async (req, res) => {
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

  if (
    username &&
    password &&
    name &&
    email &&
    location &&
    phone &&
    qualification &&
    bio &&
    servicesOffered
  ) {
    image_url
      ? await addServiceperson(
          name,
          email,
          phone,
          location,
          qualification,
          bio,
          servicesOffered,
          username,
          password,
          image_url
        )
      : await addServiceperson(
          name,
          email,
          phone,
          location,
          qualification,
          bio,
          servicesOffered,
          username,
          password
        );
    res.status(200).send("Created New Serviceperson.");
  } else {
    res.status(400).send("Username or password missing.");
  }
});

app.post("/sign-in/user", async (req, res) => {
  console.log("trying user login")
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    userLogin(username, password)
      .then((user) => {
        const token = jwt.sign({username:username, role: "USER"}, process.env.JWT_SECRET);
        res.status(200).cookie("token", token).json(user);
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  } else {
    res.status(400).send("Incomplete data.");
  }
});

app.post("/sign-in/serviceperson", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
  
    if (username && password) {
      servicepersonLogin(username, password)
        .then((user) => {
          const token = jwt.sign({username:username, role: "SERVICEPERSON"}, process.env.JWT_SECRET);
          res.status(200).cookie("token", token, {httpOnly:true}).json(user);
        })
        .catch((err) => {
          res.status(401).send(err.message);
        });
    } else {
      res.status(400).send("Incomplete data.");
    }
});

app.get("/sign-out",(req,res)=>{
  res.clearCookie("token").sendStatus(200)
})

app.get("/checkCookie",(req,res)=>{
    res.send(req.cookies)
})

app.get("/api/get-service-categories",(req,res)=>{
  getServiceCategories()
  .then(data=>res.status(200).json(data))
  .catch(err=>res.sendStatus(500))
})

app.get("/api/get-servicepeople/:category",isUser, (req,res)=>{
  getServicepersonForCategories(req.params.category)
  .then(data=>res.send(data))
  .catch(err=>res.status(400).send("No such category"))
})

app.post("/api/new-booking", isUser, (req,res)=>{
  const service = req.body.service;
  const serviceperson = req.body.serviceperson;
  const user = req.body.user;
  const startTime = req.body.startTime;
  if(service && serviceperson && user && startTime){
    // to be implemented
  }
  else{
    res.status(400).send("Request with incomplete data.")
  }
  
})

app.get("/api/accept-booking", isServiceperson, (req,res)=>{
  
})

app.get("/api/reject-booking", isServiceperson, (req,res)=>{

})

app.get("/api/send-feedback", isUser, (req,res)=>{

})

app.get("/api/get-bookings", isServiceperson, (req,res)=>{

})

app.listen(8000, () => {
  console.log("Server active...");
});
