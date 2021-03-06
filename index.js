const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const User = require('./models/user');
dotenv.config();

const app = express();

const productRoutes = require('./routes/product');
const categorytRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');
const userRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const addressRoutes = require('./routes/address');
const paymentRoutes = require('./routes/payment');


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
app.use(cors());
app.use(morgan('dev')); //log requests made to the api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', productRoutes);
app.use('/api', categorytRoutes);
app.use('/api', ownerRoutes);
app.use('/api', userRoutes);
app.use('/api', reviewRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);



app.listen(3000, error => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("Listening on port 3000")
    }
});
