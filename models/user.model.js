const CryptoJS = require('crypto-js');
const mongoose = require('../config/mongoose');
const { config } = require('../config');
const Schema = mongoose.Schema;

const userShema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        unique: true,
    },
    salt: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isLogged: {
        type: Boolean,
    },
    markers: {
      type: Array,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userShema.methods.encryptPassword = function (password) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(password));
};

userShema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password + this.salt);
    })
    .get(function () {
        return this._plainPassword;
    });

 userShema.methods.checkPassword = function (password) {
 return this.encryptPassword(password) === this.hashedPassword;
 };


exports.User = mongoose.model(config.collections.user, userShema);