const dbConnect = require("./dbConnect");
const express = require("express");

const cors = require("cors");

const app = express();

dbConnect();

app.use(cors());

app.use(express.json());

app.use("/api/books", require("./routes/books"));

app.listen(8000, () => {
    console.log("Server is running on port http://localhost:8000");
})