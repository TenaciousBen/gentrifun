import Immutable from 'immutable';
import {API_CALL_STARTED, API_CALL_ENDED, Action} from "../actions";
import store from "../store";

const initialState = Immutable.fromJS({
    activeApiCalls: 0
});

export default (state = initialState, action: Action) => {
    console.log("api reducer before", state.get("activeApiCalls"));
    if (action.type === API_CALL_STARTED) {
    console.log("api reducer called started", state.get("activeApiCalls") + 1);
        return state.set('activeApiCalls', state.get("activeApiCalls") + 1);
    }
    if (action.type === API_CALL_ENDED) {
    console.log("api reducer called ended", state.get("activeApiCalls") - 1);
        return state.set('activeApiCalls', state.get("activeApiCalls") - 1);
    }
    return state;
};