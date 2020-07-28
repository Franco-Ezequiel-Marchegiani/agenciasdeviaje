const express = require('express');
const router = express.Router();
/* *** Controladores *** */
const nosotrosController = require('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialController = require('../controllers/testimonialController');

module.exports = function(){
     router.get('/', homeController.infoHomepage );   
     router.get('/nosotros', nosotrosController.infoNosotros);
     router.get('/viajes', viajesController.mostrarViajes );
     router.get('/viajes/:id', viajesController.mostrarViaje);
     router.get('/testimoniales', testimonialController.mostrarTestimonial);
     // Cuando se llena el formulario
     router.post('/testimoniales', testimonialController.postearTestimonial)
     return router;
}