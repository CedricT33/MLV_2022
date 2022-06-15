const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require("bcrypt");
const auth = require('../authentication/auth');
require('dotenv/config');

//----AUTHENTIFICATION-----//
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({identifiant: req.body.identifiant});
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = user.generateAuthToken();
                res.json({accessTocken: token});
            } else {
                res.status(401).json("ERREUR D\'AUTHENTIFICATION");
            }
        } else {
            res.status(401).json("ERREUR D\'AUTHENTIFICATION");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----RECUPERER TOUS LES USERS-----//
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

//----ENREGISTRER UN USER-----//
router.post('/new',auth, async (req, res) => {
    const user = new User( {
        identifiant: req.body.identifiant,
        password: req.body.password,
        roles: req.body.roles,
        nom: req.body.nom
    });
    user.password = await bcrypt.hash(user.password, 10);

    try {
        if (req.token.roles.includes("concepteur")) {
            const userSaved = await user.save();
            res.json("Enregistrement du User effectué !");
        } else {
            res.json("ERROR -> PAS CONCEPTEUR");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----MODIFIER UN USER-----//
router.post('/update/:idUser', auth, async (req, res) => {
    try {
        if (req.token.roles.includes("concepteur")) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const userModified = await User.replaceOne({ _id: req.params.idUser}, req.body);
            res.json(userModified);
        } else {
            res.json("ERROR -> PAS CONCEPTEUR");
        }
    } catch (err) {
        res.json({ message: err });
    }
});

//----SUPPRIMER UN USER-----//
router.delete('/:idUser',auth, async (req, res) => {
    try {
        if (req.token.roles.includes("concepteur")) {
            const userDeleted = await User.deleteOne({_id: req.params.idUser });
            res.json(userDeleted);
        } else {
            res.json("ERROR -> PAS CONCEPTEUR");
        }
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;