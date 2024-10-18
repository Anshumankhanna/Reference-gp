const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

module.exports = async (req, res, next) => {
    if (req.user.access !== "admin") {
        req.flash("error", "You aren't an admin");
        return res.redirect("/logout");
    }

    try {
        let admin = await adminModel.findOne({ user: req.user._id });

        if (admin.level !== "devadmin") {
            req.flash("error", "You are just an admin");
            res.redirect("/logout");
        } else {
            req.flash("success", "Hello Dev Admin");
            next();
        }
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/logout");
    }
};