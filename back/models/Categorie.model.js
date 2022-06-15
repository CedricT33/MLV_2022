const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    nom: String,
    description: String,
    ordre_affichage: Number
})

module.exports = mongoose.model('Categorie', CategorieSchema);