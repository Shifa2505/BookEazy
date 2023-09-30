import bcrypt from "bcrypt";
import { categoryModel } from "../models/categoryModel.js";
import { serviceModel } from "../models/serviceModel.js";
import { servicepersonModel } from "../models/servicepersonModel.js";
import { userModel } from "../models/userModel.js"

/**
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

/**
 * @param {String} username 
 * @param {String} password
 */
async function userLogin(username,password){
    let user = await userModel.findOne({username: username}, {_id:0, __v:0});
    if(!user){ throw new Error("User does not exist.")}
    if( !await bcrypt.compare(password, user.password)){
        throw new Error("Invalid credentials");
    }
    else{
        delete user.password;
        return user;
    }
}

/**
 * @param {String} username 
 * @param {String} password
 */
async function servicepersonLogin(username,password){
    let serviceperson = await servicepersonModel.findOne({username: username}, {_id:0, __v:0});
    if(!serviceperson){ throw new Error("Serviceperson does not exist.")}
    if( !await bcrypt.compare(password, serviceperson.password)){
        throw new Error("Invalid credentials");
    }
    else{
        delete serviceperson.password;
        return serviceperson;
    }
}

async function getServiceCategories(){
    const categories = await categoryModel.find({},{_id:0,__v:0});
    return categories;
}

/**
 * @param {String} category 
 */
async function getServicepersonForCategories(category){
    const serviceCategory = await categoryModel.findOne({name:category});
    if(!serviceCategory){throw new Error("No such service category.")}
    const servicepeople = await servicepersonModel.find({servicesOffered:serviceCategory._id});
    return servicepeople;
}

export {addUser,addServiceperson,userLogin,servicepersonLogin,getServiceCategories,getServicepersonForCategories}