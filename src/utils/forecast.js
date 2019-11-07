const request = require('request');

const forecast = (latitude, longitude, unit, callback) => {
    const url = `https://api.darksky.net/forecast/001d07483858b2105c22e071a1520ce6/${latitude},${longitude}?units=${unit}`;
    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            console.log('No internet')
            callback('Unable to get weather information. Please connect to the internet', undefined);
        }
        else if(body.error) {
            callback(`Unable to find location`, undefined);
        } 
        else {
            let temperature = body.currently.temperature;
            let chanceOfRain = body.currently.precipProbability;
            let summary = body.daily.data[0].summary;

            let tempUnit;
            if(unit === 'us') {
                tempUnit = '*F';
            } else if (unit === 'si') {
                tempUnit = '*C';
            }

            callback(undefined, `${summary} It is currently ${temperature}${tempUnit} degrees out. There's a ${chanceOfRain} chance of rain.`);
        }
    })
}

module.exports = forecast;