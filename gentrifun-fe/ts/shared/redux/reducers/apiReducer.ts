import Immutable from 'immutable';
import {API_CALL_STARTED, API_CALL_ENDED, Action} from "../actions";
import store from "../store";

const initialState = Immutable.fromJS({
    activeApiCalls: 0
});

export default (state = initialState, action: Action) => {
    if (action.type === API_CALL_STARTED) {
        return state.set('activeApiCalls', state.get("activeApiCalls") + 1);
    }
    if (action.type === API_CALL_ENDED) {
        return state.set('activeApiCalls', state.get("activeApiCalls") - 1);
    }
    return state;
};