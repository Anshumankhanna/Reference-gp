const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const complaintModel = require("../models/complaintModel");
const isLoggedIn = require("../middleware/isLoggedIn");

let capitalize = (string) => {
    return string[0].toUpperCase() + string.slice(1);
};

router.get("/", (req, res) => {
    res.send("This is complaints route");
});
router.post("/create", isLoggedIn, async (req, res) => {
    try {
        let { subject, complaint } = req.body;
        let newComplaint = await complaintModel.create({
            user: req.user._id,
            subject: capitalize(subject),
            complaint: capitalize(complaint)
        });
        let user = await userModel.findOne({
            access: req.user.access,
            enrollmentNumber: req.user.enrollmentNumber
        });

        user.complaints.push(newComplaint._id);
        await user.save();

        req.flash("success", "Your complaint has been added");
        res.redirect("/users");
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;