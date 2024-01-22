import mongoose from "mongoose";
import dotenv from "dotenv";
import { categoryModel } from "./models/categoryModel.js";
import { serviceModel } from "./models/serviceModel.js";
import { servicepersonModel } from "./models/servicepersonModel.js";
import { userModel } from "./models/userModel.js";
import { bookingModel } from "./models/bookingModel.js";
import controller from "./controllers/dbOps.js"

dotenv.config()
const connectDB = async(url) => {
    try {
        console.log(url)
        await mongoose.connect(url);
        console.log("Sucessfully connected to database\n\n\n");
    } catch(error) {
        console.log(error);
    }
}

await connectDB(process.env.Test_Database_URL);

//CATEGORIES PRESENT
// console.log("---Service categories present---")
// Array.from((await categoryModel.find({})).map(d=>d.name)).forEach((d,i)=>{console.log(`${i}. ${d}`)})
// console.log("\n\n")

//SERVICES FOR GIVEN CATEGORY
// let category = "Electrical Help"
// console.log(`Services for the category : ${category}`,(await controller.getServicesForCategory("Electrical Help")).map(d=>{return {name:d.name, duration:d.duration}}))
// console.log("\n")

//SERVICEPEOPLE FOR CATEGORY
// category = "Electrical Help"
// console.log((await controller.getServicepersonForCategories(category)).map(d=>{
//     // return d
//     return {
//         name: d.name,
//         jobs_done: d.jobs_done,
//         bookings_length: d.bookings.length
//     }
// }))

//TRYING FILTERING
const nowTime = new Date("2024-01-22T14:26:37.180+00:00");
let s = await servicepersonModel.aggregate([
    {
	    $unwind:"$servicesOffered",
    },
    {
        $lookup: {
            from :"servicecategories",
            localField:"servicesOffered.service",
            foreignField:"_id",
            as : "service"
        }
    },
    {
        $unwind : "$service"
    },
    {
        $match: {
            "service.name" : "Electrical Help",
        }
    },
    {
        $unwind : {
            path:"$bookings",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $lookup : {
            from:"bookings",
            localField:"bookings",
            foreignField:"_id",
            as:"bookings",
        }
    },
    {
        $unwind : {
            path:"$bookings",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $match : {
            $or:[
                {"bookings.status":"REJECTED"},
                {"bookings.status":"PENDING"},
                {"bookings.status":null},
                {
                    $and: [
                    {"bookings.status":"ACCEPTED"},
                    {
                        $or : [
                            {"bookings.startTime" : {
                                $lt : new Date(nowTime.setHours(nowTime.getHours()-1))
                            }},
                            {"bookings.startTime" : {
                                $gt : new Date(nowTime.setHours(nowTime.getHours()+1))
                            }}
                        ]
                    }

                ]}
            ]
        }
    },
    {
        $group: {
            "_id":{
                "username":"$username",
                "name":"$name",
                "bio":"$bio",
                "email":"$email",
                "location":"$location",
                "phone":"$phone",
                "jobs_done":"$jobs_done",
                "rating":"$rating",
                "servicesOffered":"$servicesOffered",
                "qualification":"$qualification"
              },
              "bookings":{$push:"$bookings"}

        }
    }
    
])
// console.log(await servicepersonModel.find({}))
console.log(JSON.stringify(s,null,4))
// s.forEach(element => {
//     console.log(element.username,element.bookings)
// });
console.log(s.length)

console.log("disconnecting...")
await mongoose.disconnect();
