const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    numOfGuests: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number
    }
},

{timestamps: true})

module.exports = mongoose.model("Booking", bookingSchema);