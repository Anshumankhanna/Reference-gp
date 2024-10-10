const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

module.exports.signupUser = async (req, res) => {
    try {
        let { access, enrollmentNumber, fullname, email, mobile, password } = req.body;
        let user = await userModel.findOne({ enrollmentNumber });

        if (user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(400).send(err.message);
                } else {
                    let createdUser = await userModel.create({
                        access,
                        enrollmentNumber,
                        fullname,
                        email,
                        mobile,
                        password: hash
                    });
                    let token = generateToken(createdUser);

                    res.cookie("token", token);
                    res.redirect("/users");
                }
            });
        });
    } catch (err) {
        res.status(503).send(err.message);
    }
};
module.exports.loginUser = async (req, res) => {
    let { access, enrollmentNumber, password } = req.body;
    let user = await userModel.findOne({ access, enrollmentNumber });

    if (!user) {
        req.flash("error", "Email or password incorrect")
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            res.send(err);
        } else if (result) {
            let token = generateToken(user);

            res.cookie("token", token);
            res.redirect("/users")
        } else {
            req.flash("error", "Email or password incorrect")
            return res.redirect("/");
        }
    });
};
module.exports.logout = (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
};