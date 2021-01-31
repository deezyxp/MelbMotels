const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationScheme = require("./Reservation").schema

const tableSchema = new mongoose.Schema(
    {
        name: String,
        capacity: Number,
        isAvailable: Boolean,
        area: String,
        reservation: {
            required: false,
            type: reservationSchema
        }
        // seat_num: { type: String, required: true },
    },
    {
        timestamps: true,
    
    }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;