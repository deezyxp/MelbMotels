const express = require("express");
const router = express.Router();

// Models
const Table = require('../models/Table');
const Reservation = require('../models/Reservation');

router.post('/available', async (req, res) => {

    console.log(req.body);

    const reservations = await Reservation.find({
        date: new Date(req.body.tableFilter.date).toLocaleDateString() // figure out how to filter by time as well
    });

    const tables = await Table.find({capacity : {"$lt": req.body.tableFilter.size}}); // 23

    console.log(`There are ${reservations.length} reservations booked for this day`);

    if (reservations.length > 0) {
        
        let tableReservedIds = reservations.map(r => r.table.toString()); // [60179de5443c8d502842a380]

        // Filter out the tables with reservations for that date
        return res.json(tables.filter(table => {
            return !tableReservedIds.includes(table._id.toString())
        }));
    } else {
        return res.json(tables);
    }
});

module.exports = router;