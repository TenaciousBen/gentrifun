import * as nconf from "nconf";
import * as path from "path";

//Read Configurations
const configs = new nconf.Provider({}).argv().env({ separator: '__' }).file({
    file: path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`)
});

export interface IServerConfigurations {
    environment: string;
    port: number;
}

export interface IDataConfiguration {
    connectionString: string;
}

function getConfig(environment?: string): nconf.Provider {
    if (!environment || !environment.trim()) return configs;
    return new nconf.Provider({}).file({
        file: path.join(__dirname, `./config.${environment}.json`)
    });
}

export function getDatabaseConfig(environment?:string): IDataConfiguration {
    return getConfig(environment).get("database");
}

export function getServerConfigs(environment?:string): IServerConfigurations {
    return getConfig(environment).get("server");
}