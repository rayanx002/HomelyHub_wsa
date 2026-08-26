import { User } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { sendMail, forgotPasswordMailGenContent } from "../utils/mail.js";
import imagekit from "../utils/ImagekitIO.js";
import { signinToken, createSendToken, defaultAvatarUrl, filterObj } from "../utils/token.js";

//signup: create the account

const signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            avatar: { url: req.body.avatar || defaultAvatarUrl(req.body.name) }
        })

        createSendToken(newUser, 201, res);

    } catch (error) {
        const duplicateField = Object.keys(error.keyPattern || {})[0];
        const message = duplicateField ? `An account with that ${duplicateField} already exists` : error.message;
        res.status(400).json({ message: error.message });
    }
}

//login: check if the user exists (email, password) and send the token

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("Please provide email and password");
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || (await user.correctPassword(password, user.password)) === false) {
            throw new Error("Incorrect email or password");
        }

        createSendToken(user, 200, res);

    } catch (error) {
        res.status(401).json({ status: "fail", message: error.message });
    }
}

// protect

const protect = async (req, res, next) => {
    try {
        // step 1: find token
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1]

        } else if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
            token = req.cookies.jwt;
        }

        // step 2: no token stop here..

        if (!token) {
            throw new Error("You are not logged in!!, Please login to access")
        }

        // step 3: check token is real or not

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // step 4: token is real but user is still valid??

        const currentUser = await User.findById(decoded.id)
        if (!currentUser) {
            throw new Error("the user belonging to the token doesn't exist")
        };

        // step 5: stolen token case

        if (currentUser.changedPasswordAfter(decoded.iat)) {
            throw new Error("User recently changed password, please login again!")
        }

        // step 6: all checks passed

        req.user = currentUser;
        next();

    } catch (error) {

        res.status(401).json({
            status: "fail",
            message: error.message

        })
    }
}

export { signup, login, protect };

