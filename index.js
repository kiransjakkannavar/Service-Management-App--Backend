const express = require('express')
const cors = require('cors')
const app = express()
const {mongoose} = require('./config/db');
const {locationsController} = require('./app/controllers/locations_controller')
const { servicesController } = require('./app/controllers/service_controller')
const { userController } = require('./app/controllers/user_controller')
const { serviceRequestController } = require('./app/controllers/service-requests-controller')

const port = 3001

app.use(cors())
app.use(express.json())

app.get('/', function(req, res){
    res.send('Welcome to the site')
})

app.use('/admin/locations', locationsController)
app.use('/admin/services', servicesController)
app.use('/users', userController)
app.use('/servicerequests', serviceRequestController)

app.listen(port, function(){
    console.log(`listening to the port`, port)
})