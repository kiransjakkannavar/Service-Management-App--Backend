const express = require('express')
const router = express.Router()
const {User} = require('../models/user')
const {authenticateUser} = require('../middlewares/authentication')

router.post('/', (req, res)=>{
    let body = req.body
    let user = new User(body)
    // if(body.role === 'vendor'){
    //     let companyName = body.companyName
    //     let service = body.service
    //     let vendorServiceLocation = body.vendorLocation
        // user.vendor.push({companyName:companyName,service:service, vendorServiceLocation:vendorServiceLocation})
   // }
    user.save().then(user=>{
        console.log(user)
        return user.generateToken()
    }).then((token)=>{
        console.log(user)
        res.header('x-auth',token).send(user)
    }).catch(err =>{
        res.send(err)
    })
})

router.get('/', (req, res)=>{
    User.find().then(user=>{
        res.send(user)
    }).catch(err=>{
        res.send(err)
    })
})

router.post('/login',(req, res)=>{
    let body = req.body
    User.findByCredentials(body.email, body.password).then(user =>{
        return user.generateToken()
    }).then((token)=>{
        res.header('x-auth', token).send()
    }).catch(err =>{
        res.status(401).send(err)
    })
})


router.delete('/logout', authenticateUser, function(req, res){
    let user = req.user;
    let token = req.token;
    const tokenInfo = user.tokens.find(function(tokenItem){
        return tokenItem.token == token
    })
    user.tokens.id(tokenInfo._id).remove()
    user.save().then((user)=> {
        res.send({
            notice:'successfully logged out'
        })
    })
})
module.exports = {
    userController: router
}