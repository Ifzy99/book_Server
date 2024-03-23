const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
require('dotenv').config()
const bookPort = process.env.PORT
const schema = require('./schema/schema');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
const bookUri = process.env.URI

app.use(cors());

mongoose.connect( bookUri)
.then(()=> console.log('Connected to database'))
.catch(err=>console.log(err))


app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true,
}))




app.listen(bookPort, ()=>{
    console.log(`Connected on port ${bookPort}`);
})