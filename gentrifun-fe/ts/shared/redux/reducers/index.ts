import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import routeReducer from "./routeReducer";

const combinedReducers = combineReducers(
    {
        locationReducer,
        routeReducer
    });

export default combinedReducers;