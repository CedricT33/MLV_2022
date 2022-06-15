const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    nom: String,
    url: String,
    ordre_affichage: Number
})

module.exports = mongoose.model('Photo', PhotoSchema);