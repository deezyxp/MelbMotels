const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = new Schema(
    {
        customer_name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        table_id: { type: Schema.Types.ObjectId, required: true , ref: "Table"},
        
        
    },
    {
        timestamps: true,
    
    }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;