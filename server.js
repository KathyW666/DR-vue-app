const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");

const app = express();

// 引入 users.js
const users = require('./routes/api/users');

// DB config
const db = require('./config/keys.js').mongoURI;

// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Connected to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// })

// 引入 routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
