export const LOCATION_SELECTED = "LOCATION_SELECTED";
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

export function routeChanged(routeName: string) {
    return { type: ROUTE_CHANGED, payload: routeName };
}