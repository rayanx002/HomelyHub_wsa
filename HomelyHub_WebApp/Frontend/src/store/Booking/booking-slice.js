// manage bookings

// store all bookings
// store individual booking details
// track the API loading status
// add new bookings when a booking is created
// update the booking data when we receive it from the backend

import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    bookings: [],
    bookingDetails: {},
    loading: false
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingRequest(state){
            state.loading = true;
        },

// stores the booking received from the API

        setBookings(state, action){
            state.bookings = action.payload;
            state.loading = true;
        },

        addBooking: (state, action)=>{
            state.bookings.push(action.payload);
        },

        setBookingDetails: (state, action)=>{
            state.bookingDetails = action.payload.bookings;
        }

    }
})

export const {setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice;