const express = require('express')
const cors = require('cors')
const app = express()
const {mongoose} = require('./config/db');
const {locationsController} = require('./app/controllers/locations_controller')

const port = 3001

app.use(cors())
app.use(express.json())

app.get('/', function(req, res){
    res.send('Welcome to the site')
})

app.use('/admin/locations', locationsController)

app.listen(port, function(){
    console.log(`listening to the port`, port)
})