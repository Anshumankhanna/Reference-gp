const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");
const isDevAdmin = require("../middleware/isDevAdmin");
const isAdmin = require("../middleware/isAdmin");
const complaintModel = require("../models/complaintModel");
const router = express.Router();


router.get("/", isLoggedIn, isAdmin, async (_req, res) => {
    let complaints = await complaintModel.find().populate({
        path: "user",
        select: "access enrollmentNumber fullname email mobile"
    });
    console.log(complaints);

    res.render("admin", {
        stylesheet: "users",
        script: "users",
        button: 2,
        complaints
    });
});
router.post("/create/devadmin", isLoggedIn, async (req, res) => {
    console.log(req.body);
    if (req.body.auth_key !== process.env.AUTH_KEY) {
        req.flash("error", "You can't access this route")
    } else {
        let user = await userModel.findOne({ enrollmentNumber: req.user.enrollmentNumber });

        user.access = "admin";
        await user.save();

        let newAdmin = await adminModel.create({
            user: req.user._id,
            level: "devadmin"
        });
        
        req.flash("success", "You are a dev admin now");
    }
    
    res.redirect("/users");
});
router.post("/create", isLoggedIn, isDevAdmin, async (req, res) => {
    if (req.body.auth_key !== process.env.AUTH_KEY) {
        req.flash("error", "You can't access this route");
    } else {
        let user = await userModel.findOne({ enrollmentNumber: req.body.enrollmentNumber });
        let newAdmin = await adminModel.create({
            user: user._id
        });
    
        req.flash("success", "You are an admin now");
    }

    res.redirect("/users");
});

module.exports = router;