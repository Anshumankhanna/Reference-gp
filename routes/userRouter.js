import { Router } from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import { signupUser, loginUser, logout } from "../contollers/authController.js";

const router = Router();

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

export default router;