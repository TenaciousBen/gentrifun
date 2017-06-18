import Immutable from 'immutable';
import { ROUTE_CHANGED, Action } from "../actions";
import store from "../store";

const initialState = Immutable.fromJS({
    routeName: "areaSelector"
});

export default (state = initialState, action: Action) => {
    if (action.type === ROUTE_CHANGED) {
        return state.set('routeName', action.payload);
    }
    return state;
};