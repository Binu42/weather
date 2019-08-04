const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/99169618d3ded5d1ffb4bad7472c5864/'+ latitude + ',' + longitude + '?units=si&exclude=[hourly%20minutely]';
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to weather Services', undefined);
        }else if(body.error){
            callback('unable to find the place', undefined);
        }else{
            callback(undefined, {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                summary: body.daily.summary
            })
        }
    })
}

module.exports = forecast;