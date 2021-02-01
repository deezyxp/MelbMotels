const mongoose = require("mongoose");
// Connect to the Mongo DB
function connectDb(){
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/photastic",
        {
            useCreateIndex: true,
            useNewUrlParser: true,
        }, (err) => {
            if (err) console.error(err); 

            console.log("successfully connected to DB")
        }
    );
};

module.exports = connectDb;