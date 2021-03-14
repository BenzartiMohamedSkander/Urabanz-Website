const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name : String,
    adress: String,
    telephone: Number,
    email: String,
    password: String
})

module.exports = Customer = mongoose.model('customer',customerSchema); 