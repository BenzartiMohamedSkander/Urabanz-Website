const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name : String,
    email: String,
    telephone: Number,
    password: String
})

module.exports = Admin = mongoose.model('admin',adminSchema); 