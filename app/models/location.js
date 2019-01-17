const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    name:{
        type:String,
        required: true,
        minlength:3,
        maxlength:64
    }
})

const Location = mongoose.model('Location', locationSchema)

module.exports= {
    Location
}