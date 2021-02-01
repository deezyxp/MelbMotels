const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: String, require: true},
        datetime: { type: Date, required: true },
        table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: false }
    },
    {
        timestamps: true,
    }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;