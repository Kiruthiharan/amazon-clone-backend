const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/user');

const productRoutes = require('./routes/product');


dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Connected to the database")
    }
})

//middlewares
app.use(morgan('dev')); //log requests made to the api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', productRoutes);

app.listen(3000, error => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("Listening on port 3000")
    }
});
