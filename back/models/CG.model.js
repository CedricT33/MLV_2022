const mongoose = require('mongoose');

const CGSchema = mongoose.Schema({
    titre: String,
    paragraphe: String,
    ordre_affichage: Number
})

module.exports = mongoose.model('CG', CGSchema);