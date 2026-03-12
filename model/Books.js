const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    ISBN:{
        type: String,
        required: true,
        unique : true
    },
    category:{
        type : String,
        required : true
    },
    publisher:{
        type : String,
        required : true
    },
    publicationYear:{
        type : Number,
        required : true
    },
    totalCopies : {
        type : Number,
        required : true
    },
    availableCopies : {
        type : Number,
        required : true
    },
    shelfLocation:{
        type:String,
        required : true
    },
    bookType:{
        type : String,
        required : true,
        enum:["Reference","Circulating"]
    },
    status:{
        type : String,
        required : true,
        enum:["Available","Checked out"]
    }
});

const Books = new mongoose.model("Books", bookSchema);
module.exports = Books;