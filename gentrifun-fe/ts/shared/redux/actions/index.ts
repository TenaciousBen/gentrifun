export const LOCATION_SELECTED: string = "LOCATION_SELECTED";
export const API_CALL_STARTED: string = "API_CALL_STARTED";
export const API_CALL_ENDED: string = "API_CALL_ENDED";

export interface Action {
    payload: any;
    type: string;
}

export interface AsyncAction extends Action {
    promise?: () => Promise <any>;
}

export function locationChanged(locationId: string): Action {
    return { type: LOCATION_SELECTED, payload: locationId };
}

export function apiCallStarted(): Action {
    return { type: API_CALL_STARTED, payload: null };
}

export function apiCallEnded(): Action {
    return { type: API_CALL_ENDED, payload: null };
}