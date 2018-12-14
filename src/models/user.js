const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    password: String,
    name: {type: String, default: "ux member"},
    area: {type: String, default: "ux"},
    registerDate: { type: Date, default: Date.now },
    isActive: {type:Boolean, default:true},
    role: {type: String, default: 'user'}
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('users', userSchema)