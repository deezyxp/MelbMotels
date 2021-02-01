const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const tableSchema = new mongoose.Schema(
    {
        name: String,
        capacity: Number,
        isAvailable: Boolean,
        area: String,
        reservation: {
            required: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reservation'
        }
        // seat_num: { type: String, required: true },
    },
    {
        timestamps: true,
    
    }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;