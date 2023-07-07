const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    perks: {
        type: [String]
    },
    checkIn: {
        type: "String",
        required: true
    },
    checkOut: {
        type: "String",
        required: true
    },
    maxGuests: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
},
{timestamps: true})

module.exports = mongoose.model("Place", placeSchema);