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
    /*     const baseURL = "https://pinotage-api.centrastage.net"
    
        var rmmAuth = new ClientOAuth2({
            clientId: '52OES2NSQ3R56UK6FQ535VOP0BNBKH3N',
            clientSecret: 'DD688Q5I93VUMD3K68IP5LT5I2DSFDM',
            accessTokenUri: `${baseURL}/auth/oauth/token`,
            authorizationUri: `${baseURL}/auth/oauth/authorize`,
            redirectUri: '/',
            scopes: []
        })
    
        let token = rmmAuth.createToken("access token")
    
        token.expiresIn(350000)
    
        token.sign({
            method: "POST",
            url: "https://pinotage-api.centrastage.net/api/v2/account/devices"
        })
    
        console.log(token) */

    request({
        uri: `https://pinotage-api.centrastage.net/auth/oauth/Authorize`,
        headers: {
            "content-type": 'x-www-form-urlencoded',
            Authorization: "cHVibGljLWNsaWVudDpwdWJsaWM=",
            Method: 'POST',
            "grant-type": "authorization_code"
        },
        form: {
            username: "52OES2NSQ3R56UK6FQ535VOP0BNBKH3N",
            password: "DD688Q5I93VUMD3K68IP5LT5I2DSFDM"
        }
    }, function (err, res) {
        if (res) {
            console.log(res)
        }
        if (err) console.log(err)
    })

    /*     const credentials = {
            client: {
                id: '52OES2NSQ3R56UK6FQ535VOP0BNBKH3N',
                secret: 'DD688Q5I93VUMD3K68IP5LT5I2DSFDM'
            },
            auth: {
                tokenHost: 'https://pinotage-api.centrastage.net/auth/oauth',
                tokenPath: 'https://pinotage-api.centrastage.net/auth/oauth/token'
            }
        };
    
        // Initialize the OAuth2 Library
        const oauth2 = require('simple-oauth2').create(credentials);
    
        const authorizationUri = oauth2.authorizationCode.authorizeURL({
            client_id: "public-client"
        });
        const test = `${authorizationUri.split("/oauth")[0]}/auth${authorizationUri.split("/oauth")[1]}`
        console.log(test)
        res.redirect(test);
    
        const tokenConfig = {
            redirect_uri: '/'
        };
    
        async function getToken() {
            try {
                const result = await oauth2.authorizationCode.getToken(tokenConfig)
                const accessToken = oauth2.accessToken.create(result);
                console.log(accessToken)
            } catch (error) {
                console.log('Access Token Error', error.message);
            }
        }
        getToken() */

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