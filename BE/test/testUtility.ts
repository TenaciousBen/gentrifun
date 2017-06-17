import { ICrime } from "../src/repositories/crime";
import { IHousingPrice } from "../src/repositories/housingPrices";
import { ILocation } from "../src/repositories/locations";
import * as database from '../src/repositories/database';
import * as config from '../src/config';
import * as chai from 'chai';

const expect = chai.expect;

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
    await dto.db.locations.remove(dto.location);
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

export function assertEqualByMatchingKeys(expected: any, actual: any, except?: string[]): void {
    var aKeys = Object.keys(expected);
    for (var i = 0; i < aKeys.length; i++) {
        var key = aKeys[i];
        if (except && except.find(s => s === key)) continue;
        var expectedValue = expected[key];
        var actualValue = actual[key];
        try {
            //null or undefined values can't be passed to typeof, so compare them early
            if (!expectedValue) {
                expect(!actualValue).to.be.eql(true);
                continue;
            }
            //if the expected value is an object then recurse the comparison
            if (typeof expectedValue === "object") {
                assertEqualByMatchingKeys(expectedValue, actualValue);
                continue;
            }
            //ignore functions -- this assertion tests data is stored correctly, not that the mongoose
            //framework correctly maps behaviours to models
            if (typeof expectedValue === "function") continue;
            expect(expectedValue).to.be.eql(actualValue);
        }
        catch (error) {
            console.log("exception at key", key, "expected value", expectedValue, "actual value", actualValue);
            throw error;
        }
    }
};