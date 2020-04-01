const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//middlewares
app.use(morgan('dev')); //log requests made to the api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/', (req, res) => {
    console.log(req.body);
})


app.get('/', (req, res) => {
    res.json("Hello Amazon Clone");
});

app.listen(3000, error => {
    if (error) {
        console.log(error)
    }
    else {
        console.log("Listening on port 3000")
    }
});
