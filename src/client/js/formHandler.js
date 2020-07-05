/* Global Variables */
const DataProject = [];
// with Geonames.
// http://api.geonames.org/searchJSON?q=rabat&username=fadouaMadane
// to  get this info : latitude, longitude, country
const baseURLApi = 'http://api.geonames.org/searchJSON?q=';
//const name_city = document.getElementById('city').value;
const userName = '&maxRows=1&username=fadouaMadane';

//  pi 2 url = "https://api.weatherbit.io/v2.0/current?lon=-89.52229&lat=32.03349&key=b82ff403d0544ca69859dbaa6cb4e845";
const baseURLApiGeo = 'https://api.weatherbit.io/v2.0/current?';
const userkey = '&key=b82ff403d0544ca69859dbaa6cb4e845';

// api 3 url
//const full = "https://pixabay.com/api/?key=17195883-507940625a76494bd3acb02ed&q=rabat&image_type=photo";
const pixurl = "https://pixabay.com/api/?key=17195883-507940625a76494bd3acb02ed&q=";
const img = "&image_type=photo";
// fetch Url to get all information weather about city country
const getLnGnCou = async(baseURLApi, name_city, userName) => {

    const res = await fetch(baseURLApi + name_city + userName)
    try {

        const data = await res.json();
        console.log('data inside the function ' + data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

// fetch Url to get all information weather 
const getweather = async(baseURLApiGeo, lon, lat, userkey) => {


    const res = await fetch(baseURLApiGeo + lon + lat + userkey)
    try {

        const data = await res.json();
        console.log('data inside the function ' + data);
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}


// fetch Url to get all information about img  
const getpicture = async(pixurl, name_city, img) => {
    const res = await fetch(pixurl + name_city + img)
    try {
        const data = await res.json();
        console.log('data inside the function ' + data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}


// postData  to the server  
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

// Update UI interface with the new data 
const updateUI = async() => {
    const request = await fetch('http://localhost:8081/all');
    try {
        const allData = await request.json();
        document.getElementById('dayAway').innerText = allData.ctr + " ," + allData.city + " is " + allData.dayAway + " Days away ";
        document.getElementById('country').innerHTML = " the name of country is : " + allData.ctr;
        document.getElementById('lon').innerHTML = " the longitude is  : " + allData.lon;
        document.getElementById('lat').innerHTML = " the largitude is   : " + allData.lat;
        document.getElementById('wth').innerText = " Typical weather for then is   : " + allData.wth;
        document.getElementById('image1').setAttribute("src", allData.img);


    } catch (error) {
        console.log("error", error);
    }
}

function performAction(e) {
    event.preventDefault()

    // check url
    const name_city = document.getElementById('city').value;
    console.log(name_city);
    Client.validCITY(name_city)
    const today = new Date()
    const currentdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log("the current Date is : " + currentdate);
    const dateTrip = document.getElementById('date-trip').value;
    console.log("the date chosen by the user is : " + dateTrip);

    const date_diff_indays = function(dateTrip, currentdate) {
        const dt1 = new Date(dateTrip);
        const dt2 = new Date(currentdate);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }

    console.log(date_diff_indays(currentdate, dateTrip));
    DataProject.push(date_diff_indays(currentdate, dateTrip));

    getLnGnCou(baseURLApi, name_city, userName)
        .then(function(data) {
            console.log(data);
            //console.log(name_city);
            console.log("latitude, " + data['geonames'][0].lat);
            console.log(" longitude, " + data['geonames'][0].lng);
            console.log(data['geonames'][0].name);
            //console.log(" country, " + data['geonames'][0].countryName);
            //console.log(data['geonames'][0].population);
            //console.log(data['geonames'][0].adminName1);


            DataProject.push(data['geonames'][0].name);
            //0
            DataProject.push(data['geonames'][0].countryName);
            //1
            DataProject.push(data['geonames'][0].lng)
                //2
            DataProject.push(data['geonames'][0].lat);

            /*const lon = 'lon =' + -89.52229;
            const lat = '&lat= ' + 32.03349; */
            const lon = 'lon=' + data['geonames'][0].lng;
            const lat = '&lat= ' + data['geonames'][0].lat;
            // I can't get the weather descripton and the image  
            getweather(baseURLApiGeo, lon, lat, userkey)
                .then(function(data) {
                    // get the info about weather
                    // problem occur just when replace lon and lat by the coming lon and lat from api 1
                    console.log("coming data weather based on lat and lon ...")
                    console.log(data);
                    console.log("want to retrieve just the description of weather :p ...")
                    console.log(data.data[0].weather.description);
                    console.log(data.data[0].app_temp);
                    console.log(data.data[0].temp);
                    console.log(data.data[0].city_name);
                    //3
                    DataProject.push(data.data[0].weather.description);
                    // you can replace the city name given from user with the city coming from API result geo...
                    //name_city = data.data[0].city_name;
                    getpicture(pixurl, name_city, img)
                        .then(function(data) {
                            // load all information from api weather
                            //console.log(data);
                            // load just img 
                            console.log(data);
                            console.log("this is the pic of direction trip");
                            console.log(data.hits[0].largeImageURL)
                                //4
                            DataProject.push(data.hits[0].largeImageURL)
                        })
                })
                .then(
                    postData('http://localhost:8081/addinfo', {
                        dayAway: DataProject[0],
                        city: DataProject[1],
                        ctr: DataProject[2],
                        lon: DataProject[3],
                        lat: DataProject[4],
                        wth: DataProject[5],
                        img: DataProject[6],

                        // should add the date
                    })).then(
                    //update the UI interface
                    updateUI()
                )
        })

    console.log(DataProject);
}


function removeTrip() {
    document.getElementById('lat').innerText = "";
    document.getElementById('country').innerText = "";
    document.getElementById('lon').innerText = "";
    document.getElementById('city').value = "";
    document.getElementById('wth').innerText = "";
    document.getElementById('image1').setAttribute("src", "");
    document.getElementById('date-trip').value = "";
    location.reload();
}
export { performAction, removeTrip }