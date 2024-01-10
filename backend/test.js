import mongoose from "mongoose";
import dotenv from "dotenv";
import { addServiceperson, addUser, userLogin, servicepersonLogin, getServiceCategories, getServicepersonForCategories, createBookingRequest, acceptBooking, rejectBooking, listUserBookings, listServicepersonBookings, getServicesForCategory } from "./controllers/dbOps.js";
dotenv.config()

const connectDB = async(url) => {
    try {
        console.log(url)
        await mongoose.connect(url);
        console.log("Sucessfully connected to database");
    } catch(error) {
        console.log(error);
    }
}

await connectDB(process.env.Test_Database_URL);
// console.log("Connection established")
// await addUser("admin","admin", "Admin", "admin@test.dev","Testopia","1234567896")
// await addUser("admin","admin", "Admin2", "admin12@test.dev","Testopia","9364925389","thisisalink")
// await addServiceperson("John Doe","johndoe@test.com","8765432109","Testopia","BTech","Hi, this is my bio.",["6514429095402ea423785bcc"],"user","userpwd")
// await addServiceperson("Jane Doe","janedoe@test.com","7856342109","Testopia","BTech","Hi, this is my bio.",["6514429095402ea423785bcc"],"user12","userpwd","thisisanimage")
// console.log(await userExists("johndoe"));
// userLogin("johndoe","password123").then(console.log).catch(err=>console.log(err.message));
// servicepersonLogin("johndoe123","password123").then(console.log).catch(err=>console.log(err.message));
// console.log(await getServiceCategories())
// let x = await getServicepersonForCategories("Electrical Help")
// console.log(x.map(d=>{return {name:d.name,username:d.username}}))
// console.log(await createBookingRequest("Applicance Installation","davidcraftsman","johndoe",new Date()))
// await acceptBooking("olivialandscapes","651950733373dd37ad3ea547");
// await rejectBooking("olivialandscapes","651950733373dd37ad3ea547");
// console.log(await listUserBookings("johndoe"))
// console.log(await listServicepersonBookings("olivialandscapes"))

// SHOW SERVICES FOR A CATEGORY
// let category = "Painting"
// console.log(`Services for the category : ${category}`,(await getServicesForCategory("Electrical Help")).map(d=>{return {name:d.name, duration:d.duration}}))



mongoose.disconnect();