const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv/config');

const UserSchema = mongoose.Schema({
    identifiant: String,
    password: String,
    roles: [String],
    nom: String
})

UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ nom: this.nom, roles: this.roles}, process.env.PRIVATE_KEY);
    return token;
}

module.exports = mongoose.model('User', UserSchema);