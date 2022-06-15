const express = require('express');
const router = express.Router();
const Temoignage = require('../models/Temoignage.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUS LES TEMOIGNAGES-----//
router.get('/', async (req, res) => {
    try {
        const temoignages = await Temoignage.find();
        res.json(temoignages);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UN TEMOIGNAGE-----//
router.get('/:idTemoignage', async (req, res) => {
    try {
        const temoignage = await Temoignage.findById(req.params.idTemoignage);
        res.json(temoignage);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UN TEMOIGNAGE-----//
router.post('/new', auth, async (req, res) => {
    const temoignage = new Temoignage( {
        nom: req.body.nom,
        texte: req.body.texte,
        url_photo: req.body.url_photo,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const temoignageSaved = await temoignage.save();
            res.json(temoignageSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UN TEMOIGNAGE-----//
router.post('/update/:idTemoignage', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const temoignageModified = await Temoignage.replaceOne({ _id: req.params.idTemoignage }, req.body);
            res.json(temoignageModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UN TEMOIGNAGE-----//
router.delete('/:idTemoignage', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const temoignageDeleted = await Temoignage.deleteOne({_id: req.params.idTemoignage });
            res.json(temoignageDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;