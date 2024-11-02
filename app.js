// we have to import 'static' as 'static_' because 'static' is a keyword.
import express, { json, urlencoded, static as static_ } from "express";
import cookieParser from "cookie-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import expressSession from "express-session";
import flash from "connect-flash";

// this runs the code that is in this file.
import "dotenv/config";
import "./config/mongoose-connection.js";

import indexRouter from "./routes/indexRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import complaintRouter from "./routes/complaintRouter.js";

const app = express();
// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory path of the current module
const __dirname = dirname(__filename);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use(static_(join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/complaints", complaintRouter);

app.listen(3000);