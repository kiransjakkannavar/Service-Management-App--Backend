const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)

mongoose.connect('mongodb://localhost:27017/sept-service-management',{useNewUrlParser: true}).then(function(){
    console.log('connected to the db')
}).catch(function(){
    console.log('error connecting to the db', err)
})

module.exports= {
    mongoose
}