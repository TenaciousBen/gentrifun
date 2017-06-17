export interface IConfig {
    apiBase: string;
    contentBase: string;
    enviroment: Enviroment;
}

//matches a given frontend host to the config for that host, so that the api base will
//automatically change depending on the FE host
function getConfig(): IConfig {
    var currentHost = window.location.hostname;
    switch (currentHost) {
        case "localhost": return { apiBase: "localhost:9000", contentBase: currentHost, enviroment: Enviroment.Dev };
        //add additional hosts here e.g. prod, test etc
        default: throw new Error(`Unrecognized content host '${currentHost}'`)
    }
};

export enum Enviroment {
    Dev,
    Test,
    Prod
}

export const config = getConfig();

export default config;