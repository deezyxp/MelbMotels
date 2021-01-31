const { fake } = require("faker");
const fs = require("fs");
const numberTable = Math.floor(Math.random() * 10) + 20

let fakeTables = []
for (i = 1; i < numberTable; i++) {
    const seats = Math.floor(Math.random() * 6) + 2
    const name = `Table ${i}`
    const area = ["Outside", "inside", "Bar"] [Math.floor(Math.random() * 3)]
    fakeTables.push({
        
        name: name,
        capacity: seats,
        isAvailable: true,
        area: area
    })
}

fs.writeFileSync(__dirname + "/tableseed.json", JSON.stringify({ table: fakeTables }, null, 2))