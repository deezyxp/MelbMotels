const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const daySchema = new Schema(
    {
        date: Date,
        tables: [tableSchema]
    },
    {
        timestamps: true,
    
    }
);


const Day = mongoose.model("Day", daySchema);


module.exports = Day;