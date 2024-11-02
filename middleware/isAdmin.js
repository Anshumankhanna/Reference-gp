import adminModel from "../models/adminModel.js";

export default async (req, res, next) => {
    if (req.user.access !== "admin") {
        req.flash("error", "You aren't an admin");
        return res.redirect("/logout");
    }
    
    next();
};