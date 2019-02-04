const mongoose = require('mongoose')
const Schema = mongoose.Schema

addressSchema = new Schema({
    street:{ 
        type:String
    },
    city:{
        type: String,
        required: true
    },
    landmark:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        min:6,
        max:6,
        required:true
    }
})

module.exports = {
    addressSchema
}