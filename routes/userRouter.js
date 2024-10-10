const express = require("express");
const router = express.Router();
const { signupUser, loginUser, logout } = require("../contollers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");
const userModel = require("../models/userModel");

router.get("/", isLoggedIn, async (req, res) => {
    await req.user.populate("complaints");

    let complaints = req.user.complaints;

    complaints = complaints.map((elem) => {
        let { subject, complaint, status } = elem;

        elem.subject = subject[0].toUpperCase() + subject.slice(1);
        elem.complaint = complaint[0].toUpperCase() + complaint.slice(1);
        elem.status = status[0].toUpperCase() + status.slice(1);

        return elem;
    });
    
    res.render("user", {
        stylesheet: "users",
        script: "users",
        button: 2,
        complaints
    });
});
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;