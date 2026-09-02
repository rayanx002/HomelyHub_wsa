// State Manager
// all list of properties
// count the no. of properties
// search filter
// loading flag
// error handling

import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const propertySlice = createSlice({

    name: "property",
    initialState:{
        properties:[],
        totalProperties: 0,
        searchParams: {},
        error: null,
        loading: false
    },

    reducers: {
        getRequest(state){
            state.loading = true;
        },

        getProperties(state, action){
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false; // request finished => hide the loader
        },

        updateSearchParams: (state, action)=> {
            state.searchParams = Object.keys(action.payload).length ===0 ?{} : {
                ...state.searchParams,
                ...action.payload
            }
        },

        getErrors(state, action){
            state.error = action.payload
        }
    }
})

export const propertyAction = propertySlice.actions

export default propertySlice;
