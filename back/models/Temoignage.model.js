const mongoose = require('mongoose');

const TemoignageSchema = mongoose.Schema({
    nom: String,
    texte: String,
    url_photo: String,
    ordre_affichage: Number
})

module.exports = mongoose.model('Temoignage', TemoignageSchema);