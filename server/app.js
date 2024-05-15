const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require('path');

// import external files
const todoListRouter = require("./routes/todolistRoutes");
const connectDB = require("./config/connectDB");

// Create express instance
const app = express();

// Port for running server
const port = process.env.PORT || 5000;

// This will show tracking while it is in developement mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(bodyParser.json()).use(cors({
    origin: '*',
    optionsSuccessStatus: 200 
}));
app.use(express.json());


// Define a route to serve the HTML file
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, '/index.html'));
});


// Todo List Routes
app.use("/api/v1/todo-list", todoListRouter)

// Call to database for connecting purpose
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️  Server is running at port : ${port}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });

module.exports = app;
