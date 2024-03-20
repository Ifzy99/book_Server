const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
const uri = 'mongodb+srv://Ifzy:tcNK3dXefuLrTI9N@cluster0.hkognsl.mongodb.net/bookStore'

app.use(cors());

mongoose.connect(uri)
.then(()=> console.log('Connected to database'))
.catch(err=>console.log(err))


app.use('/graphql', graphqlHTTP ({
    schema,
    graphiql: true,
}))




app.listen(4500, ()=>{
    console.log("Connected on port 4500");
})