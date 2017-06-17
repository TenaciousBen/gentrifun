import * as mocha from 'mocha';
import * as chai from 'chai';
import { ICrime } from "../src/repositories/crime";
import { IHousingPrice } from "../src/repositories/housingPrices";
import { ILocation } from "../src/repositories/locations";
import * as database from '../src/repositories/database';
import * as config from '../src/config';
import {TestDataDto, removeSeededData, seedDatabase, assertEqualByMatchingKeys} from "./testUtility";

const expect = chai.expect;

describe("database", () => {
  
  var data: TestDataDto;

  before(async () => {
    data = await seedDatabase();
  });

  after(async () => {
    await removeSeededData(data);
  });

  it("can get created location", async () => {
    var fetched = await data.db.locations.findById(data.location._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(data.location._id);
    assertEqualByMatchingKeys(data.location, fetched);
  });

  it("can get created crime", async () => {
    var fetched = await data.db.crimes.findById(data.crime._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(data.crime._id);
    assertEqualByMatchingKeys(data.crime, fetched);
  });

  it("can get created housing price", async () => {
    var fetched = await data.db.housingPrices.findById(data.housingPrice._id);
    expect(!!fetched._id).to.be.eql(true);
    expect(fetched._id).to.be.eql(data.housingPrice._id);
    assertEqualByMatchingKeys(data.housingPrice, fetched);
  });
});