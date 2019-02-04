const mongoose = require('mongoose')
const Schema = mongoose.Schema


const vendorSchema = new Schema({
    companyName:{
        type:String,
        required:true
    },
    service: [{
        type: Schema.Types.ObjectId,
        ref:'Service',
        required: true
    }],
    vendorServiceLocation: [{
        type:Schema.Types.ObjectId,
        ref:'Location',
        required:true
    }]        
    
})

module.exports = {
    vendorSchema
}