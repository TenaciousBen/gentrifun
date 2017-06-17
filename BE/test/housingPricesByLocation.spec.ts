import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as express from 'express';
import { TestDataDto, removeSeededData, seedDatabase, assertEqualByMatchingKeys } from "./testUtility";
import ServerDefinition from '../src/Server';
import { IHousingPrice } from "../src/repositories/housingPrices";

chai.use(chaiHttp);
const expect = chai.expect;

describe("housing prices by location route", () => {

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
    return `/api/housing-prices-by-location/${data.location._id}`;
  };

  it("should be json", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    expect(response.type).to.eql('application/json');
  });

  it("should have expected lat, long and price", async () => {
    var requestUrl = getRequestUrl();
    var response = await chai.request(server).get(requestUrl);
    var prices = response.body as IHousingPrice[];
    expect(prices.length).to.be.eql(1);
    var price = prices[0];
    expect(price.latitude).to.be.eql(data.housingPrice.latitude);
    expect(price.longitude).to.be.eql(data.housingPrice.longitude);
    expect(price.price).to.be.eql(data.housingPrice.price);
  });
});