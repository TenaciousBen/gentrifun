export const LOCATION_SELECTED = "LOCATION_SELECTED";
export const API_CALL_STARTED = "API_CALL_STARTED";
export const API_CALL_ENDED= "API_CALL_ENDED";
export const ROUTE_CHANGED ="ROUTE_CHANGED";

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

export function routeChanged(routeName: string) {
    return { type: ROUTE_CHANGED, payload: routeName };
}