const fs = require("fs");

module.exports = {
    readFile: function(){
        let rawData = fs.readFileSync(`${__dirname}/AT.json`);

        let data = JSON.parse(rawData)
        // all jolly servers
        const filtered = data.devices.filter(site => site.siteUid === process.env.AT_JOLLY_SERVERS)

        const rebootNeeded = filtered.filter(server => server.rebootRequired === true) // returns array of servers which need reboots

        const offlineServers = filtered.filter(server => server.online === false) // returns array of offline servers

        const antiVirusServers = filtered.filter(server => server.antivirus.antivirusStatus !== 'RunningAndUpToDate' || server.antivirus.antivirusStatus !== 'NotDetected')

        console.log(filtered)
    }
}