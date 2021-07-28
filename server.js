const express = require("express");
const connectDB = require("./config/dbConnect");
require('dotenv').config();

const app = express();
//connect to DB
connectDB();

//routes
app.use(express.json());
app.use("/user",require("./routes/user"))
app.use("/product",require("./routes/product"))
app.use("/category",require("./routes/category"))

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server is running on ${PORT}`)
})