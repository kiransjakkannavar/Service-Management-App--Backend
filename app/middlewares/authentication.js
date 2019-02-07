const { User } = require('../models/user')

const authenticateUser = (req, res, next) => {
    //let token = req.header('x-auth')
    //console.log(token)
    let token = req.query.token || req.header('x-auth')
    User.findByToken(token).then((user)=>{
        req.user = user
       // console.log(user)
        req.token = token
        next()

    }).catch((err) =>{
        res.status(401).send(err)
    })
}

// allows the customer to raise a service request
const authorizeUser = function(req,res,next){
    if(req.user.role === 'customer'){
        next()
    }else{
        res.status(403).send(`You're not authorized to access this page`)
    }
}

//allows the admin to perform CRUD operations on locations and services
const authorizeAdmin = function(req,res,next){
    if(req.user.role === 'admin'){
        next()
    }else{
        res.status(403).send(`Access Denied`)
    }
}

//allows the vendor to change the status of service request
const authorizeVendor = function(req,res,next){
    if(req.user.role === 'vendor'){
        next()
    }else{
        res.status(403).send('You are not authorized to access this page')
    }
}

module.exports = {
    authenticateUser,
    authorizeUser,
    authorizeAdmin,
    authorizeVendor
}