// Basic express server 
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app  = express()

//define path for Express

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shomendra'
    })

})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Photo App',
        name: 'Shokhi'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: ' Suppor@sigma.com'
    })

})



// query string

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'address must be provided'
        })

    }

    geocode(req.query.address, (error, {latitude, longitude,location}= {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
     
            }
     
            res.send({
                forecast : forecastData,
                location ,
                address: req.query.address
            })
        })
     })



})






app.get('/products', (req, res)=>{
   if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
   }

  console.log(req.query.search)
  res.send({
      products : []
  })

})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Shomendra Pradhan',
        errorMessage : 'Help Article Not Found!!'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Shomendra',
        errorMessage : 'Page Not Found'
        
    })

})

app.listen(3000, () => {

    console.log('server is up on port 3000')
})