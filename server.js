const express = require('express');
const connectionDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');


connectionDb();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // for parsing data from request
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler); //each request will pass this middleware

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});