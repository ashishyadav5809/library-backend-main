const express = require("express");
const router = express.Router();
const Books = require("../model/Books");
const validateBook = require("../middleware/validateBooks");

// get all books record

router.get("/", async (req, res) => {
    try {
        const books = await Books.find();

        if(!books){
            return res.status(404).json({
                success : false,
                message : "No books found"
            })
        }

        return res.status(200).json({
            success : true,
            data : books
        })
    } catch (error) {
        console.log("Error in getting books : ", error);
        return res.status(500).json({
            success : false,
            message : "Error in getting books"
        })
    }
});

// add new books

router.post("/",validateBook, async (req, res) => {
    try {
        const {
            title,
            author,
            ISBN,
            category,
            publisher,
            publicationYear,
            totalCopies,
            availableCopies,
            shelfLocation,
            bookType,
            status
        } = req.body;


        if(!title || !author || !ISBN || !category || !publisher || !publicationYear || !totalCopies || !availableCopies || !shelfLocation || !bookType || !status){
            return res.status(400).json({
                success : false,
                message : "Required fields are missing"
            })
        }

        const book = await Books.create({
            title,
            author,
            ISBN,
            category,
            publisher,
            publicationYear,
            totalCopies,
            availableCopies,
            shelfLocation,
            bookType,
            status
        })

        await book.save();

        if(!book){
            return res.status(400).json({
                status : false,
                message : "Unable to add book to the databse"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Book added successfully",
            data : book
        })
    } catch (error) {
        console.log("Error while add books ",error);
        return res.status(500).json({
            success : false,
            message : "Error while add books"
        })
    }
});

// search book by title 
router.get("/search", async (req, res) => {
    try {
        const {title} = req.query;

        if(!title){
            return res.status(404).json({
                success : false,
                message : "Please provide the title first"
            })
        }

        const book = await Books.findOne({
            title
        });

        if(!book){
            return res.status(404).json({
                success : false,
                message : "Did not got any books"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Book fetched successfully",
            data : book
        })
    } catch (error) {
        console.log("Internal server error : ",error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

// get book by /:id

router.get("/:id", async (req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(404).json({
                success : false,
                message : "Please provide the id first"
            })
        }

        const book  = await Books.findById({
            _id : id
        });

        if(!book){
            return res.status(404).json({
                success : false,
                message : "Did not got any books"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Book fetched successfully",
            data : book
        })
    } catch (error) {
        console.log("Internal server error : ",error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

// update bbok details

router.put("/:id", async (req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(404).json({
                success : false,
                message : "Please provide the id first"
            })
        }

        const book  = await Books.findById({
            _id : id
        });

        if(!book){
            return res.status(404).json({
                success : false,
                message : "Did not got any books"
            })
        }

        const newBook = await Books.findByIdAndUpdate({
            _id : id
        }, {
            $set : req.body
        }, {
            new : true,
        });

        return res.status(200).json({
            success : true,
            message : "Book updated successfully",
            data : newBook
        })
    }catch(error){
        console.log("Internal server error : ",error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

// delete book. by id 

router.delete("/:id", async (req,res)=>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(404).json({
                success : false,
                message : "Please provide the id first"
            })
        }

        const book  = await Books.findById({
            _id : id
        });

        if(!book){
            return res.status(404).json({
                success : false,
                message : "Did not got any books"
            })
        }

        const newBook = await Books.findByIdAndDelete({
            _id : id
        });

        return res.status(200).json({
            success : true,
            message : "Book deleted successfully",
            data : newBook
        })
    }catch(error){
        console.log("Internal server error : ",error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
})

module.exports = router;