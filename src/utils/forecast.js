



const request = require('request')


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/080f5f37311499739669a6c08d268b70/' + latitude + ',' + longitude

     request({url, json: true},(error,{body} ) => {
       if (error){
        callback('unable to connect to Weather service!', undefined)
       }else if (body.error) {
        callback('unable to connect to location !', undefined)
       }else{
         
        callback(undefined, body.daily.data[0].summary + 'it is currently ' + body.currently.temperature + ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + 'with a low of ' + body.daily.data[0].temperatureLow + '.  There is a ' + body.currently.precipProbability + '% chance of rain')
       }

     })
}

module.exports = forecast
