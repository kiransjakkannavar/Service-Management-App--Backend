const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const {vendorSchema} = require('./vendorschema')
// const {addressSchema} = require('./addressSchema')
const jwt = require('jsonwebtoken')
                                                                                                                                                                                                
const Schema = mongoose.Schema


const userSchema = new Schema({

    fullname: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value)=>{
                return validator.isEmail(value) 
            },
            message: ()=>{
                return 'invalid email format'
            }
        }
        
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value)=>{
                return validator.isNumeric(value)
            },
            message: ()=>{
                return 'Invalid valid mobile number'
            }
        }
    },
    // address: {
    //     type: String,
    //     required: true
    // },
    role: {
        type: String,
        required: true,
        enum: ['admin','customer','vendor'],
        default: 'customer'
    },    
    vendor: [vendorSchema],
    tokens: [{
        token: {
            type: String
        }
    }],
    //address:[addressSchema]

})

userSchema.pre('save', function(next){
    let user = this    
    if(user.isNew){
    bcryptjs.genSalt(10).then(function(salt){
        bcryptjs.hash(user.password, salt).then(function(encrypted){
            user.password = encrypted
            next()
        })
    }).catch(function(err){
        console.log(err)
    })
     
}
else{
    next()
}
})  


userSchema.statics.findByCredentials = function(email, password){
    let User = this
    return User.findOne({email : email}).then(function(user){
        if(!user){
            return Promise.reject('Invalid email or password')
        }
    
        return bcryptjs.compare(password, user.password).then(function(res){
            if(res){
                return Promise.resolve(user)
            }
            else{
                return Promise.reject('Invalid email or password')
            }
        })
    })
}


userSchema.methods.generateToken = function(){
    let user = this
    let tokenData = {
        userId : this._id
    }
    let jwtToken = jwt.sign(tokenData, 'secretpassword')
    user.tokens.push({token: jwtToken})
    return user.save().then(function(user){
        return jwtToken
    })

}

userSchema.statics.findByToken = function(token){
    let User = this;
    let tokenData;

    try{
        tokenData = jwt.verify(token, 'secretpassword')
    }catch(err){
        return Promise.reject(err.message)
    }
    return User.findOne({
        '_id': tokenData.userId,
        'tokens.token': token
    })
    
}

const User = mongoose.model('User', userSchema)
module.exports = {
    User
}