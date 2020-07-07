var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()

//use body-parser as middle-ware 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))
const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function() {
    console.log('Example app listening on port 8081!')
})
console.log(__dirname)

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
})

// get information
app.get('/getRealData', getRealData);

function getRealData(req, res) {
    res.send(projectData);
    console.log('data recieved from server is  ' + projectData);
}

// post information
app.post('/addinfo', function addinfo(req, res) {
    projectData = {
        dayAway: req.body.dayAway,
        city: req.body.city,
        ctr: req.body.ctr, //0
        lon: req.body.lon, //1
        lat: req.body.lat, //2
        wth: req.body.wth, //3
        img: req.body.img, //4

    }
    res.send(projectData)
    console.log('the info data final result is :' + projectData)
});

// get all data
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}
module.exports = app;
