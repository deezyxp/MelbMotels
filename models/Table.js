const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema(
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
    },
    {
        timestamps: true,
    }
);

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;