const fs = require("fs");

module.exports = {
    readFile: function(){
        let rawData = fs.readFileSync(`${__dirname}/AT.json`);

        let data = JSON.parse(rawData)
        // all jolly servers
        const filtered = data.devices.filter(site => site.siteUid === process.env.AT_JOLLY_SERVERS)

        const jollyServers = []
        filtered.forEach(server => {
            jollyServers.push((({hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus}) => ({hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus}))(server))
        });

        const rebootNeeded = jollyServers.filter(server => server.rebootRequired === true) // returns array of servers which need reboots

        const offlineServers = jollyServers.filter(server => server.online === false) // returns array of offline servers

        const antiVirusServers = jollyServers.filter(server => server.antivirus.antivirusStatus !== 'RunningAndUpToDate' || server.antivirus.antivirusStatus !== 'NotDetected')

        return [antiVirusServers, rebootNeeded, offlineServers]
    }
}