const mongoose = require('mongoose')
const { statusSchema } = require('./statusSchema')
const Schema = mongoose.Schema

const serviceRequestSchema = new Schema({
    serviceName:{
        type:Schema.Types.ObjectId,
        ref:'Service',
        required:true
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    vendor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:statusSchema,
    location:{
        type:Schema.Types.ObjectId,
        ref:'Location',
        required:true
    }
})

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema)

module.exports= {
    ServiceRequest
}