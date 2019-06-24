const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose")
// graphql --- Schema and Resolvers
const graphqlSchema = require("./graphql/schema/index")
const graphqlResolvers = require("./graphql/resolvers/index")
const ClientOAuth2 = require('client-oauth2')
const request = require("request")
const utf8 = require("utf8")
const axios = require("axios")
const https = require("https")

const RMM = require("./RMM/index")

const app = express();

const PORT = 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use("/rmm", (req, res, next) => {
    /*     request(process.env.RMMEndpoint, { json: true }, (err, resp, token) => {
            if (err) { return console.log(err); }
    
            var options = {
                method: 'GET',
                url: 'https://pinotage-api.centrastage.net/api/v2/account/devices',
                headers:
                {
                    'cache-control': 'no-cache',
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(token)
    
            axios.get(process.env.RMMEndpoint)
            .then(res => {
                console.log(res)
            })
    /*         request(options, function (error, response, body) {
                if (error) throw new Error(error);
    
                const data = JSON.parse(body)
                // all jolly servers
                const filtered = data.devices.filter(site => site.siteUid === process.env.AT_JOLLY_SERVERS)
    
                const jollyServers = []
                filtered.forEach(server => {
                    jollyServers.push((({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }) => ({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }))(server))
                });
    
                const rebootNeeded = jollyServers.filter(server => server.rebootRequired === true) // returns array of servers which need reboots
    
                const offlineServers = jollyServers.filter(server => server.online === false) // returns array of offline servers
    
                const antiVirusServers = jollyServers.filter(server => server.antivirus.antivirusStatus !== 'RunningAndUpToDate' || server.antivirus.antivirusStatus !== 'NotDetected')
    
                //return [antiVirusServers, rebootNeeded, offlineServers]
                console.log(rebootNeeded)
                console.log(offlineServers)
                console.log(antiVirusServers)
            });
    
        }) */
    axios.get(process.env.RMMEndpoint)
        .then(res => {
            return res.data
        })
        .then(data => {
            axios.get("https://pinotage-api.centrastage.net/api/v2/account/devices", {
                headers:
                {
                    'cache-control': 'no-cache',
                    Authorization: `Bearer ${data}`
                }
            })
                .then(RMMData => {
                    //console.log(RMMData.data.devices)

                    // all jolly servers
                    const filtered = RMMData.data.devices.filter(site => site.siteUid === process.env.AT_JOLLY_SERVERS)

                    const jollyServers = []
                    filtered.forEach(server => {
                        jollyServers.push((({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }) => ({ hostname, intIpAddress, operatingSystem, domain, rebootRequired, online, antivirus }))(server))
                    });

                    const rebootNeeded = jollyServers.filter(server => server.rebootRequired === true) // returns array of servers which need reboots

                    const offlineServers = jollyServers.filter(server => server.online === false) // returns array of offline servers

                    const antiVirusServers = jollyServers.filter(server => server.antivirus.antivirusStatus !== 'RunningAndUpToDate' || server.antivirus.antivirusStatus !== 'NotDetected')

                    return [antiVirusServers, rebootNeeded, offlineServers]
                })
                .catch(err => console.log(err))
        })
})

app.use("/graphql", graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
}))



app.use("/", (req, res, next) => {
    //res.redirect("https://jollyit.co.uk")

    RMM.readFile()
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@jollytasks-buxaz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to MongoDB")
        app.listen(4001)
    })
    .catch(err => {
        console.log(`Ooops! Error: ${err}`)
    })

app.listen(PORT)