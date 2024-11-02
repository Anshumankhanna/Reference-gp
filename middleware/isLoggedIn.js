import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const { verify } = jwt;

export default async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect("/");
    }

    try {
        let decoded = verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({ enrollmentNumber: decoded.enrollmentNumber })
        .select("-password");

        req.user = user;

        next();
    } catch (err) {
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};