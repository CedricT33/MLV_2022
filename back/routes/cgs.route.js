const express = require('express');
const router = express.Router();
const CG = require('../models/CG.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUTES LES CG-----//
router.get('/', async (req, res) => {
    try {
        const cgs = await CG.find();
        res.json(cgs);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UNE CG-----//
router.get('/:idCG', async (req, res) => {
    try {
        const cg = await CG.findById(req.params.idCG);
        res.json(cg);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UNE CG-----//
router.post('/new', auth, async (req, res) => {
    const cg = new CG( {
        titre: req.body.titre,
        paragraphe: req.body.paragraphe,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const cgSaved = await cg.save();
            res.json(cgSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UNE CG-----//
router.post('/update/:idCG', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const cgModified = await CG.replaceOne({ _id: req.params.idCG }, req.body);
            res.json(cgModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UNE CG-----//
router.delete('/:idCG', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const cgDeleted = await CG.deleteOne({_id: req.params.idCG });
            res.json(cgDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;