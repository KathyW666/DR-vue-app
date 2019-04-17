const express = require('express');
const mongoose = require('mongoose');
const app = express();

const users = require('./routes/api/users');

// DB config
const db = require('./config/keys.js').mongoURI;

// Connected to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (request, response) => {
    response.send("Hello World!");
})

// use routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
