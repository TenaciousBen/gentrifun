import Axios from "axios";
import { ICrime, ILocation, IHousingPrice } from "../shared/models";
import config from "../config";
import * as Actions from "../shared/redux/actions";
import store from "../shared/redux/store";
import CachedService from "./cachedService";

export class LocationService extends CachedService {
    getLocations(): Promise<ILocation[]> {
        const key = "LocationService:getLocations";
        var locations = this.get(key);
        if (locations) return new Promise(() => locations);
        return Axios.get(`http://${config.apiBase}/api/location`)
            .then(response => {
                this.set(key, response.data);
                return response.data;
            });
    }
}