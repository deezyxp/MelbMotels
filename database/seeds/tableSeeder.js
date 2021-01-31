const faker = require("faker");
const Table = require("./../../models/Table");

async function seedData() {
    // delete everything inside db
    Table.collection.deleteMany();
    // for loop to generate X amount of records in my db
    console.log('creating table');
    for (let index = 0; index < 50; index++) {
        
        const table = new Table({
            
            seat_num: Math.ceil(Math.random() * 10).toFixed(0)
        });
     table.save();
    }
}
module.exports = seedData;