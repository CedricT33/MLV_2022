const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo.model');
const auth = require('../authentication/auth');

//----RECUPERER TOUTES LES PHOTOS-----//
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER UNE PHOTO-----//
router.get('/:idPhoto', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.idPhoto);
        res.json(photo);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UNE PHOTO-----//
router.post('/new', auth, async (req, res) => {
    const photo = new Photo( {
        nom: req.body.nom,
        url: req.body.url,
        ordre_affichage: req.body.ordre_affichage
    });

    try {
        if (req.token.roles.includes("admin")) {
            const photoSaved = await photo.save();
            res.json(photoSaved);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UNE PHOTO-----//
router.post('/update/:idPhoto', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const photoModified = await Photo.replaceOne({ _id: req.params.idPhoto }, req.body);
            res.json(photoModified);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UNE PHOTO-----//
router.delete('/:idPhoto', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("admin")) {
            const photoDeleted = await Photo.deleteOne({_id: req.params.idPhoto });
            res.json(photoDeleted);
        } else {
            res.json("ERROR -> PAS ADMIN");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;