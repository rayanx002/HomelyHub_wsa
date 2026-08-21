// Address List

import express from "express";
import { signup, login } from "../controller/authController.js";

const router = express.Router();

//signup route
router.route("/signup").post(signup);

//login route
router.route("/login").post(login);

export {router}