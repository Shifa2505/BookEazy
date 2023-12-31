import bcrypt from "bcrypt";
import { categoryModel } from "../models/categoryModel.js";
import { serviceModel } from "../models/serviceModel.js";
import { servicepersonModel } from "../models/servicepersonModel.js";
import { userModel } from "../models/userModel.js";
import { bookingModel } from "../models/bookingModel.js";

/**
 * @param {String} username
 * @param {String} password
 * @param {String} name
 * @param {String} email
 * @param {String} location
 * @param {String} phone
 * @param {String?} image_url
 */
async function addUser(
  username,
  password,
  name,
  email,
  location,
  phone,
  image_url = null
) {
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    await userModel.create({
      username: username,
      password: hashedPassword,
      name: name,
      email: email,
      location: location,
      phone: phone,
      image_url: image_url,
    });
  } catch (err) {
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
async function addServiceperson(
  name,
  email,
  phone,
  location,
  qualification,
  bio,
  servicesOffered,
  username,
  password,
  image_url = null
) {
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
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
      image_url: image_url,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error storing data.");
  }
}

/**
 * @param {String} username
 * @param {String} password
 */
async function userLogin(username, password) {
  let user = await userModel.findOne(
    { username: username },
    { _id: 0, __v: 0 }
  );
  if (!user) {
    throw new Error("User does not exist.");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  } else {
    delete user.password;
    return user;
  }
}

/**
 * @param {String} username
 * @param {String} password
 */
async function servicepersonLogin(username, password) {
  let serviceperson = await servicepersonModel.findOne(
    { username: username },
    { _id: 0, __v: 0 }
  );
  if (!serviceperson) {
    throw new Error("Serviceperson does not exist.");
  }
  if (!(await bcrypt.compare(password, serviceperson.password))) {
    throw new Error("Invalid credentials");
  } else {
    delete serviceperson.password;
    return serviceperson;
  }
}

async function getServiceCategories() {
  const categories = await categoryModel.find({}, { _id: 0, __v: 0 });
  return categories;
}

/**
 * @param {String} category
 */
async function getServicepersonForCategories(category) {
  const serviceCategory = await categoryModel.findOne({ name: category });
  if (!serviceCategory) {
    throw new Error("No such service category.");
  }
  const servicepeople = await servicepersonModel
    .find(
      {
        "servicesOffered.service": serviceCategory._id,
      },
      { _id: 0 }
    )
    .populate("servicesOffered.service", { _id: 0 });
  return servicepeople;
}

/**
 *
 * @param {String} serviceName
 * @param {String} servicePerson
 * @param {String} username
 * @param {Date} timeslot
 */
async function createBookingRequest(
  serviceName,
  servicePerson,
  username,
  timeslot
) {
  const service = await serviceModel.findOne({ name: serviceName });
  if (!service) {
    throw new Error("No such service found.");
  }
  const serviceperson = await servicepersonModel.findOne({
    username: servicePerson,
    "servicesOffered.service": service.category,
  }); //.populate("servicesOffered.service");
  if (!serviceperson) {
    throw new Error("No such serviceperson for the service.");
  }
  const fare = serviceperson.servicesOffered.filter(
    (d) => d.service == service.category.toString()
  )[0].fare;
  if (!fare) {
    throw new Error("Error getting approximate fare.");
  }
  const user = await userModel.findOne({ username: username });
  if (!user) {
    throw new Error("No such user found.");
  }
  const newBooking = await bookingModel.create({
    service: service._id,
    servicePerson: serviceperson._id,
    user: user._id,
    fare: fare,
    startTime: timeslot,
  });
  serviceperson.bookings.push(newBooking._id);
  await serviceperson.save();
  user.bookings.push(newBooking._id);
  await user.save();
  return newBooking;
}

/**
 *
 * @param {String} serviceperson
 * @param {String} bookingId
 */
async function acceptBooking(servicepersonUsername, bookingId) {
  const booking = await bookingModel.findOne({
    _id: bookingId,
  });
  if (!booking) {
    throw new Error("No such booking.");
  }
  const serviceperson = await servicepersonModel.findOne({
    username: servicepersonUsername,
  });
  if (!serviceperson) {
    throw new Error("No such serviceperson.");
  }
  if (serviceperson._id.toString() != booking.servicePerson.toString()) {
    throw new Error("Can only accept your own booking requests.");
  }
  if (booking.status == "PENDING") {
    booking.status = "ACCEPTED";
    await booking.save();
  } else {
    throw new Error("Only pending requests can be accepted.");
  }
}

/**
 *
 * @param {String} serviceperson
 * @param {String} bookingId
 */
async function rejectBooking(servicepersonUsername, bookingId) {
  const booking = await bookingModel.findOne({
    _id: bookingId,
  });
  if (!booking) {
    throw new Error("No such booking.");
  }
  const serviceperson = await servicepersonModel.findOne({
    username: servicepersonUsername,
  });
  if (!serviceperson) {
    throw new Error("No such serviceperson.");
  }
  if (serviceperson._id.toString() != booking.servicePerson.toString()) {
    throw new Error("Can only reject your own booking requests.");
  }
  if (booking.status == "PENDING") {
    booking.status = "REJECTED";
    await booking.save();
  } else {
    throw new Error("Only pending requests can be rejected.");
  }
}

async function listUserBookings(username) {
  const user = await userModel
    .findOne({ username: username }, { username: 1, bookings: 1 })
    .populate({
      path: "bookings",
      populate: {
        path: "servicePerson",
      },
    })
    .populate({
      path: "bookings",
      populate: {
        path: "service",
      },
    });
  if (user) {
    return user;
  } else {
    throw new Error("Error getting specified user bookings");
  }
}

async function listServicepersonBookings(username) {
  const serviceperson = await servicepersonModel
    .findOne({ username: username }, { username: 1, bookings: 1 })
    .populate({
      path: "bookings",
      populate: {
        path: "user",
      },
    })
    .populate({
      path: "bookings",
      populate: {
        path: "service",
      },
    });
    if (serviceperson) {
      return serviceperson;
    } else {
      throw new Error("Error getting specified serviceperson bookings");
    }
}

export {
  addUser,
  addServiceperson,
  userLogin,
  servicepersonLogin,
  getServiceCategories,
  getServicepersonForCategories,
  createBookingRequest,
  acceptBooking,
  rejectBooking,
  listUserBookings,
  listServicepersonBookings,
};
