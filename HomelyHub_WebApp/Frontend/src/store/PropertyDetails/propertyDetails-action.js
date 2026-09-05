import { propertyDetailsAction } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

// fetch details of one specific property using its ID

// receive the property ID
// start loading
// call backend API 
// wait for response
// get the property data
// store the details in redux
// if error store error in redux

export const getPropertyDetails = (id) => async (dispatch) => {

    try {

        dispatch(propertyDetailsAction.getListRequest());

        const response = await axiosInstance(`/v1/rent/listing/${id}`)
        console.log(response);

        if (!response) {
            throw new Error("Failed to fetch property details")
        }

        const { data } = response.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data));

    } catch (error) {
        dispatch(propertyDetailsAction.getErrors(error.response.data.error))
    }
}