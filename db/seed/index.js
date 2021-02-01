const connectDb = require('./../../config/database');


const reservationSeeder = require('./reservationSeeder');
const tableSeeder = require('./tableSeeder');
// connected to DB
connectDb();
async function seed(){
    // will run all the seeder files

    await reservationSeeder();
    await tableSeeder();
}
seed()