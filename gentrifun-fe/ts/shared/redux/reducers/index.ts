import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import apiReducer from "./apiReducer";

const combinedReducers = combineReducers(
    {
        locationReducer,
        apiReducer
    });

export default combinedReducers;