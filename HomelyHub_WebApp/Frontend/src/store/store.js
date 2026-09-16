import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./Property/property-slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-slice";
import userSlice from "./User/user-slice";
import bookingSlice from "./Booking/booking-slice";
import paymentSlice from "./Payment/payment-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";


const store =  configureStore({
    reducer:{
        properties: propertySlice.reducer,
        propertydetails: propertyDetailsSlice.reducer,
        user: userSlice.reducer,
        booking: bookingSlice.reducer,
        accomodation: accomodationSlice.reducer,
        payment: paymentSlice.reducer
    }
})

export default store;