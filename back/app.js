const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
var morgan  = require('morgan');
const categoriesRoutes = require('./routes/categories.route');
const formulesRoutes = require('./routes/formules.route');
const produitsRoutes = require('./routes/produits.route');
const photosRoutes = require('./routes/photos.route');
const temoignagesRoutes = require('./routes/temoignages.route');
const cgsRoutes = require('./routes/cgs.route');
const allRoutes = require('./routes/all.route');
const usersRoutes = require('./routes/users.route');
require('dotenv/config');

//-----CONFIG-----//
const corsOptions = {
    origin: process.env.FRONT_URL,
    credentials: true
}
const loggerOption = '[:date] -> :method :url :status - :response-time ms - :res[content-length]';

//-----ROUTES ET MIDDLEWARES-----//
app.use(morgan(loggerOption))
.use(cors(corsOptions))
.use(express.json())
.use('/api/categories', categoriesRoutes)
.use('/api/formules', formulesRoutes)
.use('/api/produits', produitsRoutes)
.use('/api/photos', photosRoutes)
.use('/api/temoignages', temoignagesRoutes)
.use('/api/cgs', cgsRoutes)
.use('/api/all', allRoutes)
.use('/api/users', usersRoutes);




//-----CONNEXION BD-----//
mongoose.connect(
    process.env.DB_CONNECTION, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then( () => {
        console.log('[BDD CONNECTE]');
    }).catch( error => console.log('[ERROR -> BDD NON CONNECTE] : ', error)
);

// -----PORT DU SERVEUR-----//
app.listen(3000, () => {
    // console.log('Listening on localhost:3000');
});