import { ICrime } from "../src/repositories/crime";
import { ILocation } from "../src/repositories/locations";
import { IHousingPrice } from "../src/repositories/housingPrices";
import * as Database from "../src/repositories/database";
import * as Config from "../src/config";
import {ObjectID} from "mongodb";

class LocationSeeder {
    private db: Database.IDatabase;
    private name: string;
    private latitude: number;
    private longitude: number;
    constructor(db: Database.IDatabase, name: string, latitude: number, longitude: number) {
        this.db = db;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static async createAndSeed(db: Database.IDatabase, name: string, latitude: number, longitude: number, worth: Worth): Promise<SeededLocation> {
        var seeder = new LocationSeeder(db, name, latitude, longitude);
        var seeded = await seeder.seed(worth);
        return seeded;
    }

    async getExisting(): Promise<ILocation> {
        return await this.db.locations.findOne({ name: this.name });
    }

    async seed(worth: Worth): Promise<SeededLocation> {
        var existing = await this.getExisting();
        if (existing) {
            var existingCrimes = await this.db.crimes.find({locationId: existing._id});
            var existingPrices = await this.db.housingPrices.find({locationId: existing._id});
            return new SeededLocation(existing, existingCrimes, existingPrices);
        }
        var location: ILocation = {
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude,
            boundary: []
        } as ILocation;
        location = await this.db.locations.create(location);
        var numberOfCrimes = 0, averagePrice = 0, finalGrowthPercent = 0;
        switch (worth) {
            case Worth.High:
                numberOfCrimes = 10;
                averagePrice = 500000;
                finalGrowthPercent = 15;
                break;
            case Worth.Medium:
                numberOfCrimes = 20;
                averagePrice = 400000;
                //safe, suburbanized areas won't grow as quickly as high value or regenerated areas
                finalGrowthPercent = 10;
                break;
            case Worth.Low:
                numberOfCrimes = 30;
                averagePrice = 300000;
                //assume low worth areas will climb more rapidly than high worth due to regeneration
                finalGrowthPercent = 20;
                break;
        }
        var crimes: ICrime[] = [], housingPrices: IHousingPrice[] = [];
        var year = 2016, month = 1;
        for (var i = 0; i < 12; i++) {
            month = month + 1;
            if (month > 12) {
                month = 1;
                year = year + 1;
            }
            var growthPercentage = (finalGrowthPercent / 12) * i;
            var createdCrimes = await this.createCrimes(location._id, numberOfCrimes, year, month, location.latitude, location.longitude);
            var createdHousingPrices = await this.createHousingPrices(location._id, averagePrice, year, month, growthPercentage, location.latitude, location.longitude);
            crimes = crimes.concat(createdCrimes);
            housingPrices = housingPrices.concat(createdHousingPrices);
        }
        return new SeededLocation(location, crimes, housingPrices);
    }

    async createHousingPrices(locationId: ObjectID, averagePrice: number, year: number, month: number, growthPercentage: number, latitude: number, longitude: number): Promise<IHousingPrice[]> {
        var prices: IHousingPrice[] = [];
        for (var j = 0; j < 10; j++) {
            var houseLatitude = latitude + Math.random();
            var houseLongitude = longitude + Math.random();
            var random = this.getRandomInt(1, 100);
            var type = random > 33 && random < 66 ? "flat" : random <= 33 ? "terraced" : "detached";
            var upliftedPrice = averagePrice * (1 + growthPercentage);
            //add a random increase or decrease of up to 5%
            var randomizedPrice = this.getRandomInt(0, 1) === 0 ? (1 + (this.getRandomInt(0, 5) / 100)) : (1 - (this.getRandomInt(0, 5) / 100));
            upliftedPrice = upliftedPrice * randomizedPrice;
            //increase the worth of more expensive property types
            if (type === "terraced") upliftedPrice = upliftedPrice * 1.2;
            if (type === "detached") upliftedPrice = upliftedPrice * 1.5;
            var housingPrice: IHousingPrice = {
                bedrooms: 2,
                type: type,
                price: upliftedPrice,
                month: month,
                year: year,
                latitude: houseLatitude,
                longitude: houseLongitude,
                locationId: locationId
            } as IHousingPrice;
            var created = await this.db.housingPrices.create(housingPrice);
            prices.push(created);
        }
        return prices;
    }

    async createCrimes(locationId: ObjectID, n: number, year: number, month: number, latitude: number, longitude: number): Promise<ICrime[]> {
        var crimes: ICrime[] = [];
        for (var j = 0; j < n; j++) {
            var crimeLatitude = latitude + Math.random();
            var crimeLongitude = longitude + Math.random();
            var policeId = this.getRandomInt(10000000, 99999999);
            var random = this.getRandomInt(1, 100);
            var category = random > 33 && random < 66 ? "anti-social-behaviour" : random <= 33 ? "violent" : "burglary";
            var locationType = category === "burglary" ? "Force" : "Street";
            var crime: ICrime = {
                category: category,
                locationType: locationType,
                latitude: crimeLatitude,
                longitude: crimeLongitude,
                context: "",
                outcomeStatus: null,
                policeId: policeId,
                locationSubtype: "",
                month: month,
                year: year,
                locationId: locationId
            } as ICrime;
            var created = await this.db.crimes.create(crime);
            crimes.push(created);
        }
        return crimes;
    }

    /**
     * Shamlessly pilfered from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class SeededLocation {
    location: ILocation;
    crimes: ICrime[];
    housingPrices: IHousingPrice[];
    constructor(location: ILocation, crimes: ICrime[], housingPrices: IHousingPrice[]) {
        this.location = location;
        this.crimes = crimes;
        this.housingPrices = housingPrices;
    }
}

enum Worth {
    High,
    Medium,
    Low
}

async function seed(): Promise<void> {
    var dbConfig = Config.getDatabaseConfig();
    var db = Database.init(dbConfig);
    var notify = (location: SeededLocation) => console.log(`Created ${location.location.name} at ${location.location.latitude}, ${location.location.longitude} with ${location.crimes.length} crimes and ${location.housingPrices.length} houses`);
    var limehouse = await LocationSeeder.createAndSeed(db, "Limehouse", 51.516189, -0.040712, Worth.Medium);
    notify(limehouse);
    var canaryWharf = await LocationSeeder.createAndSeed(db, "Canary Wharf", 51.504763, -0.018736, Worth.High);
    notify(canaryWharf);
    var canningTown = await LocationSeeder.createAndSeed(db, "Canning Town", 51.515748, 0.019045, Worth.Low);
    notify(canningTown);
    process.exit();
}

seed();