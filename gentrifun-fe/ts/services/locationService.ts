import Axios from "axios";
import { ICrime, ILocation, IHousingPrice } from "../shared/models";
import config from "../config";

export class LocationService {
    getLocations(): Promise<ILocation[]> {
        return Axios.get(`http://${config.apiBase}/api/location`)
            .then(response => {
                return response.data as ILocation[];
            });
    }
}