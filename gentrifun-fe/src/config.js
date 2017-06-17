//matches a given frontend host to the config for that host, so that the api base will
//automatically change depending on the FE host
function getConfig() {
    var currentHost = window.location.hostname;
    switch (currentHost) {
        case "localhost": return { apiBase: "localhost:9000", contentBase: currentHost, enviroment: Enviroment.Dev };
        //add additional hosts here e.g. prod, test etc
        default: throw new Error(`Unrecognized content host '${currentHost}'`);
    }
}
;
export var Enviroment;
(function (Enviroment) {
    Enviroment[Enviroment["Dev"] = 0] = "Dev";
    Enviroment[Enviroment["Test"] = 1] = "Test";
    Enviroment[Enviroment["Prod"] = 2] = "Prod";
})(Enviroment || (Enviroment = {}));
export const config = getConfig();
export default config;
