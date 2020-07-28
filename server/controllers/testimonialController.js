const Testimonial = require ('../models/Testimoniales');

exports.mostrarTestimonial = async (req, res) => {
     const testimoniales = await Testimonial.findAll()
     res.render('testimoniales', {
          pagina: 'testimoniales',
          testimoniales
     })
}
exports.postearTestimonial = async (req, res) => {
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
          const testimoniales = await Testimonial.findAll()
          res.render('testimoniales', {
               // Mantiene los datos que ya se agregaron en caso de error
               errores,
               nombre,
               correo,
               mensaje,
               pagina: 'Testimoniales',
               testimoniales
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
}