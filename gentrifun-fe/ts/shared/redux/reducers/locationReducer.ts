import Immutable from 'immutable';
import { LOCATION_SELECTED, Action } from "../actions";

const initialState = Immutable.fromJS({
    locationId: null
});

export default (state = initialState, action: Action) => {
    if (action.type === LOCATION_SELECTED) {
        return state.set('locationId', action.payload);
    }
    return state;
};