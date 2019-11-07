const request = require('request')

const geocode = (address, callback) => {
    let geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZW1teXRvYnMiLCJhIjoiY2syM2MyZW8zMXJ3MDNobXZ5eml3amduMyJ9.FhE930AvluTSDh2NGBeCoQ&limit=1`;

    request({url: geocodeUrl, json: true}, (error, {body}={}) => {
       
        if (error) {
            callback('Cannot connect to location services. Please connect to the internet', undefined);
        } else if(body.features.length === 0) {
            callback('Cannot find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })

}

module.exports = geocode;