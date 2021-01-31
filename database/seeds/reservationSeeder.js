const faker = require("faker");
const Reservation = require("./../../models/Reservation");
const getRandomModel = require("./helper/getRandomModel");

async function seedData() {
    // delete everything inside db
    Reservation.collection.deleteMany();
    // for loop to generate X amount of records in my db
    console.log('creating reservation');
    for (let index = 0; index < 50; index++) {
        const randomTable = await getRandomModel("Table")
        const reservation = new Reservation({
            customer_name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            table_id:randomTable._id,
        });
        reservation.save();
    }
}
module.exports = seedData;