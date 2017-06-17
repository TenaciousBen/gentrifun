import * as Mongoose from "mongoose";
import { IDataConfiguration } from "../config";
import { ICrime, CrimeModel } from "./crime";
import { IHousingPrice, HousingPriceModel } from "./housingPrices";
import { ILocation, LocationModel } from "./locations";
export interface IDatabase  {
    crimes: Mongoose.Model<ICrime>;
    housingPrices: Mongoose.Model<IHousingPrice>;
    locations: Mongoose.Model<ILocation>;
    readyState?: number;
}

export function init(config: IDataConfiguration): IDatabase {

    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        crimes: CrimeModel,
        housingPrices: HousingPriceModel,
        locations: LocationModel
    };
}