import { Router } from "express";

import isLoggedIn from "../middleware/isLoggedIn.js";
import isDevAdmin from "../middleware/isDevAdmin.js";
import isAdmin from "../middleware/isAdmin.js";
import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import complaintModel from "../models/complaintModel.js";

const router = Router();

router.get("/", isLoggedIn, isAdmin, async (_req, res) => {
    let complaints = await complaintModel.find().populate({
        path: "user",
        select: "access enrollmentNumber fullname email mobile"
    });

    res.render("admin", {
        stylesheet: "users",
        script: "users",
        button: 2,
        complaints
    });
});
router.post("/create/devadmin", isLoggedIn, async (req, res) => {
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

export default router;