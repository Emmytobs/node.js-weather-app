const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');
const app = express();


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); //This will use the hbs templating engine as the view engine
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); //This will use all the static files in the publiDirectoryPath as if they were in the templates directory

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Emmanuel Otobo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Emmanuel Otobo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'What do you need help for?',
        title: 'Help page',
        name: 'Emmanuel Otobo'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'This help article does not exist',
        title: '404 Page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address || !req.query.units) {
        res.send({
            error: 'You must provide an address and a unit'
        });
        return;
    }

    const address = req.query.address;
    const unit = req.query.units;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        // ***** //
        // The main reason why a default parameter is given to the object above (which contains latitude, longitude, and location) is to prevent the program from crashing as it (without any default parameters) trys to read the latitude, longitude, and location from an object ('response.body' in the geocode program) that doesn't exist. This crash can be as a result of a lack of internet connection when the function is run or a lack of any valid address. If we handle things well by sending the error message below to the client, we will see a more meaningful and understandable reason why the program does not work
        // ***** //
        if(error) {
            res.send({error});
            return;
        } 
    
        forecast(latitude, longitude, unit, (error, forecastData) => {
            if(error) {
                res.send({error});
                return;
            }
            
            res.send({
                location,
                forecast: forecastData,
                address,
            })
        
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })

        return; 
    }

    console.log(req.query.search)
    res.send({
        products: {
            location: req.query.search,
            forecast: 'It is clear'
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'This page cannot be found',
        title: '404 page'
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})