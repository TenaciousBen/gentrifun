import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as express from 'express';
import { TestDataDto, removeSeededData, seedDatabase, assertEqualByMatchingKeys } from "./testUtility";
import ServerDefinition from '../src/Server';
import { ILocation } from "../src/repositories/locations";

chai.use(chaiHttp);
const expect = chai.expect;

describe("locations route", () => {

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
    return `/api/location/${data.location._id}`;
  };

  it("should be json", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    expect(response.type).to.eql('application/json');
  });

  it("should have expected lat, long and name", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    var location = response.body as ILocation;
    expect(location.latitude).to.be.eql(data.location.latitude);
    expect(location.longitude).to.be.eql(data.location.longitude);
    expect(location.name).to.be.eql(data.location.name);
  });

  it("should return all locations", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get("/api/location");
    var locations = response.body as ILocation[];
    expect(locations.length).to.be.eql(1);
  });
});