import Immutable from 'immutable';
import { ROUTE_CHANGED, Action } from "../actions";
import store from "../store";

const initialState = Immutable.fromJS({
    routeName: "areaSelector"
});

export default (state = initialState, action: Action) => {
    console.log("route reducer before", state.get("routeName"));
    if (action.type === ROUTE_CHANGED) {
        console.log("route reducer changed started", action.payload);
        return state.set('routeName', action.payload);
    }
    return state;
};