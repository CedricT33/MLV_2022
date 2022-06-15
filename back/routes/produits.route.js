const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUS LES PRODUITS-----//
router.get('/', async (req, res) => {
    try {
        const produits = await Produit.find();
        res.json(produits);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UN PRODUIT-----//
router.get('/:idProduit', async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.idProduit);
        res.json(produit);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UN PRODUIT-----//
router.post('/new', auth, async (req, res) => {
    const produit = new Produit( {
        categorie: req.body.categorie,
        type: req.body.type,
        nom: req.body.nom,
        prixHT: req.body.prixHT,
        prixTTC: req.body.prixTTC,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const produitSaved = await produit.save();
            res.json(produitSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UN PRODUIT-----//
router.post('/update/:idProduit', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const produitModified = await Produit.replaceOne({ _id: req.params.idProduit }, req.body);
            res.json(produitModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UN PRODUIT-----//
router.delete('/:idProduit', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const produitDeleted = await Produit.deleteOne({_id: req.params.idProduit });
            res.json(produitDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;