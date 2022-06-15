const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie.model');
const Formule = require('../models/Formule.model');
const CG = require('../models/CG.model');
const Photo = require('../models/Photo.model');
const Produit = require('../models/Produit.model');
const Temoignage = require('../models/Temoignage.model');

//----RECUPERER TOUT-----//
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.find();
        const formules = await Formule.find();
        const produits = await Produit.find();
        const photos = await Photo.find();
        const cgs = await CG.find();
        const temoignages = await Temoignage.find();
        const JSONRetour = {
            categories: categories,
            formules: formules,
            produits: produits,
            photos: photos,
            cgs: cgs,
            temoignages: temoignages
        }
        res.json(JSONRetour);
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;