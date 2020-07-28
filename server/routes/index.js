const express = require('express');
const router = express.Router();

const Viaje = require ('../models/Viajes');
const Testimonial = require ('../models/Testimoniales');

module.exports = function(){
     router.get('/', (req, res) => {
          res.render('index');
     });
     
     router.get('/nosotros', (req, res) => {
          res.render('nosotros', {
               pagina: 'Sobre Nosotros'
          });
     });

     router.get('/viajes', (req, res) => {
          Viaje.findAll()
               .then(viajes => res.render('viajes', {
                    pagina: 'Próximos Viajes',
                    viajes
               }))
               .catch(error => console.log(error))
          
     });

     router.get('/viajes/:id', (req, res) => {
          Viaje.findByPk(req.params.id)
               .then(viaje => res.render('viaje', {
                    viaje
               }))
               .catch(error => console.log(error));
     });

     router.get('/testimoniales', (req, res) => {
          Testimonial.findAll()
               .then(testimoniales => res.render('testimoniales', {
                    pagina: 'testimoniales',
                    testimoniales
               }))
     });
     // Cuando se llena el formulario
     router.post('/testimoniales', (req, res) => {
          // Validar que todos los campos estén llenos
          let {nombre, correo, mensaje} = req.body;

          let errores = [];
          if(!nombre) {
               errores.push({'mensaje' : ' Agrega tu Nombre'})
          }
          if(!correo) {
               errores.push({'mensaje' : ' Agrega tu Correo'})
          }
          if(!mensaje) {
               errores.push({'mensaje' : ' Agrega tu Mensaje'})
          }

          // Revisar por errores
          if(errores.length > 0 ) {
               // Muestra la vista con errores
               res.render('testimoniales', {
                    // Mantiene los datos que ya se agregaron en caso de error
                    errores,
                    nombre,
                    correo,
                    mensaje
               })
          } else {
               // Almacenarlo en la Base de Datos
               Testimonial.create({
                    nombre,
                    correo,
                    mensaje
               })
               .then(testimonial => res.redirect('/testimoniales'))
               .catch(error => console.log(error));
          }
     })

     return router;
}