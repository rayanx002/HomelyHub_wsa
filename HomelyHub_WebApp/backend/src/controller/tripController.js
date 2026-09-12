// receive the users information
// validate the required information
// send the information to our AI trip planner
// calculate the budget per night
// search MongoDB for suitable properties
// send both AI trip plan + matching properties back to the  Frontend (user)

import { Property } from "../Models/propertyModel.js";
import { planTrip } from "../ai/tripPlanner.js";
import { generateDescription } from "../ai/generateDescription.js";

const cleanCity = (text) => text.toLowerCase().replaceAll(" ", "")

const createTripPlan = async (req, res) => {
    
    try {

        const { destination, budget, days, people, interests } = req.body;

        if (!destination || !budget || !days || !people) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required information"
            })
        }

        const plan = await planTrip({

            destination,
            budget,
            days,
            people,
            interests: interests || []
        });

        const perNight = Number(budget) / Number(days);

        const city = cleanCity(destination);

        const properties = await Property.find({

            $or: [
                { "address.city": city },
                { "address.state": city },
                { "address.area": city }
            ],

            price: { $lte: perNight },
            maximumGuest: { $gte: Number(people) },
        }).limit(6);

        res.status(200).json({
            status: "success",
            data: { plan, properties, perNight }
        });

    } catch (error) {
        console.error("=================================");
        console.error("TRIP PLANNER ERROR:");
        console.error(error);
        console.error("=================================");

        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}


const writeDescription = async(req, res) => {
    try {
        
        const description = await generateDescription(req.body);

        res.status(200).json({
            status: "success",
            data: { description }
        });
    } catch (error) {
        console.error("=================================");
        console.error("DESCRIPTION GENERATOR ERROR:");
        console.error(error);
        console.error("=================================");

        res.status(500).json({
            status: "fail",
            message: error.message
        });
    }
}

export { createTripPlan, writeDescription };