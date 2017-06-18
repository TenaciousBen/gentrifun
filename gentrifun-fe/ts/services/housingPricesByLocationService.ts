import Axios from "axios";
import { IHousingPrice } from "../shared/models";
import config from "../config";
import * as Actions from "../shared/redux/actions";
import store from "../shared/redux/store";
import CachedService from "./cachedService";

export class HousingPricesByLocationService extends CachedService {
    getHousingPricesByLocation(locationId: string): Promise<IHousingPrice[]> {
        var key = `HousingPricesByLocationService:getHousingPricesByLocation?location=${locationId}`;
        var locations = this.get(key);
        if (locations) return new Promise(() => locations);
        //store.dispatch(Actions.apiCallStarted());
        return Axios.get(`http://${config.apiBase}/api/housing-prices-by-location/${locationId}`)
            .then(response => {
                //store.dispatch(Actions.apiCallEnded());
                this.set(key, response.data);
                return response.data;
            });
    }
}