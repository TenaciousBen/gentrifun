import Axios from "axios";
import { ICrime, ILocation, IHousingPrice } from "../shared/models";
import config from "../config";
import * as Actions from "../shared/redux/actions";
import store from "../shared/redux/store";

export class LocationService {
    getLocations(): Promise<ILocation[]> {
        store.dispatch(Actions.apiCallStarted());
        return Axios.get(`http://${config.apiBase}/api/location`)
            .then(response => {
                store.dispatch(Actions.apiCallEnded());
                return response.data as ILocation[];
            });
    }
}