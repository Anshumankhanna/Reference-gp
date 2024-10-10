const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const db = require("./config/mongoose-connection");
const dotenv = require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const complaintRouter = require("./routes/complaintRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/complaints", complaintRouter);

app.listen(3000);