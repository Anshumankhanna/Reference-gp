const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { stylesheet: "", script: "login", button: 0, error });
});

router.get("/login", (req, res) => {
    res.redirect("/");
});

router.get("/signup", (req, res) => {
    let error = req.flash("error");
    
    res.render("signup", {
        stylesheet: "signup",
        script: "user",
        button: 1,
        error
    });   
});

router.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

module.exports = router;