import Immutable from 'immutable';
import { LOCATION_SELECTED, Action } from "../actions";

const initialState = Immutable.fromJS({
    locationId: null
});

export default (state = initialState, action: Action) => {
    console.log("location reducer before", action.payload);
    if (action.type === LOCATION_SELECTED) {
        console.log("location reducer selected", action.payload);
        return state.set('locationId', action.payload);
    }
    console.log("location reducer after", state.get("locationId"));
    return state;
};