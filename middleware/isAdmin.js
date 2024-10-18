const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');

module.exports = async (req, res, next) => {
    if (req.user.access !== "admin") {
        req.flash("error", "You aren't an admin");
        return res.redirect("/logout");
    }
    
    next();
};