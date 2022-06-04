const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./Schema/schema');
require('dotenv').config();

const app = express();

//  allowing cross sharing of resources
app.use(cors())

// connecting database
mongoose.connect(process.env.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
//  checking connection
mongoose.connection.once('open', () => console.log('Database connected! :)'));

//  using graphql as middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

//  initiating server
const port = process.env.PORT || 1912;
app.listen(port, () => console.log(`Server is up at port ${port}`));