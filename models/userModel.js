const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"User name is required"],
    },
    email: {
        type: String,
        required: [true,"User email is required"],
    },
    phone: {
        type: String,
        required: [true,"User phone number is required"],
    },
    password: {
        type: String,
        required: [true,"User password is required"],
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User",userSchema)