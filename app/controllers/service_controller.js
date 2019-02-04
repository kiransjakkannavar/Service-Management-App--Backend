const express = require('express')
const router = express.Router()
const {Service} = require('../models/service')
const { ObjectID } = require('mongodb')


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

router.get('/',(req, res)=>{
    Service.find().then((service)=>{
        res.send(service)
    }).catch((err)=>{
        res.send(err)
    })
})

router.post('/',(req, res)=>{
    let body = req.body
    let service = new Service(body)
    service.save().then((service)=>{
        res.send({
            service,
            notice: 'success'
        }).catch((err)=>{
            res.send(err)
        })
    })
})


router.put('/:id',validateId,(req,res)=>{
    let id = req.params.id
    let body = req.body
    Service.findByIdAndUpdate(id, {$set: body}, {new: true}).then((service)=>{
        res.send(service)
    }).catch((err)=>{
        res.send(err)
    })
})

router.delete('/:id',validateId,(req, res)=>{
    let id = req.params.id
    Service.findByIdAndDelete(id).then(()=>{
        res.send({
            notice: 'Successfully deleted the record'
        })
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports = {
    servicesController: router
}

