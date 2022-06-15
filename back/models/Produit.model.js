const mongoose = require('mongoose');

const ProduitSchema = mongoose.Schema({
    categorie: String,
    type: String,
    nom: String,
    prixHT: Number,
    prixTTC: Number,
    ordre_affichage: Number
})

module.exports = mongoose.model('Produit', ProduitSchema);