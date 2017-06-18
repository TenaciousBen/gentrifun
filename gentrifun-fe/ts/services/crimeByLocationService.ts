import Axios from "axios";
import { ICrime } from "../shared/models";
import config from "../config";
import * as Actions from "../shared/redux/actions";
import store from "../shared/redux/store";
import CachedService from "./cachedService";

export class CrimeByLocationService extends CachedService {
    getCrimeByArea(locationId: string): Promise<ICrime[]> {
        var key = `CrimeByLocationService:getCrimeByArea?locationId=${locationId}`;
        var locations = this.get(key);
        if (locations) return new Promise(() => locations);
        return Axios.get(`http://${config.apiBase}/api/crime-by-location/${locationId}`)
            .then(response => {
                this.set(key, response.data);
                return response.data;
            });
    }
}