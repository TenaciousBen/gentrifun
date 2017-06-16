import * as mocha from 'mocha';
import * as chai from 'chai';
import * as config from '../src/config';

const expect = chai.expect;

describe('config', () => {

  it('should have correct connection for dev', () => {
      var databaseConfig = config.getDatabaseConfig("dev");
      expect(databaseConfig.connectionString).to.eql("mongodb://localhost/housing-dev");
  });

  it('should have correct connection for test', () => {
      var databaseConfig = config.getDatabaseConfig("test");
      expect(databaseConfig.connectionString).to.eql("mongodb://localhost/housing-test");
  });

  it('should have correct connection for prod', () => {
      var databaseConfig = config.getDatabaseConfig("production");
      expect(databaseConfig.connectionString).to.eql("mongodb://localhost/housing-production");
  });

  it('should have correct environment for dev', () => {
      var serverConfig = config.getServerConfigs("dev");
      expect(serverConfig.environment).to.eql("dev");
  });

  it('should have correct environment for test', () => {
      var serverConfig = config.getServerConfigs("test");
      expect(serverConfig.environment).to.eql("test");
  });

  it('should have correct environment for prod', () => {
      var serverConfig = config.getServerConfigs("production");
      expect(serverConfig.environment).to.eql("production");
  });

});