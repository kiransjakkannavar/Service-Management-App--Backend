const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema({
    status:{
        type:String,
        enum:['approved','rejected','pending','completed'],
        default:'pending',
        required:true        
    },
   createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports={
    statusSchema
}