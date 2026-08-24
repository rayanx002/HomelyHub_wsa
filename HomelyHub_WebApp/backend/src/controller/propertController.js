// get all properties
// get property based on Id

import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// get all properties

const getProperties = async (req, res) => {
    try {
        const features = new APIFeatures(Property.find(), req.query)
            .filter()
            .search()
            .paginate()

        const allProperties = await Property.find();

        const doc = await features.query;

        res.status(200).json({
            status: "success",
            no_of_responses: doc.length,
            data: doc
        })

    } catch (error) {
        console.error(" Error searching properties: ", error)
        res.status(500).json({ error: "Internal server error" })

    }
}

// get property
// http://localhost:8080/api/v1/rent/listing/:id
//req.params.id

const getProperty = async(req, res)=>{
    try{
        const property = await Property.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: property,
        })

    }catch(error){

        req.status(404).json({
            status: "failed",
            message: error.message
        })

    }
}

export{
    getProperties,
    getProperty
}