const express = require('express');;
const router = express.Router();
const Reservation = require("./../models/Reservation");

const mongoose = require("mongoose")






router.get('/reservations', (req, res) => {
    // TODO: getting all the reservations
    console.log('heyyy');
})

router.get('/reservations/:id', (req, res) => {
    // TODO: get the specific reservations
})

router.post('/reservations', (req, res) => {
    // TODO: create a new reservation record
  
    console.log(req.body);

    Reservation.create({
        customer_name: req.body.customer_name,
        phone: req.body.phone,
        email: req.body.email,
        table_id: req.body.table_id,
    }).then((result) => {
        res.json({
            data: result
        })
    }).catch(err => console.error(err));


})

router.patch('/reservations/:id', (req, res) => {
    // TODO: update reservation
})

router.delete('/reservations/:id', (req, res) => {
    // TODO: delete a reservation
})



// models

// table (one to many reservation)
// id
// seat_num
// table num -- stirng


// company
// - name
// - table number



// reservations
//  - customer name
// - phone
// - email
// - table_id



module.exports = router;


