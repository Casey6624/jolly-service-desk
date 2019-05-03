const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const graphqlHttp = require("express-graphql");

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    console.log(req.url)
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@jollytasks-buxaz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
.then(() => {
    console.log("Successfully connected to MongoDB")
    app.listen(4001)
})
.catch(err => {
    console.log(`Ooops! Error: ${err}`)
})

app.listen(3000)