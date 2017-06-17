//matches a given frontend host to the config for that host, so that the api base will
//automatically change depending on the FE host
function getConfig() {
    var currentHost = window.location.hostname;
    switch (currentHost) {
        case "localhost": return { apiBase: "localhost:9000", contentBase: currentHost };
        //add additional hosts here e.g. prod, test etc
        default: throw new Error(`Unrecognized content host '${currentHost}'`);
    }
}
;
const config = getConfig();
export default config;
