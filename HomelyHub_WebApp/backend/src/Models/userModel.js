//user Schema

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide your name"],
            //'        John     ' => 'John'
            trim: true,
            maxLength: [50, "Name should not exceed 50 characters"]

        }
    }
)