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

    request(process.env.RMMEndpoint, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        console.log(body);
    });


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