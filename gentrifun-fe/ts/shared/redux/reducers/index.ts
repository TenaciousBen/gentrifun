import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import apiReducer from "./apiReducer";
import routeReducer from "./routeReducer";

const combinedReducers = combineReducers(
    {
        locationReducer,
        apiReducer,
        routeReducer
    });

export default combinedReducers;