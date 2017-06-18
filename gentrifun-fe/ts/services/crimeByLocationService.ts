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
        //store.dispatch(Actions.apiCallStarted());
        return Axios.get(`http://${config.apiBase}/api/crime-by-location/${locationId}`)
            .then(response => {
                //store.dispatch(Actions.apiCallEnded());
                this.set(key, response.data);
                return response.data;
            });
    }
}