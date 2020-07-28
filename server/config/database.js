const Sequelize = require('sequelize');

module.exports = new Sequelize('agenciasdeviaje', 'root', 'root', {
     host: '127.0.0.1',
     port: '3306',
     dialect: 'mysql',
     define:{
          timestamps: false
     },
     pool: {
          ma: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
     },
     operatorsAliases: false
})