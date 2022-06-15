const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUTES LES CATEGORIES-----//
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.json(categories);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UNE CATEGORIE-----//
router.get('/:idCategorie', async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.idCategorie);
        res.json(categorie);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UNE CATEGORIE-----//
router.post('/new', auth, async (req, res) => {
    const categorie = new Categorie( {
        nom: req.body.nom,
        description: req.body.description,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const categorieSaved = await categorie.save();
            res.json(categorieSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UNE CATEGORIE-----//
router.post('/update/:idCategorie', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const categorieModified = await Categorie.replaceOne({ _id: req.params.idCategorie }, req.body);
            res.json(categorieModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UNE CATEGORIE-----//
router.delete('/:idCategorie', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const categorieDeleted = await Categorie.deleteOne({_id: req.params.idCategorie });
            res.json(categorieDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;