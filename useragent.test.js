// Setup to make webapp_server to work:
global.Npm = {
    require: () => ({version: 0})
};
global.Meteor = {
    startup: () => {},
    _SynchronousQueue: class {
        runTask() {}
    },
    absoluteUrl: () => {},
};
global._ = {
    extend: Object.assign
};


const modern = require("./meteor/packages/modern-browsers/modern");
const server = require("./meteor/packages/webapp/webapp_server");

describe('User agent expectancies', () => {
    const userAgents = [
        {
            agent: "IServ/2.1.0-26-ga122ce8f/26686-always-show-trigger-again (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
            modern: true,
        }, {
            agent: "IServ/2.1.0-26-ga122ce8f/26686-always-show-trigger-again (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 11; sdk_gphone_x86 Build/RSR1.201013.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36",
            modern: false,
        }, {
            agent: "IServ/2.1.0-26-ga122ce8f/26686-always-show-trigger-again (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36",
            modern: false,
        }, {
            agent: "IServ/2.1.0-26-ga122ce8f/26686-always-show-trigger-again (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2526.83 Mobile Safari/537.36",
            modern: true,
        }, {
            agent: "IServ/2.1.0-23-g88963bfd/develop (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 5.0.2; Android SDK built for x86_64 Build/LSY66K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile Safari/537.36",
            modern: false,
        }, {
            agent: "IServ/2.1.0-23-g88963bfd/develop (eu.iserv.WebApp; Build 1) Mozilla/5.0 (Linux; Android 9; AOSP on IA Emulator Build/PSR1.180720.117; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36",
            // Should be supported, but it isn't: https://redmine.iserv.eu/issues/36309#note-25
            modern: false,
        }
    ];
    userAgents.forEach(agent => {
        test('Testing agent: ' + agent.agent, () => {
            let browser = server.WebAppInternals.identifyBrowser(agent.agent);
            console.log(browser);
            expect(modern.isModern(browser)).toBe(agent.modern);
        });
    });
});
