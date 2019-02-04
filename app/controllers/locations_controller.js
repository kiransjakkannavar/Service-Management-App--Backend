const express = require('express')
const router = express.Router()
const { ObjectID } = require('mongodb')
const { Location } = require('../models/location')


const validateId = (req,res,next)=>{
    let id = req.params.id
    if(!ObjectID.isValid(id)){
        res.send({
            notice: 'invalid object id'
        })
    }else{
        next()
    }
}

router.get('/', function(req,res){
    Location.find().then(function(locations){
        res.send(locations)
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/:id',validateId, function( req, res){
    let id = req.params.id
    Location.findById(id).then(function(location){
        res.send(location)
    })
})

router.post('/',function(req,res){
    let body = req.body
    let loc = new Location(body)
    loc.save().then(function(location){
        res.send(location)
    }).catch(function(err){
        res.send(err)
    })
})

router.put('/:id',validateId, function(req,res){
    let id = req.params.id
    let body = req.body
    Location.findByIdAndUpdate(id,{$set:body},{new:true}).then(function(location){
        res.send(location)
    }).catch(function(err){
        res.send(err)
    })
})

router.delete('/:id', validateId, function(req,res){
    let id = req.params.id
    Location.findByIdAndDelete(id).then(function(location){
        res.send({
            notice: 'Successfully deleted the record'
        })
    }).catch(function(err){
        res.send(err)
    })
})

module.exports= {
    locationsController : router
}