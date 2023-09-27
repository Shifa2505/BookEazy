import mongoose from "mongoose";
import dotenv from "dotenv";
import { data } from "./dummyData.js";
import { categoryModel } from "./models/categoryModel.js";
import { serviceModel } from "./models/serviceModel.js";
import { servicepersonModel } from "./models/servicepersonModel.js";
dotenv.config()
// will have to later remove this
const url = process.env.Test_Database_URL

const connectDB = async() => {
    try {
        console.log(url)
        await mongoose.connect(url);
        console.log("Sucessfully connected to database");
    } catch(error) {
        console.log(error);
    }
}

await connectDB();

// console.log(data.serviceCategory)
await categoryModel.deleteMany();
await serviceModel.deleteMany();
await servicepersonModel.deleteMany();
await categoryModel.insertMany(data.serviceCategory);
await serviceModel.insertMany(data.services);
await servicepersonModel.insertMany(data.servicepersons);

mongoose.disconnect()
