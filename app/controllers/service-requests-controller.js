const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { ServiceRequest } = require('../models/service-request')
const { authenticateUser, authorizeUser,authorizeVendor } = require('../middlewares/authentication')
//const { User } = require('../models/user')


// lists all the service requests raised by the particular customer
router.get('/',authenticateUser, authorizeUser,function(req,res){
    let user = req.user
    ServiceRequest.find({customer:user._id}).then(function(services){
        res.send(services)
    }).catch(function(err){
        res.send(err)
    })   
})

//lists all the service orders assigned to the vendor
router.get('/orders',authenticateUser, authorizeVendor, function(req,res){
    let user = req.user
    ServiceRequest.find({vendor:user._id}).then(function(order){
        res.send(order)
    }).catch(function(err){
        res.send(err)
    })
})


// create a service request 
router.post('/', authenticateUser, function(req,res){
    let user = req.user
    console.log(user)
    let body = req.body 
    let service = new ServiceRequest(body)
    service.customer = user._id
    service.save().then(function(service){
        res.send(service)
    }).catch(function(err){
        res.send(err)
    })
})

module.exports ={
    serviceRequestController : router
}
