import * as mocha from 'mocha';
import * as chai from 'chai';
import { ICrime } from "../src/repositories/crime";
import { IHousingPrice } from "../src/repositories/housing-prices";
import { ILocation } from "../src/repositories/locations";
import * as database from '../src/repositories/database';
import * as config from '../src/config';

const expect = chai.expect;
const databaseConfig = config.getDatabaseConfig("test");
const db = database.init(databaseConfig);

describe("database", () => {

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

  before(async () => {
    var savedLocation = await db.locations.create(location);
    location._id = savedLocation._id;
    console.log("location._id", location._id, typeof location._id)
    crime.locationId = location._id;
    housingPrice.locationId = location._id;
    var savedCrime = await db.crimes.create(crime);
    crime._id = savedCrime._id;
    var savedHousingPrice = await db.housingPrices.create(housingPrice);
    housingPrice._id = savedHousingPrice._id;
  });

  after(async () => {
    await db.crimes.remove(crime);
    await db.housingPrices.remove(housingPrice)
  });

  it("can get created location", async () => {
    var fetched = await db.locations.findById(location._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(location._id);
    assertEqualByMatchingKeys(location, fetched);
  });

  it("can get created crime", async () => {
    var fetched = await db.crimes.findById(crime._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(crime._id);
    assertEqualByMatchingKeys(crime, fetched);
  });

  it("can get created housing price", async () => {
    var fetched = await db.housingPrices.findById(housingPrice._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(housingPrice._id);
    assertEqualByMatchingKeys(housingPrice, fetched);
  });

  function assertEqualByMatchingKeys(expected:any, actual:any):void {
    var aKeys = Object.keys(expected);
    for (var i = 0; i < aKeys.length; i++) {
      var key = aKeys[i];
      var expectedValue = expected[key];
      var actualValue = actual[key];
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
  }
});