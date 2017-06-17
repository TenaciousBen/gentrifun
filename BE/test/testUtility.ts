import { ICrime } from "../src/repositories/crime";
import { IHousingPrice } from "../src/repositories/housing-prices";
import { ILocation } from "../src/repositories/locations";
import * as database from '../src/repositories/database';
import * as config from '../src/config';

export async function seedDatabase(): Promise<TestDataDto> {
    const databaseConfig = config.getDatabaseConfig("test");
    const db = database.init(databaseConfig);

    var location: ILocation = {
        name: "Limehouse",
        latitude: 51.512700,
        longitude: -0.038948,
        boundary: []
    } as ILocation;

    var crime: ICrime = {
        category: "anti-social-behaviour",
        locationType: "Force",
        latitude: 51.512700,
        longitude: -0.038948,
        context: "",
        outcomeStatus: null,
        policeId: 20600026,
        locationSubtype: "",
        month: 1,
        year: 2013
    } as ICrime;

    var housingPrice: IHousingPrice = {
        bedrooms: 2,
        type: "flat",
        price: 312500,
        month: 1,
        year: 2013,
        latitude: 51.512700,
        longitude: -0.038948,
    } as IHousingPrice;

    var savedLocation = await db.locations.create(location);
    location._id = savedLocation._id;
    crime.locationId = location._id;
    housingPrice.locationId = location._id;
    var savedCrime = await db.crimes.create(crime);
    crime._id = savedCrime._id;
    var savedHousingPrice = await db.housingPrices.create(housingPrice);
    housingPrice._id = savedHousingPrice._id;

    return new TestDataDto(location, crime, housingPrice, db, databaseConfig);
}

export async function removeSeededData(dto: TestDataDto) {
    await dto.db.crimes.remove(dto.crime);
    await dto.db.housingPrices.remove(dto.housingPrice)
}

export class TestDataDto {
    location: ILocation;
    crime: ICrime;
    housingPrice: IHousingPrice;
    db: database.IDatabase;
    dataConfig: config.IDataConfiguration;

    constructor(location: ILocation, crime: ICrime, housingPrice: IHousingPrice,
        db: database.IDatabase, dataConfig: config.IDataConfiguration) {
            this.location = location;
            this.crime = crime;
            this.housingPrice = housingPrice;
            this.db = db;
            this.dataConfig = dataConfig;
    }
}