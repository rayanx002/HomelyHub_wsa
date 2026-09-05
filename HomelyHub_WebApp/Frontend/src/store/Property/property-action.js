import { propertyAction } from "./property-slice";
import { axiosInstance } from "../../utils/axios";

// get all the properties
// 1. start the api req
// 2. Tell redux loading started
// 3. Get search parameters
// 4. call backend api
// 5. wait for response
// 6. get the property data
// 7. send data to Redux store
// 8. if error => send error to redux

// dispatch = SEND to Redux
// getState = GET from Redux
export const getAllProperties = () => async (dispatch, getState) => {

    try {

        console.log("API call started");

        dispatch(propertyAction.getRequest())

        const { searchParams } = getState().properties;

        console.log(searchParams);

        const response = await axiosInstance.get(`/v1/rent/listing`, {
            params: { ...searchParams }
        })
        if (!response) {
            throw new Error("couldn't fetch any properties")
        }

        const { data } = response;
        console.log(data);

        dispatch(propertyAction.getProperties(data))

    } catch (error) {
        dispatch(propertyAction.getError(error.message))
    }
}
