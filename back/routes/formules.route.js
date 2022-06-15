const express = require('express');
const router = express.Router();
const Formule = require('../models/Formule.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUTES LES FORMULES-----//
router.get('/', async (req, res) => {
    try {
        const formules = await Formule.find();
        res.json(formules);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UNE FORMULE-----//
router.get('/:idFormule', async (req, res) => {
    try {
        const formule = await Formule.findById(req.params.idFormule);
        res.json(formule);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UNE FORMULE-----//
router.post('/new', auth, async (req, res) => {
    const formule = new Formule( {
        nom: req.body.nom,
        description: req.body.description,
        prixHT: req.body.prixHT,
        prixTTC: req.body.prixTTC,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const formuleSaved = await formule.save();
            res.json(formuleSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UNE FORMULE-----//
router.post('/update/:idFormule', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const formuleModified = await Formule.replaceOne({ _id: req.params.idFormule }, req.body);
            res.json(formuleModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UNE FORMULE-----//
router.delete('/:idFormule', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const formuleDeleted = await Formule.deleteOne({_id: req.params.idFormule });
            res.json(formuleDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;