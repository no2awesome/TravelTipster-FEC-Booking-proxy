const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios')

const app = express();
const PORT = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));
app.get('/:hotel_id/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

app.get('/:hotel_id/vacancy', (req, res) => {
    //TODO - your code here!
    axios.get(`http://traveltipster-fec-booking-service-dev.us-west-2.elasticbeanstalk.com${req.originalUrl}`)
        .then(function (response) {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});