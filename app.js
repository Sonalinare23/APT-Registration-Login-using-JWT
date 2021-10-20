const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoute = require('./api/routes/user')

mongoose.connect('mongodb://localhost:27017/database', {useNewUrlParser: true}, (err) => {
if (!err) {console.log('MongoDB Connection Succeeded.') }
else {console.log('Error in DB connection:' + err) }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user',userRoute);


module.exports = app;