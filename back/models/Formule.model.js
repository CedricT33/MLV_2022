const mongoose = require('mongoose');

const FormuleSchema = mongoose.Schema({
    nom: String,
    description: String,
    prixHT: Number,
    prixTTC: Number,
    ordre_affichage: Number
})

module.exports = mongoose.model('Formule', FormuleSchema);