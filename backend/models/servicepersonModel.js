import mongoose, {Schema, model} from "mongoose";

const servicepersonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobs_done: {
        type: Number,
        default: 0
    },
    qualification: {
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    image_url:{
        type: String,
        required: false
    },
    servicesOffered: [
        {type: Schema.Types.ObjectId}
    ],
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

const servicepersonModel = new model("Serviceperson",servicepersonSchema
);

export {
    servicepersonModel
}