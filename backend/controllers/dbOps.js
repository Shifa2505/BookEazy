import bcrypt from "bcrypt";
import { categoryModel } from "../models/categoryModel.js";
import { serviceModel } from "../models/serviceModel.js";
import { servicepersonModel } from "../models/servicepersonModel.js";
import { userModel } from "../models/userModel.js"

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} name 
 * @param {String} email 
 * @param {String} location 
 * @param {String} phone 
 * @param {String?} image_url 
 */
async function addUser(username, password, name, email, location, phone, image_url=null){
    try{
        let hashedPassword = await bcrypt.hash(password,10)
        // console.log(hashedPassword);
        await userModel.create({
            username: username,
            password: hashedPassword,
            name: name,
            email: email,
            location: location,
            phone: phone,
            image_url:image_url
        })

    }
    catch(err) {
        console.log(err);
        throw new Error("Error storing data.");
    }
}

/**
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 * @param {String} location 
 * @param {String} qualification 
 * @param {String} bio 
 * @param {Array} servicesOffered 
 * @param {String} username 
 * @param {String} password 
 * @param {String?} image_url 
 */
async function addServiceperson(name, email, phone, location, qualification, bio, servicesOffered, username, password, image_url=null){
    try{
        let hashedPassword = await bcrypt.hash(password,10)
        // console.log(hashedPassword);
        await servicepersonModel.create({
            name: name,
            email: email,
            phone: phone,
            location: location,
            qualification: qualification,
            bio: bio,
            servicesOffered: servicesOffered,
            username: username,
            password: hashedPassword,
            image_url: image_url
        })

    }
    catch(err){
        console.log(err);
        throw new Error("Error storing data.");
    }

}

export {addUser,addServiceperson}