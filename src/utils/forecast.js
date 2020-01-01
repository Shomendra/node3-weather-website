

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/080f5f37311499739669a6c08d268b70/' + latitude + ',' + longitude

     request({url, json: true},(error,{body} ) => {
       if (error){
        callback('unable to connect to Weather service!', undefined)
       }else if (body.error) {
        callback('unable to connect to location !', undefined)
       }else{
        callback(undefined, body.daily.data[0].summary + 'it is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
       }

     })
}

module.exports = forecast
