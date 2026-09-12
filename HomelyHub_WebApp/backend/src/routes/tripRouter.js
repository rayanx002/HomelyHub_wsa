import express from "express";
import { createTripPlan } from "../controller/tripController.js";

const tripRouter = express.Router();

tripRouter.route("/").post(createTripPlan);

export { tripRouter };