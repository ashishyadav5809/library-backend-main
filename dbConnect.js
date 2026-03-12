const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async ()=>{
    try {
        const MONGO_URI = process.env.MONGO_URI;

        if(!MONGO_URI){
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(MONGO_URI);

        console.log("DB connected");
    } catch (error) {
        console.log("DB connection error : ", error);
        throw new Error ("DB connection error");
    }
}

module.exports = dbConnect;