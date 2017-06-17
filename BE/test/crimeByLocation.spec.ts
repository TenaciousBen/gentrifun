import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as express from 'express';
import { TestDataDto, removeSeededData, seedDatabase, assertEqualByMatchingKeys } from "./testUtility";
import ServerDefinition from '../src/Server';
import { ICrime } from "../src/repositories/crime";

chai.use(chaiHttp);
const expect = chai.expect;

describe("crime by location route", () => {

  var data: TestDataDto;
  var server: express.Application;

  before(async () => {
    data = await seedDatabase();
    var serverDefinition = new ServerDefinition(data.db);
    server = serverDefinition.express;
  });

  after(async () => {
    await removeSeededData(data);
  });

  var getRequestUrl = () => {
    return `/api/crime-by-location/${data.location._id}`;
  };

  it("should be json", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    expect(response.type).to.eql("application/json");
  });

  it("should have expected lat and long", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    var crimes = response.body as ICrime[];
    expect(crimes.length).to.be.eql(1);
    var crime = crimes[0];
    expect(crime.latitude).to.be.eql(data.crime.latitude);
    expect(crime.longitude).to.be.eql(data.crime.longitude);
  });
});