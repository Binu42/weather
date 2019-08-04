const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');

const app = express()

const forecast = require("./utilis/forecast");
const geocode = require("./utilis/geocode");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// body-parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Binu Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Binu Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Binu Kumar'
    })
})

app.get('/weather', (req, res)=>{
    res.redirect('/');
})

app.post('/weather', (req, res) => {
    geocode(req.body.location, (error, {
        longitude,
        latitude,
        location
    } = {}) => {
        if (error) {
            res.render('error', {
                error: error
            });
        } else {
            forecast(latitude, longitude, (error, {
                temperature,
                precipProbability,
                summary
            }) => {
                if (error) {
                    res.render('error', {
                        error: error
                    });
                } else {
                    res.render('index', {
                        title: 'weather',
                        location: location,
                        temperature: temperature,
                        precipProbability: precipProbability,
                        summary: summary,
                        name: 'Binu Kumar'
                    });
                }
            })
        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Binu Kumar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Binu Kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})